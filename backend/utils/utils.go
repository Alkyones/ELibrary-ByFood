package utils

import (
	"encoding/json"
	"net/http"
	"strconv"
	"strings"

	"book-library-backend/constants"
	"book-library-backend/models"

	"github.com/sirupsen/logrus"
)

func WriteJSONResponse(w http.ResponseWriter, statusCode int, response models.APIResponse) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(statusCode)

	if err := json.NewEncoder(w).Encode(response); err != nil {
		logrus.WithError(err).Error("Failed to encode JSON response")
	}
}

func WriteErrorResponse(w http.ResponseWriter, statusCode int, message string) {
	response := models.APIResponse{
		Success: false,
		Message: "Error",
		Error:   message,
	}
	WriteJSONResponse(w, statusCode, response)
}

func WriteSuccessResponse(w http.ResponseWriter, message string, data interface{}) {
	response := models.APIResponse{
		Success: true,
		Message: message,
		Data:    data,
	}
	WriteJSONResponse(w, http.StatusOK, response)
}

func ParseIDFromPath(path string) (int, error) {
	parts := strings.Split(path, "/")
	if len(parts) < 3 {
		return 0, nil
	}

	idStr := parts[len(parts)-1]
	return strconv.Atoi(idStr)
}

func ValidateBook(book models.CreateBookRequest) []string {
	var errors []string

	if strings.TrimSpace(book.Title) == "" {
		errors = append(errors, constants.ErrInvalidTitle)
	}

	if strings.TrimSpace(book.Author) == "" {
		errors = append(errors, constants.ErrInvalidAuthor)
	}

	if book.Year < 1000 || book.Year > 2100 {
		errors = append(errors, constants.ErrInvalidYear)
	}

	validStatuses := []string{"to-read", "reading", "read"}
	statusValid := false
	for _, validStatus := range validStatuses {
		if book.Status == validStatus {
			statusValid = true
			break
		}
	}
	if !statusValid {
		errors = append(errors, "Status must be one of: to-read, reading, read")
	}

	return errors
}
