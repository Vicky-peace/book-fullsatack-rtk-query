import React, { useState } from 'react';
import BookItem from '../bookitem/BookItem';
import Pagination from '../pagination/Pagination';
import { Book } from '../../types'; // Ensure the path to your types is correct
import './booklist.scss';

interface BookListProps {
  books: Book[];
  onEdit: (book: Book) => void;
  onDelete: (bookId: number) => void;
}

const BOOKS_PER_PAGE = 4;

const BookList: React.FC<BookListProps> = ({ books, onEdit, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the total number of pages
  const totalPages = Math.ceil(books.length / BOOKS_PER_PAGE);

  // Calculate the current books to display based on the current page
  const startIndex = (currentPage - 1) * BOOKS_PER_PAGE;
  const selectedBooks = books.slice(startIndex, startIndex + BOOKS_PER_PAGE);

  // Handler for changing the page
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className='bookList'>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Year</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {selectedBooks.map((book) => (
            <BookItem 
              key={book.id} 
              book={book} 
              onEdit={onEdit} 
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
};

export default BookList;
