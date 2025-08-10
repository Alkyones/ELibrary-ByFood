package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"
	"strings"
	"time"

	"book-library-backend/constants"
	"book-library-backend/database"
	"book-library-backend/models"
	"book-library-backend/utils"
	"sort"

	"github.com/gorilla/mux"
	"github.com/sirupsen/logrus"
)

// GetAllBooks handles GET /api/books
func GetAllBooks(w http.ResponseWriter, r *http.Request) {
	logrus.Info("Fetching all books")

       // Parse query params for filtering and ordering
       query := r.URL.Query()
       filterTitle := strings.TrimSpace(query.Get("title"))
       filterAuthor := strings.TrimSpace(query.Get("author"))
       orderBy := strings.TrimSpace(query.Get("orderBy")) // e.g., "title", "author", "year"
       orderDir := strings.ToLower(strings.TrimSpace(query.Get("orderDir"))) // "asc" or "desc"

       books, err := database.GetAllBooks()
       if err != nil {
	       logrus.WithError(err).Error("Failed to fetch books")
	       utils.WriteErrorResponse(w, http.StatusInternalServerError, "Failed to fetch books")
	       return
       }

       // Filtering
       filteredBooks := make([]*models.Book, 0)
       for _, book := range books {
	       if filterTitle != "" && !strings.Contains(strings.ToLower(book.Title), strings.ToLower(filterTitle)) {
		       continue
	       }
	       if filterAuthor != "" && !strings.Contains(strings.ToLower(book.Author), strings.ToLower(filterAuthor)) {
		       continue
	       }
	       filteredBooks = append(filteredBooks, book)
       }

       // Ordering
       if orderBy != "" {
	       switch orderBy {
	       case "title":
		       sort.Slice(filteredBooks, func(i, j int) bool {
			       if orderDir == "desc" {
				       return filteredBooks[i].Title > filteredBooks[j].Title
			       }
			       return filteredBooks[i].Title < filteredBooks[j].Title
		       })
	       case "author":
		       sort.Slice(filteredBooks, func(i, j int) bool {
			       if orderDir == "desc" {
				       return filteredBooks[i].Author > filteredBooks[j].Author
			       }
			       return filteredBooks[i].Author < filteredBooks[j].Author
		       })
	       case "year":
		       sort.Slice(filteredBooks, func(i, j int) bool {
			       if orderDir == "desc" {
				       return filteredBooks[i].Year > filteredBooks[j].Year
			       }
			       return filteredBooks[i].Year < filteredBooks[j].Year
		       })
	       }
       }

       utils.WriteSuccessResponse(w, "Books fetched successfully", filteredBooks)
}

// GetBookByID handles GET /api/books/{id}
func GetBookByID(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	idStr := vars["id"]

	logrus.WithField("id", idStr).Info("Fetching book by ID")

	id, err := strconv.Atoi(idStr)
	if err != nil {
		utils.WriteErrorResponse(w, http.StatusBadRequest, constants.ErrInvalidID)
		return
	}

	book, err := database.GetBookByID(id)
	if err != nil {
		if err.Error() == constants.ErrBookNotFound {
			utils.WriteErrorResponse(w, http.StatusNotFound, constants.ErrBookNotFound)
			return
		}
		logrus.WithError(err).Error("Failed to fetch book")
		utils.WriteErrorResponse(w, http.StatusInternalServerError, constants.ErrFetchingBooks)
		return
	}

	utils.WriteSuccessResponse(w, constants.MsgBookFetched, book)
}

// CreateBook handles POST /api/books
func CreateBook(w http.ResponseWriter, r *http.Request) {
	logrus.Info("Creating new book")

	var req models.CreateBookRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		utils.WriteErrorResponse(w, http.StatusBadRequest, constants.ErrInvalidJSON)
		return
	}

	// Validate input
	if errors := utils.ValidateBook(req); len(errors) > 0 {
		utils.WriteErrorResponse(w, http.StatusBadRequest, strings.Join(errors, ", "))
		return
	}

	book, err := database.CreateBook(req)
	if err != nil {
		logrus.WithError(err).Error("Failed to create book")
		utils.WriteErrorResponse(w, http.StatusInternalServerError, constants.ErrCreatingBook)
		return
	}

	w.WriteHeader(http.StatusCreated)
	utils.WriteSuccessResponse(w, constants.MsgBookCreated, book)
}

// UpdateBook handles PUT /api/books/{id}
func UpdateBook(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	idStr := vars["id"]

	logrus.WithField("id", idStr).Info("Updating book")

	id, err := strconv.Atoi(idStr)
	if err != nil {
		utils.WriteErrorResponse(w, http.StatusBadRequest, constants.ErrInvalidID)
		return
	}

	var req models.UpdateBookRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		utils.WriteErrorResponse(w, http.StatusBadRequest, constants.ErrInvalidJSON)
		return
	}

	// Validate input
	createReq := models.CreateBookRequest(req)
	if errors := utils.ValidateBook(createReq); len(errors) > 0 {
		utils.WriteErrorResponse(w, http.StatusBadRequest, strings.Join(errors, ", "))
		return
	}

	// Check if book exists
	exists, err := database.BookExists(id)
	if err != nil {
		logrus.WithError(err).Error("Failed to check book existence")
		utils.WriteErrorResponse(w, http.StatusInternalServerError, constants.ErrFetchingBooks)
		return
	}

	if !exists {
		utils.WriteErrorResponse(w, http.StatusNotFound, constants.ErrBookNotFound)
		return
	}

	book, err := database.UpdateBook(id, req)
	if err != nil {
		logrus.WithError(err).Error("Failed to update book")
		utils.WriteErrorResponse(w, http.StatusInternalServerError, constants.ErrBookNotFound)
		return
	}

	utils.WriteSuccessResponse(w, constants.MsgBookUpdated, book)
}

// DeleteBook handles DELETE /api/books/{id}
func DeleteBook(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	idStr := vars["id"]

	logrus.WithField("id", idStr).Info("Deleting book")

	id, err := strconv.Atoi(idStr)
	if err != nil {
		utils.WriteErrorResponse(w, http.StatusBadRequest, constants.ErrInvalidID)
		return
	}

	// Check if book exists
	exists, err := database.BookExists(id)
	if err != nil {
		logrus.WithError(err).Error("Failed to check book existence")
		utils.WriteErrorResponse(w, http.StatusInternalServerError, constants.ErrFetchingBooks)
		return
	}

	if !exists {
		utils.WriteErrorResponse(w, http.StatusNotFound, constants.ErrBookNotFound)
		return
	}

	err = database.DeleteBook(id)
	if err != nil {
		logrus.WithError(err).Error("Failed to delete book")
		utils.WriteErrorResponse(w, http.StatusInternalServerError, constants.ErrFetchingBooks)
		return
	}

	response := models.APIResponse{
		Success: true,
		Message: constants.MsgBookDeleted,
		Data:    map[string]string{"id": idStr},
	}

	utils.WriteJSONResponse(w, http.StatusOK, response)
}

// HealthCheck handles GET /api/health
func HealthCheck(w http.ResponseWriter, r *http.Request) {
	response := models.APIResponse{
		Success: true,
		Message: "Server is healthy",
		Data: map[string]interface{}{
			"status":    "ok",
			"timestamp": time.Now().UTC().Format(time.RFC3339),
		},
	}

	utils.WriteJSONResponse(w, http.StatusOK, response)
}
