export interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
  description: string;
  status: 'to-read' | 'reading' | 'read';
  created_at: string;
  updated_at: string;
}

export interface CreateBookRequest {
  title: string;
  author: string;
  year: number;
  description: string;
  status: 'to-read' | 'reading' | 'read';
}

export interface UpdateBookRequest {
  title: string;
  author: string;
  year: number;
  description: string;
  status: 'to-read' | 'reading' | 'read';
}

export interface APIResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface BookFormData {
  title: string;
  author: string;
  year: string;
  description: string;
  status: 'to-read' | 'reading' | 'read';
}

export interface FormErrors {
  title?: string;
  author?: string;
  year?: string;
  description?: string;
  status?: string;
}
