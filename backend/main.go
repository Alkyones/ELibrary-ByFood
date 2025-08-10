package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"book-library-backend/database"
	"book-library-backend/handlers"
	"book-library-backend/middleware"

	"github.com/gorilla/mux"
	"github.com/sirupsen/logrus"
)

func main() {
	// Setup logging
	logrus.SetLevel(logrus.InfoLevel)
	logrus.SetFormatter(&logrus.JSONFormatter{})

	// Initialize in-memory database (for demo purposes)
	if err := database.InitMemoryDB(); err != nil {
		log.Fatalf("Failed to initialize database: %v", err)
	}

	// Setup router
	router := mux.NewRouter()

	// Add middleware to main router (not subrouter)
	router.Use(middleware.CORS)
	router.Use(middleware.Logger)

	// API routes
	api := router.PathPrefix("/api").Subrouter()

	// Health check
	api.HandleFunc("/health", handlers.HealthCheck).Methods("GET")

	// Book routes
	api.HandleFunc("/books", handlers.GetAllBooks).Methods("GET")
	api.HandleFunc("/books", handlers.CreateBook).Methods("POST")
	api.HandleFunc("/books/{id}", handlers.GetBookByID).Methods("GET")
	api.HandleFunc("/books/{id}", handlers.UpdateBook).Methods("PUT")
	api.HandleFunc("/books/{id}", handlers.DeleteBook).Methods("DELETE")

	// URL processing routes
	api.HandleFunc("/process-url", handlers.ProcessURL).Methods("POST")

	// Setup server
	server := &http.Server{
		Addr:         ":8080",
		Handler:      router,
		ReadTimeout:  15 * time.Second,
		WriteTimeout: 15 * time.Second,
		IdleTimeout:  60 * time.Second,
	}

	// Start server in a goroutine
	go func() {
		logrus.Info("Starting server on :8080")
		if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("Failed to start server: %v", err)
		}
	}()

	// Wait for interrupt signal to gracefully shutdown the server
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit

	logrus.Info("Shutting down server...")

	// Create a deadline for the shutdown
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	// Attempt graceful shutdown
	if err := server.Shutdown(ctx); err != nil {
		log.Fatalf("Server forced to shutdown: %v", err)
	}

	logrus.Info("Server exited")
}
