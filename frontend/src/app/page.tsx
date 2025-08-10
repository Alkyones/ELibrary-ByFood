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
  // Filter and ordering state
  const [filterTitle, setFilterTitle] = useState('');
  const [filterAuthor, setFilterAuthor] = useState('');
  const [orderBy, setOrderBy] = useState('');
  const [orderDir, setOrderDir] = useState<'asc' | 'desc'>('asc');

  // Fetch books with filters/order
  const handleFilterOrder = () => {
    fetchBooks({
      title: filterTitle,
      author: filterAuthor,
      orderBy,
      orderDir,
    });
  };
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
      {/* Filter & Order Controls */}
      <div className="bg-white p-4 rounded-lg shadow flex flex-col md:flex-row md:items-end gap-4 mb-4">
        <div className="flex flex-col gap-2 md:flex-row md:gap-4">
          <input
            type="text"
            placeholder="Filter by Title"
            value={filterTitle}
            onChange={e => setFilterTitle(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') handleFilterOrder(); }}
            className="border rounded px-3 py-2 text-sm"
          />
          <input
            type="text"
            placeholder="Filter by Author"
            value={filterAuthor}
            onChange={e => setFilterAuthor(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') handleFilterOrder(); }}
            className="border rounded px-3 py-2 text-sm"
          />
          <select
            value={orderBy}
            onChange={e => setOrderBy(e.target.value)}
            className="border rounded px-3 py-2 text-sm"
          >
            <option value="">Order By</option>
            <option value="title">Title</option>
            <option value="author">Author</option>
            <option value="year">Year</option>
          </select>
          <select
            value={orderDir}
            onChange={e => setOrderDir(e.target.value as 'asc' | 'desc')}
            className="border rounded px-3 py-2 text-sm"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
        <button
          onClick={handleFilterOrder}
          className="mt-2 md:mt-0 px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700"
        >
          Search
        </button>
      </div>
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
            {selectedBook.year && (
              <p className="text-gray-700 mb-1"><span className="font-semibold">Year:</span> {selectedBook.year}</p>
            )}
            <div className="mt-4">
              <h3 className="font-semibold text-gray-900 mb-1">Description</h3>
              <p className="text-gray-600">{selectedBook.description || 'No description available.'}</p>
            </div>
            <hr className="my-4" />
            <div className="text-xs text-gray-500">
              <div>Added: {selectedBook.created_at ? formatDate(selectedBook.created_at) : '-'}</div>
              <div>Last updated: {selectedBook.updated_at ? formatDate(selectedBook.updated_at) : '-'}</div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={() => {
                  setShowViewModal(false);
                  handleEditBook(selectedBook);
                }}
                className="px-4 py-2 text-sm font-medium text-blue-700 bg-blue-100 rounded-md hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Edit Book
              </button>
              <button
                type="button"
                onClick={() => setShowViewModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
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
