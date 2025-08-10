package database

import (
	"database/sql"
	"fmt"
	"log"
)

//! For simplicity and demonstration purpose, an in-memory SQLite database is used. Based on the size of application it may be necessary to switch
//! to a more robust solution like PostgreSQL or MySQL. Please consider it before running stress tests.

var DB *sql.DB

func InitDB() error {
	var err error

	DB, err = sql.Open("sqlite3", "file::memory:?cache=shared")
	if err != nil {
		return fmt.Errorf("failed to open database: %v", err)
	}

	// Test the connection
	if err = DB.Ping(); err != nil {
		return fmt.Errorf("failed to ping database: %v", err)
	}

	// Create tables
	if err = createTables(); err != nil {
		return fmt.Errorf("failed to create tables: %v", err)
	}

	// Insert sample data
	if err = insertSampleData(); err != nil {
		log.Printf("Warning: failed to insert sample data: %v", err)
	}

	log.Println("Database initialized successfully with sample data")
	return nil
}

// createTables creates the necessary tables
func createTables() error {
	query := `
	CREATE TABLE IF NOT EXISTS books (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		title TEXT NOT NULL,
		author TEXT NOT NULL,
		year INTEGER NOT NULL,
		description TEXT,
		created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
		updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
	);

	CREATE TRIGGER IF NOT EXISTS update_books_updated_at 
		AFTER UPDATE ON books
		BEGIN
			UPDATE books SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
		END;
	`

	_, err := DB.Exec(query)
	return err
}

// Sample Data
func insertSampleData() error {
	sampleBooks := []struct {
		title       string
		author      string
		year        int
		description string
	}{
		{
			title:       "The Go Programming Language",
			author:      "Alan Donovan and Brian Kernighan",
			year:        2015,
			description: "The authoritative resource to writing clear and idiomatic Go to solve real-world problems.",
		},
		{
			title:       "Clean Code",
			author:      "Robert C. Martin",
			year:        2008,
			description: "A handbook of agile software craftsmanship that presents a revolutionary paradigm with practical advice.",
		},
		{
			title:       "Design Patterns",
			author:      "Gang of Four",
			year:        1994,
			description: "Elements of Reusable Object-Oriented Software - the foundational text on software design patterns.",
		},
	}

	for _, book := range sampleBooks {
		_, err := DB.Exec(
			"INSERT INTO books (title, author, year, description) VALUES (?, ?, ?, ?)",
			book.title, book.author, book.year, book.description,
		)
		if err != nil {
			return err
		}
	}

	return nil
}

func CloseDB() error {
	if DB != nil {
		return DB.Close()
	}
	return nil
}
