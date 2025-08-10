package models

import "time"

// Book represents a book in the library
type Book struct {
	ID          int       `json:"id" db:"id"`
	Title       string    `json:"title" db:"title"`
	Author      string    `json:"author" db:"author"`
	Year        int       `json:"year" db:"year"`
	Description string    `json:"description" db:"description"`
	Status      string    `json:"status" db:"status"`
	CreatedAt   time.Time `json:"created_at" db:"created_at"`
	UpdatedAt   time.Time `json:"updated_at" db:"updated_at"`
}

// CreateBookRequest represents the request body for creating a book
type CreateBookRequest struct {
	Title       string `json:"title" validate:"required"`
	Author      string `json:"author" validate:"required"`
	Year        int    `json:"year" validate:"required,min=1000,max=2100"`
	Description string `json:"description"`
	Status      string `json:"status" validate:"required,oneof=to-read reading read"`
}

// UpdateBookRequest represents the request body for updating a book
type UpdateBookRequest struct {
	Title       string `json:"title" validate:"required"`
	Author      string `json:"author" validate:"required"`
	Year        int    `json:"year" validate:"required,min=1000,max=2100"`
	Description string `json:"description"`
	Status      string `json:"status" validate:"required,oneof=to-read reading read"`
}

// APIResponse represents a standard API response
type APIResponse struct {
	Success bool        `json:"success"`
	Message string      `json:"message"`
	Data    interface{} `json:"data,omitempty"`
	Error   string      `json:"error,omitempty"`
}
