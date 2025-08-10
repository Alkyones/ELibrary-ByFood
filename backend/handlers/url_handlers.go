package handlers

import (
	"encoding/json"
	"net/http"
	"net/url"
	"strings"

	"book-library-backend/models"
	"book-library-backend/utils"

	"github.com/sirupsen/logrus"
)

// ProcessURL handles POST /api/process-url
func ProcessURL(w http.ResponseWriter, r *http.Request) {
	logrus.Info("Processing URL request")

	var request models.URLRequest

	// Decode JSON request
	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		logrus.WithError(err).Error("Failed to decode request body")
		utils.WriteErrorResponse(w, http.StatusBadRequest, "Invalid JSON format")
		return
	}

	// Validate input
	if err := validateURLRequest(request); err != nil {
		logrus.WithError(err).Error("Request validation failed")
		utils.WriteErrorResponse(w, http.StatusBadRequest, err.Error())
		return
	}

	// Process URL based on operation type
	processedURL, err := ProcessURLByOperation(request.URL, request.Operation)
	if err != nil {
		logrus.WithError(err).Error("Failed to process URL")
		utils.WriteErrorResponse(w, http.StatusInternalServerError, "Failed to process URL")
		return
	}

	// Return response
	response := models.URLResponse{
		ProcessedURL: processedURL,
	}

	utils.WriteSuccessResponse(w, "URL processed successfully", response)
}

// validateURLRequest validates the input request
func validateURLRequest(request models.URLRequest) error {
	// Check if URL is provided
	if strings.TrimSpace(request.URL) == "" {
		return &models.URLError{
			ErrorType: "validation_error",
			Message:   "URL is required",
		}
	}

	// Validate URL format
	if _, err := url.Parse(request.URL); err != nil {
		return &models.URLError{
			ErrorType: "validation_error",
			Message:   "Invalid URL format",
		}
	}

	// Check if operation is provided and valid
	validOperations := map[string]bool{
		"redirection": true,
		"canonical":   true,
		"all":         true,
	}

	if !validOperations[request.Operation] {
		return &models.URLError{
			ErrorType: "validation_error",
			Message:   "Operation must be one of: redirection, canonical, all",
		}
	}

	return nil
}

// processURLByOperation processes the URL based on the operation type
func ProcessURLByOperation(inputURL, operation string) (string, error) {
	parsedURL, err := url.Parse(inputURL)
	if err != nil {
		return "", err
	}

	switch operation {
	case "canonical":
		return ProcessCanonical(parsedURL), nil
	case "redirection":
		return ProcessRedirection(parsedURL), nil
	case "all":
		// First apply canonical, then redirection
		canonicalURL := ProcessCanonical(parsedURL)
		redirectParsed, _ := url.Parse(canonicalURL)
		return ProcessRedirection(redirectParsed), nil
	default:
		return inputURL, nil
	}
}

// processCanonical cleans up the URL to its canonical form
// Removes query parameters and trailing slashes
func ProcessCanonical(parsedURL *url.URL) string {
	// Remove query parameters
	parsedURL.RawQuery = ""
	parsedURL.Fragment = ""

	// Remove trailing slash from path
	if len(parsedURL.Path) > 1 && strings.HasSuffix(parsedURL.Path, "/") {
		parsedURL.Path = strings.TrimSuffix(parsedURL.Path, "/")
	}

	// Remove query-like patterns from the path (e.g., /query=abc)
	path := parsedURL.Path
	if strings.Contains(path, "/query=") {
		// Find the position of /query= and remove everything from that point
		if idx := strings.Index(path, "/query="); idx != -1 {
			parsedURL.Path = path[:idx]
		}
	}

	return parsedURL.String()
}

// processRedirection modifies the URL for redirection purposes
// Ensures domain is www.byfood.com and converts to lowercase
func ProcessRedirection(parsedURL *url.URL) string {
	// Set the host to www.byfood.com
	parsedURL.Host = "www.byfood.com"

	// Convert the entire URL to lowercase
	result := strings.ToLower(parsedURL.String())

	return result
}
