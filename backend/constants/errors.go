package constants

// Database error messages
const (
	ErrDatabaseNotInitialized = "database not initialized"
	ErrCreatingBook           = "error creating book"
	ErrBookNotFound           = "book not found"
	ErrBookAlreadyExists      = "book already exists"
)

// HTTP error messages
const (
	ErrInvalidRequest    = "invalid request"
	ErrInvalidJSON       = "invalid JSON format"
	ErrMissingParameters = "missing required parameters"
	ErrUnauthorized      = "unauthorized access"
	ErrForbidden         = "forbidden access"
	ErrInternalServer    = "internal server error"
	ErrFetchingBooks     = "error fetching books"
)

// Validation error messages
const (
	ErrInvalidTitle       = "title is required and must not be empty"
	ErrInvalidAuthor      = "author is required and must not be empty"
	ErrInvalidYear        = "year must be a valid positive number"
	ErrInvalidDescription = "description must not be empty"
	ErrInvalidID          = "invalid ID format"
)
