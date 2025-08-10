import axios from 'axios';
import { Book, CreateBookRequest, UpdateBookRequest, APIResponse } from '@/types/book';

// Use Next.js proxy instead of direct backend calls to avoid CORS
const API_BASE_URL = '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Response Error:', error);
    return Promise.reject(error);
  }
);

export const bookAPI = {
  // Get all books
  getAllBooks: async (params?: {
    title?: string;
    author?: string;
    orderBy?: string;
    orderDir?: 'asc' | 'desc';
  }): Promise<Book[]> => {
    try {
      const query = [];
      if (params?.title) query.push(`title=${encodeURIComponent(params.title)}`);
      if (params?.author) query.push(`author=${encodeURIComponent(params.author)}`);
      if (params?.orderBy) query.push(`orderBy=${encodeURIComponent(params.orderBy)}`);
      if (params?.orderDir) query.push(`orderDir=${encodeURIComponent(params.orderDir)}`);
      const queryString = query.length ? `?${query.join('&')}` : '';
      const response = await api.get<APIResponse<Book[]>>(`/books${queryString}`);
      return response.data.data || [];
    } catch (error) {
      console.error('Failed to fetch books:', error);
      throw new Error('Failed to fetch books');
    }
  },

  // Get book by ID
  getBookById: async (id: number): Promise<Book> => {
    try {
      const response = await api.get<APIResponse<Book>>(`/books/${id}`);
      return response.data.data!;
    } catch (error) {
      console.error(`Failed to fetch book ${id}:`, error);
      throw new Error('Failed to fetch book');
    }
  },

  // Create new book
  createBook: async (book: CreateBookRequest): Promise<Book> => {
    try {
      const response = await api.post<APIResponse<Book>>('/books', book);
      return response.data.data!;
    } catch (error: any) {
      console.error('Failed to create book:', error);
      const message = error.response?.data?.error || 'Failed to create book';
      throw new Error(message);
    }
  },

  // Update book
  updateBook: async (id: number, book: UpdateBookRequest): Promise<Book> => {
    try {
      const response = await api.put<APIResponse<Book>>(`/books/${id}`, book);
      return response.data.data!;
    } catch (error: any) {
      console.error(`Failed to update book ${id}:`, error);
      const message = error.response?.data?.error || 'Failed to update book';
      throw new Error(message);
    }
  },

  // Delete book
  deleteBook: async (id: number): Promise<void> => {
    try {
      console.log(`Attempting to delete book ${id} at URL: ${API_BASE_URL}/books/${id}`);
      const response = await api.delete(`/books/${id}`);
      console.log('Delete response:', response);
    } catch (error: any) {
      console.error(`Failed to delete book ${id}:`, error);
      console.error('Error details:', {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        headers: error.response?.headers,
        config: error.config
      });
      
  
      const message = error.response?.data?.error || 'Failed to delete book';
      throw new Error(message);
    }
  },

  // Health check
  healthCheck: async (): Promise<boolean> => {
    try {
      await api.get('/health');
      return true;
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  },
};

export default api;
