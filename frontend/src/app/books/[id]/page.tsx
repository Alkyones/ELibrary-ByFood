'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useBooks } from '@/context/BookContext';
import { LoadingState } from '@/components/LoadingSpinner';
import { ErrorMessage } from '@/components/ErrorMessage';
import { formatDate } from '@/utils/validation';

export default function BookDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { books, loading, error, fetchBookById } = useBooks();
  
  const bookId = parseInt(params.id as string);
  const book = books.find(b => b.id === bookId);

  React.useEffect(() => {
    if (!book && bookId) {
      fetchBookById(bookId);
    }
  }, [bookId, book, fetchBookById]);

  if (loading && !book) {
    return <LoadingState message="Loading book details..." />;
  }

  if (error) {
    return (
      <ErrorMessage
        message={error}
        onRetry={() => fetchBookById(bookId)}
      />
    );
  }

  if (!book) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Book Not Found</h2>
        <p className="text-gray-600 mb-6">The book you're looking for doesn't exist.</p>
        <button
          onClick={() => router.push('/')}
          className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
        >
          Back to Library
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => router.back()}
          className="text-primary-600 hover:text-primary-700 mb-4 inline-flex items-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
      </div>

      {/* Book Details Card */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-6 py-8">
          <div className="flex flex-col lg:flex-row lg:space-x-8">
            {/* Book Info */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {book.title}
              </h1>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center">
                  <span className="font-medium text-gray-700 w-24">Author:</span>
                  <span className="text-gray-900">{book.author}</span>
                </div>
                
                <div className="flex items-center">
                  <span className="font-medium text-gray-700 w-24">Year:</span>
                  <span className="text-gray-900">{book.year}</span>
                </div>
                
                <div className="flex items-center">
                  <span className="font-medium text-gray-700 w-24">Book ID:</span>
                  <span className="text-gray-600">#{book.id}</span>
                </div>
              </div>

              {book.description && (
                <div className="mb-6">
                  <h3 className="font-medium text-gray-900 mb-3">Description</h3>
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {book.description}
                    </p>
                  </div>
                </div>
              )}

              {/* Metadata */}
              <div className="border-t pt-6 space-y-2 text-sm text-gray-500">
                <p>
                  <span className="font-medium">Added:</span> {formatDate(book.created_at)}
                </p>
                <p>
                  <span className="font-medium">Last updated:</span> {formatDate(book.updated_at)}
                </p>
              </div>
            </div>

            {/* Placeholder for book cover */}
            <div className="lg:w-64 mt-8 lg:mt-0">
              <div className="bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg p-8 flex items-center justify-center h-80 lg:h-96">
                <div className="text-center">
                  <svg className="w-16 h-16 text-primary-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <p className="text-primary-600 font-medium">Book Cover</p>
                  <p className="text-primary-500 text-sm">Placeholder</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 mt-8 pt-6 border-t">
            <button
              onClick={() => router.push(`/books/${book.id}/edit`)}
              className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium"
            >
              Edit Book
            </button>
            <button
              onClick={() => router.push('/')}
              className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              Back to Library
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
