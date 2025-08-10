'use client';

import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { Book } from '@/types/book';
import { bookAPI } from '@/utils/api';

interface BookState {
  books: Book[];
  selectedBook: Book | null;
  loading: boolean;
  error: string | null;
}

type BookAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_BOOKS'; payload: Book[] }
  | { type: 'SET_SELECTED_BOOK'; payload: Book | null }
  | { type: 'ADD_BOOK'; payload: Book }
  | { type: 'UPDATE_BOOK'; payload: Book }
  | { type: 'DELETE_BOOK'; payload: number }
  | { type: 'CLEAR_ERROR' };

interface BookContextType extends BookState {
  fetchBooks: () => Promise<void>;
  fetchBookById: (id: number) => Promise<void>;
  createBook: (book: Omit<Book, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updateBook: (id: number, book: Omit<Book, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  deleteBook: (id: number) => Promise<void>;
  clearError: () => void;
  clearSelectedBook: () => void;
}

const initialState: BookState = {
  books: [],
  selectedBook: null,
  loading: false,
  error: null,
};

const bookReducer = (state: BookState, action: BookAction): BookState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    
    case 'SET_BOOKS':
      return { ...state, books: action.payload, loading: false, error: null };
    
    case 'SET_SELECTED_BOOK':
      return { ...state, selectedBook: action.payload, loading: false, error: null };
    
    case 'ADD_BOOK':
      return {
        ...state,
        books: [action.payload, ...state.books],
        loading: false,
        error: null,
      };
    
    case 'UPDATE_BOOK':
      return {
        ...state,
        books: state.books.map(book =>
          book.id === action.payload.id ? action.payload : book
        ),
        selectedBook: state.selectedBook?.id === action.payload.id ? action.payload : state.selectedBook,
        loading: false,
        error: null,
      };
    
    case 'DELETE_BOOK':
      return {
        ...state,
        books: state.books.filter(book => book.id !== action.payload),
        selectedBook: state.selectedBook?.id === action.payload ? null : state.selectedBook,
        loading: false,
        error: null,
      };
    
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    
    default:
      return state;
  }
};

const BookContext = createContext<BookContextType | undefined>(undefined);

export const BookProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(bookReducer, initialState);

  const fetchBooks = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const books = await bookAPI.getAllBooks();
      dispatch({ type: 'SET_BOOKS', payload: books });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: (error as Error).message });
    }
  };

  const fetchBookById = async (id: number) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const book = await bookAPI.getBookById(id);
      dispatch({ type: 'SET_SELECTED_BOOK', payload: book });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: (error as Error).message });
    }
  };

  const createBook = async (bookData: Omit<Book, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const newBook = await bookAPI.createBook(bookData);
      dispatch({ type: 'ADD_BOOK', payload: newBook });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: (error as Error).message });
      throw error; // Re-throw to handle in component
    }
  };

  const updateBook = async (id: number, bookData: Omit<Book, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const updatedBook = await bookAPI.updateBook(id, bookData);
      dispatch({ type: 'UPDATE_BOOK', payload: updatedBook });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: (error as Error).message });
      throw error; // Re-throw to handle in component
    }
  };

  const deleteBook = async (id: number) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      await bookAPI.deleteBook(id);
      dispatch({ type: 'DELETE_BOOK', payload: id });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: (error as Error).message });
      throw error; // Re-throw to handle in component
    }
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const clearSelectedBook = () => {
    dispatch({ type: 'SET_SELECTED_BOOK', payload: null });
  };

  // Fetch books on mount
  useEffect(() => {
    fetchBooks();
  }, []);

  const value: BookContextType = {
    ...state,
    fetchBooks,
    fetchBookById,
    createBook,
    updateBook,
    deleteBook,
    clearError,
    clearSelectedBook,
  };

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
};

export const useBooks = () => {
  const context = useContext(BookContext);
  if (context === undefined) {
    throw new Error('useBooks must be used within a BookProvider');
  }
  return context;
};
