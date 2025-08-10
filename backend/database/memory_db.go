package database

import (
	"errors"
	"log"
	"sync"
	"time"

	"book-library-backend/constants"
	"book-library-backend/models"
)

type InMemoryDB struct {
	books  map[int]*models.Book
	nextID int
	mutex  sync.RWMutex
}

var memDB *InMemoryDB

func InitMemoryDB() error {
	memDB = &InMemoryDB{
		books:  make(map[int]*models.Book),
		nextID: 1,
	}

	sampleBooks := []*models.Book{
		{
			ID:          1,
			Title:       "To Kill a Mockingbird",
			Author:      "Harper Lee",
			Year:        1960,
			Description: "A classic novel exploring themes of racial injustice and moral growth in the American South.",
			Status:      "read",
			CreatedAt:   time.Now(),
			UpdatedAt:   time.Now(),
		},
		{
			ID:          2,
			Title:       "1984",
			Author:      "George Orwell",
			Year:        1949,
			Description: "A dystopian novel depicting a totalitarian regime where surveillance and propaganda control every aspect of life.",
			Status:      "reading",
			CreatedAt:   time.Now(),
			UpdatedAt:   time.Now(),
		},
		{
			ID:          3,
			Title:       "The Great Gatsby",
			Author:      "F. Scott Fitzgerald",
			Year:        1925,
			Description: "A tragic story of love, wealth, and the American Dream set in the Roaring Twenties.",
			Status:      "to-read",
			CreatedAt:   time.Now(),
			UpdatedAt:   time.Now(),
		},
	}

	for _, book := range sampleBooks {
		memDB.books[book.ID] = book
		if book.ID >= memDB.nextID {
			memDB.nextID = book.ID + 1
		}
	}

	log.Println(constants.MsgDatabaseInit + " with sample data")
	return nil
}

func GetAllBooks() ([]*models.Book, error) {
	if memDB == nil {
		return nil, errors.New(constants.ErrDatabaseNotInitialized)
	}

	memDB.mutex.RLock()
	defer memDB.mutex.RUnlock()

	books := make([]*models.Book, 0, len(memDB.books))
	for _, book := range memDB.books {
		books = append(books, book)
	}

	return books, nil
}

func GetBookByID(id int) (*models.Book, error) {
	if memDB == nil {
		return nil, errors.New(constants.ErrDatabaseNotInitialized)
	}

	memDB.mutex.RLock()
	defer memDB.mutex.RUnlock()

	book, exists := memDB.books[id]
	if !exists {
		return nil, errors.New(constants.ErrBookNotFound)
	}

	return book, nil
}

func CreateBook(req models.CreateBookRequest) (*models.Book, error) {
	if memDB == nil {
		return nil, errors.New(constants.ErrDatabaseNotInitialized)
	}

	memDB.mutex.Lock()
	defer memDB.mutex.Unlock()

	book := &models.Book{
		ID:          memDB.nextID,
		Title:       req.Title,
		Author:      req.Author,
		Year:        req.Year,
		Description: req.Description,
		Status:      req.Status,
		CreatedAt:   time.Now(),
		UpdatedAt:   time.Now(),
	}

	memDB.books[book.ID] = book
	memDB.nextID++

	return book, nil
}

func UpdateBook(id int, req models.UpdateBookRequest) (*models.Book, error) {
	if memDB == nil {
		return nil, errors.New(constants.ErrDatabaseNotInitialized)
	}

	memDB.mutex.Lock()
	defer memDB.mutex.Unlock()

	book, exists := memDB.books[id]
	if !exists {
		return nil, errors.New(constants.ErrBookNotFound)
	}

	book.Title = req.Title
	book.Author = req.Author
	book.Year = req.Year
	book.Description = req.Description
	book.Status = req.Status
	book.UpdatedAt = time.Now()

	return book, nil
}

func DeleteBook(id int) error {
	if memDB == nil {
		return errors.New(constants.ErrDatabaseNotInitialized)
	}

	memDB.mutex.Lock()
	defer memDB.mutex.Unlock()

	_, exists := memDB.books[id]
	if !exists {
		return errors.New(constants.ErrBookNotFound)
	}

	delete(memDB.books, id)
	return nil
}

func BookExists(id int) (bool, error) {
	if memDB == nil {
		return false, errors.New(constants.ErrDatabaseNotInitialized)
	}

	memDB.mutex.RLock()
	defer memDB.mutex.RUnlock()

	_, exists := memDB.books[id]
	return exists, nil
}
