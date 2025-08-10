import { BookFormData, FormErrors } from '@/types/book';

export const validateBookForm = (data: BookFormData): FormErrors => {
  const errors: FormErrors = {};

  // Title validation
  if (!data.title.trim()) {
    errors.title = 'Title is required';
  } else if (data.title.length > 200) {
    errors.title = 'Title must be less than 200 characters';
  }

  // Author validation
  if (!data.author.trim()) {
    errors.author = 'Author is required';
  } else if (data.author.length > 100) {
    errors.author = 'Author must be less than 100 characters';
  }

  // Year validation
  const currentYear = new Date().getFullYear();
  const year = parseInt(data.year);
  
  if (!data.year.trim()) {
    errors.year = 'Year is required';
  } else if (isNaN(year)) {
    errors.year = 'Year must be a valid number';
  } else if (year < 1000 || year > currentYear + 10) {
    errors.year = `Year must be between 1000 and ${currentYear + 10}`;
  }

  // Description validation (optional but with length limit)
  if (data.description && data.description.length > 1000) {
    errors.description = 'Description must be less than 1000 characters';
  }

  // Status validation
  const validStatuses = ['to-read', 'reading', 'read'];
  if (!data.status) {
    errors.status = 'Reading status is required';
  } else if (!validStatuses.includes(data.status)) {
    errors.status = 'Invalid reading status';
  }

  return errors;
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const formatYear = (year: number): string => {
  return year.toString();
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};
