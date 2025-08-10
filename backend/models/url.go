package models

// URLRequest represents the input structure for URL processing
type URLRequest struct {
	URL       string `json:"url" validate:"required,url"`
	Operation string `json:"operation" validate:"required,oneof=redirection canonical all"`
}

// URLResponse represents the output structure for processed URLs
type URLResponse struct {
	ProcessedURL string `json:"processed_url"`
}

// URLError represents error response structure
type URLError struct {
	ErrorType string `json:"error"`
	Message   string `json:"message"`
}

// Error implements the error interface
func (e *URLError) Error() string {
	return e.Message
}
