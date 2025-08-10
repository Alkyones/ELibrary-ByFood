'use client';

import React from 'react';
import { Book } from '@/types/book';
import { formatDate, truncateText } from '@/utils/validation';

interface BookCardProps {
  book: Book;
  onView: (book: Book) => void;
  onEdit: (book: Book) => void;
  onDelete: (book: Book) => void;
}

export const BookCard: React.FC<BookCardProps> = ({ book, onView, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6 border border-gray-200">
      <div className="flex flex-col h-full">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {book.title}
          </h3>
          <p className="text-gray-600 mb-2">
            <span className="font-medium">Author:</span> {book.author}
          </p>
          <p className="text-gray-600 mb-2">
            <span className="font-medium">Year:</span> {book.year}
          </p>
          <div className="mb-3">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              book.status === 'read' 
                ? 'bg-green-100 text-green-800'
                : book.status === 'reading'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-gray-100 text-gray-800'
            }`}>
              {book.status === 'read' ? 'Read' : book.status === 'reading' ? 'Currently Reading' : 'Want to Read'}
            </span>
          </div>
          {book.description && (
            <p className="text-gray-700 text-sm mb-4 line-clamp-3">
              {truncateText(book.description, 120)}
            </p>
          )}
        </div>
        
        <div className="border-t pt-4 mt-4">
          <p className="text-xs text-gray-500 mb-3">
            Added: {formatDate(book.created_at)}
          </p>
          
          <div className="flex space-x-2">
            <button
              onClick={() => onView(book)}
              className="flex-1 bg-primary-100 text-primary-700 text-sm py-2 px-3 rounded hover:bg-primary-200 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
            >
              View
            </button>
            <button
              onClick={() => onEdit(book)}
              className="flex-1 bg-yellow-100 text-yellow-700 text-sm py-2 px-3 rounded hover:bg-yellow-200 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-1"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(book)}
              className="flex-1 bg-red-100 text-red-700 text-sm py-2 px-3 rounded hover:bg-red-200 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
