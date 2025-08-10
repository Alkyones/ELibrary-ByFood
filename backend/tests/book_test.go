package tests

import (
	"book-library-backend/database"
	"book-library-backend/models"
	"strings"
	"testing"
)

func TestMain(m *testing.M) {
	database.InitMemoryDB()
	m.Run()
}

func TestCreateBook(t *testing.T) {
	bookReq := models.CreateBookRequest{
		Title:       "Test Book",
		Author:      "Test Author",
		Year:        2022,
		Description: "A test book.",
		Status:      "to-read",
	}
	book, err := database.CreateBook(bookReq)
	if err != nil {
		t.Fatalf("Expected no error, got %v", err)
	}
	if book.Title != bookReq.Title {
		t.Errorf("Expected title %v, got %v", bookReq.Title, book.Title)
	}
	t.Logf("\n✅ Created Book:\n----------------\nTitle: %s\nAuthor: %s\nYear: %d\nStatus: %s\n----------------", book.Title, book.Author, book.Year, book.Status)
}

func TestGetAllBooks(t *testing.T) {
	_, _ = database.CreateBook(models.CreateBookRequest{
		Title: "Book1", Author: "Author1", Year: 2021, Status: "to-read",
	})
	books, err := database.GetAllBooks()
	if err != nil {
		t.Fatalf("Expected no error, got %v", err)
	}
	if len(books) == 0 {
		t.Errorf("Expected at least one book, got %d", len(books))
	}

	titles := make([]string, 0, len(books))
	for _, b := range books {
		titles = append(titles, b.Title)
	}
	t.Logf("\n📚 Book Titles:\n----------------\n%s\n----------------", strings.Join(titles, "\n"))
}

func TestGetBookByID(t *testing.T) {
	book, _ := database.CreateBook(models.CreateBookRequest{
		Title: "Book2", Author: "Author2", Year: 2020, Status: "reading",
	})
	found, err := database.GetBookByID(book.ID)
	if err != nil {
		t.Fatalf("Expected no error, got %v", err)
	}
	if found.ID != book.ID {
		t.Errorf("Expected ID %d, got %d", book.ID, found.ID)
	}
	t.Logf("\n🔎 Fetched Book by ID:\n----------------\nTitle: %s\nAuthor: %s\nYear: %d\nStatus: %s\n----------------", found.Title, found.Author, found.Year, found.Status)
}

func TestUpdateBook(t *testing.T) {
	book, _ := database.CreateBook(models.CreateBookRequest{
		Title: "Book3", Author: "Author3", Year: 2019, Status: "read",
	})
	updateReq := models.UpdateBookRequest{
		Title:       "Updated Book3",
		Author:      "Updated Author3",
		Year:        2018,
		Description: "Updated description.",
		Status:      "to-read",
	}
	updated, err := database.UpdateBook(book.ID, updateReq)
	if err != nil {
		t.Fatalf("Expected no error, got %v", err)
	}
	if updated.Title != updateReq.Title {
		t.Errorf("Expected title %v, got %v", updateReq.Title, updated.Title)
	}
	t.Logf("\n✏️ Updated Book:\n----------------\nTitle: %s\nAuthor: %s\nYear: %d\nStatus: %s\n----------------", updated.Title, updated.Author, updated.Year, updated.Status)
}

func TestDeleteBook(t *testing.T) {
	book, _ := database.CreateBook(models.CreateBookRequest{
		Title: "Book4", Author: "Author4", Year: 2017, Status: "read",
	})
	err := database.DeleteBook(book.ID)
	if err != nil {
		t.Fatalf("Expected no error, got %v", err)
	}
	_, err = database.GetBookByID(book.ID)
	if err == nil {
		t.Errorf("Expected error for deleted book, got nil")
	}
	t.Logf("\n🗑️ Deleted Book with ID: %d\n----------------", book.ID)
}

func TestBookExists(t *testing.T) {
	book, _ := database.CreateBook(models.CreateBookRequest{
		Title: "Book5", Author: "Author5", Year: 2016, Status: "to-read",
	})
	exists, err := database.BookExists(book.ID)
	if err != nil {
		t.Fatalf("Expected no error, got %v", err)
	}
	if !exists {
		t.Errorf("Expected book to exist")
	}
	exists, _ = database.BookExists(9999)
	if exists {
		t.Errorf("Expected book to not exist")
	}
	t.Logf("\n🔎 Book Exists Check:\n----------------\nID %d: %v\nID 9999: %v\n----------------", book.ID, true, false)
}
