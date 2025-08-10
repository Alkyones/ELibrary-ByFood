import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import './globals.css';
import { BookProvider } from '@/context/BookContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Book Library - Manage Your Book Collection',
  description: 'A full-stack application for managing your personal book library with CRUD operations.',
  keywords: 'books, library, CRUD, Next.js, TypeScript, Go, Golang',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 min-h-screen`}>
        <BookProvider>
          <div className="min-h-screen">
            <header className="bg-white shadow-sm border-b border-gray-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-6">
                  <div className="flex items-center">
                    <h1 className="text-2xl font-bold text-gray-900">
                      📚 E-Library
                    </h1>
                  </div>
                  <nav className="hidden md:flex space-x-8">
                    <Link
                      href="/"
                      className="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/books"
                      className="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      Books
                    </Link>
                    <Link
                      href="/documentation"
                      className="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      Documentation
                    </Link>
                  </nav>
                </div>
              </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {children}
            </main>

            <footer className="bg-white border-t border-gray-200 mt-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center text-gray-500 text-sm">
                  <p>&copy; 2025 E-Library. Built with Next.js and Go.</p>
                </div>
              </div>
            </footer>
          </div>
        </BookProvider>
      </body>
    </html>
  );
}
