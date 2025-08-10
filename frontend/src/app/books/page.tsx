'use client';

import React, { useState } from 'react';
import { useBooks } from '@/context/BookContext';
import { BookCard } from '@/components/BookCard';
import { BookForm } from '@/components/BookForm';
import { Modal } from '@/components/Modal';
import { LoadingState } from '@/components/LoadingSpinner';
import { ErrorMessage, EmptyState } from '@/components/ErrorMessage';
import { Book } from '@/types/book';

export default function BooksPage() {
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
  };

  const handleEditBook = (book: Book) => {
    setSelectedBook(book);
    setShowEditModal(true);
  };

  const handleDeleteClick = (book: Book) => {
    setSelectedBook(book);
    setShowDeleteModal(true);
  };

  const handleCloseModals = () => {
    setShowCreateModal(false);
    setShowEditModal(false);
    setShowDeleteModal(false);
    setSelectedBook(null);
    if (error) {
      clearError();
    }
  };

  if (loading && books.length === 0) {
    return <LoadingState message="Loading your book library..." />;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Your Book Library</h1>
          <p className="mt-2 text-gray-600">
            Manage your personal book collection
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add New Book
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-primary-500 rounded-md flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Books</dt>
                  <dd className="text-lg font-medium text-gray-900">{books.length}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Read Books</dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {books.filter(book => book.status === 'read').length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Currently Reading</dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {books.filter(book => book.status === 'reading').length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Error Display */}
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
          message="No books in your library yet. Start building your collection by adding your first book."
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
              onDelete={handleDeleteClick}
            />
          ))}
        </div>
      )}

      {/* Loading overlay */}
      {loading && books.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6">
            <LoadingState message="Updating your library..." />
          </div>
        </div>
      )}

      {/* Create Book Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={handleCloseModals}
        title="Add New Book"
      >
        <BookForm
          onSubmit={handleCreateBook}
          onCancel={handleCloseModals}
          loading={loading}
        />
      </Modal>
        {/* View Book Modal */}
        <Modal
          isOpen={!!selectedBook && !showEditModal && !showDeleteModal && !showCreateModal}
          onClose={handleCloseModals}
          title="Book Details"
        >
          {selectedBook && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-2xl text-gray-900">{selectedBook.title}</h2>
                {selectedBook.status && (
                  <span
                    className={`inline-block px-3 py-1 text-sm font-semibold rounded-full 
                      ${selectedBook.status === 'read' ? 'bg-green-100 text-green-800' : ''}
                      ${selectedBook.status === 'reading' ? 'bg-yellow-100 text-yellow-800' : ''}
                    `}
                  >
                    {selectedBook.status.charAt(0).toUpperCase() + selectedBook.status.slice(1)}
                  </span>
                )}
              </div>
              <p className="text-gray-700 mb-1"><span className="font-semibold">Author:</span> {selectedBook.author}</p>
              <div className="mt-4">
                <h3 className="font-semibold text-gray-900 mb-1">Description</h3>
                <p className="text-gray-600">{selectedBook.description || 'No description available.'}</p>
              </div>
              <hr className="my-4" />
              <div className="text-xs text-gray-500">
                <div>Added: {selectedBook.created_at ? new Date(selectedBook.created_at).toLocaleString() : '-'}</div>
                <div>Last updated: {selectedBook.updated_at ? new Date(selectedBook.updated_at).toLocaleString() : '-'}</div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => { setShowEditModal(true); }}
                  className="px-4 py-2 text-sm font-medium text-blue-700 bg-blue-100 rounded-md hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Edit Book
                </button>
                <button
                  type="button"
                  onClick={handleCloseModals}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </Modal>

      {/* Edit Book Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={handleCloseModals}
        title="Edit Book"
      >
        {selectedBook && (
          <BookForm
            book={selectedBook}
            onSubmit={handleUpdateBook}
            onCancel={handleCloseModals}
            loading={loading}
          />
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={handleCloseModals}
        title="Delete Book"
      >
        {selectedBook && (
          <div className="space-y-4">
            <div className="text-sm text-gray-600">
              <p>Are you sure you want to delete this book? This action cannot be undone.</p>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900">{selectedBook.title}</h4>
                <p className="text-gray-600">by {selectedBook.author}</p>
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={handleCloseModals}
                disabled={loading}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteBook}
                disabled={loading}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
              >
                {loading ? 'Deleting...' : 'Delete Book'}
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
