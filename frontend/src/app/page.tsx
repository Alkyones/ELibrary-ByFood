'use client';

import React, { useState } from 'react';
import { useBooks } from '@/context/BookContext';
import { BookCard } from '@/components/BookCard';
import { BookForm } from '@/components/BookForm';
import { Modal } from '@/components/Modal';
import { LoadingState } from '@/components/LoadingSpinner';
import { ErrorMessage, EmptyState } from '@/components/ErrorMessage';
import { Book } from '@/types/book';
import { formatDate } from '@/utils/validation';

export default function HomePage() {
  const { 
    books, 
    loading, 
    error, 
    createBook, 
    updateBook, 
    deleteBook, 
    fetchBooks,
    clearError 
  } = useBooks();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const handleCreateBook = async (bookData: Omit<Book, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      await createBook(bookData);
      setShowCreateModal(false);
    } catch (error) {
      // Error is handled by context
    }
  };

  const handleUpdateBook = async (bookData: Omit<Book, 'id' | 'created_at' | 'updated_at'>) => {
    if (!selectedBook) return;
    
    try {
      await updateBook(selectedBook.id, bookData);
      setShowEditModal(false);
      setSelectedBook(null);
    } catch (error) {
      // Error is handled by context
    }
  };

  const handleDeleteBook = async () => {
    if (!selectedBook) return;
    
    try {
      await deleteBook(selectedBook.id);
      setShowDeleteModal(false);
      setSelectedBook(null);
    } catch (error) {
      // Error is handled by context
    }
  };

  const handleViewBook = (book: Book) => {
    setSelectedBook(book);
    setShowViewModal(true);
  };

  const handleEditBook = (book: Book) => {
    setSelectedBook(book);
    setShowEditModal(true);
  };

  const handleDeleteBookClick = (book: Book) => {
    setSelectedBook(book);
    setShowDeleteModal(true);
  };

  if (loading && books.length === 0) {
    return <LoadingState message="Loading your book library..." />;
  }

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Book Library Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Manage your personal book collection with ease
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 font-medium transition-colors shadow-sm"
          >
            + Add New Book
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-primary-600">{books.length}</div>
          <div className="text-gray-600">Total Books</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-green-600">
            {new Set(books.map(book => book.author)).size}
          </div>
          <div className="text-gray-600">Authors</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-blue-600">
            {books.length > 0 ? Math.max(...books.map(book => book.year)) : 0}
          </div>
          <div className="text-gray-600">Latest Year</div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <ErrorMessage
          message={error}
          onRetry={fetchBooks}
          onDismiss={clearError}
        />
      )}

      {/* Books Grid */}
      {books.length === 0 && !loading ? (
        <EmptyState
          message="Start building your library by adding your first book."
          actionLabel="Add Your First Book"
          onAction={() => setShowCreateModal(true)}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onView={handleViewBook}
              onEdit={handleEditBook}
              onDelete={handleDeleteBookClick}
            />
          ))}
        </div>
      )}

      {/* Create Book Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Add New Book"
        size="lg"
      >
        <BookForm
          onSubmit={handleCreateBook}
          onCancel={() => setShowCreateModal(false)}
          loading={loading}
        />
      </Modal>

      {/* Edit Book Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedBook(null);
        }}
        title="Edit Book"
        size="lg"
      >
        <BookForm
          book={selectedBook}
          onSubmit={handleUpdateBook}
          onCancel={() => {
            setShowEditModal(false);
            setSelectedBook(null);
          }}
          loading={loading}
        />
      </Modal>

      {/* View Book Modal */}
      <Modal
        isOpen={showViewModal}
        onClose={() => {
          setShowViewModal(false);
          setSelectedBook(null);
        }}
        title="Book Details"
        size="lg"
      >
        {selectedBook && (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {selectedBook.title}
              </h3>
              <p className="text-gray-600">
                <span className="font-medium">Author:</span> {selectedBook.author}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Year:</span> {selectedBook.year}
              </p>
            </div>
            
            {selectedBook.description && (
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                <p className="text-gray-700 leading-relaxed">
                  {selectedBook.description}
                </p>
              </div>
            )}
            
            <div className="border-t pt-4 text-sm text-gray-500">
              <p>Added: {formatDate(selectedBook.created_at)}</p>
              <p>Last updated: {formatDate(selectedBook.updated_at)}</p>
            </div>
            
            <div className="flex space-x-3 pt-4">
              <button
                onClick={() => {
                  setShowViewModal(false);
                  handleEditBook(selectedBook);
                }}
                className="flex-1 bg-primary-100 text-primary-700 py-2 px-4 rounded hover:bg-primary-200 transition-colors"
              >
                Edit Book
              </button>
              <button
                onClick={() => setShowViewModal(false)}
                className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedBook(null);
        }}
        title="Delete Book"
        size="md"
      >
        {selectedBook && (
          <div className="space-y-4">
            <p className="text-gray-700">
              Are you sure you want to delete <strong>"{selectedBook.title}"</strong>? 
              This action cannot be undone.
            </p>
            
            <div className="flex space-x-3 pt-4">
              <button
                onClick={handleDeleteBook}
                disabled={loading}
                className="flex-1 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 disabled:bg-red-400 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                {loading ? 'Deleting...' : 'Delete Book'}
              </button>
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedBook(null);
                }}
                disabled={loading}
                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 disabled:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
