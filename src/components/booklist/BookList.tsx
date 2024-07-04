import  { useState } from 'react';
import BookItem from '../bookitem/BookItem';
import Pagination from '../pagination/Pagination';
import { useGetBooksQuery } from '../../features/bookAPi'; // Ensure this path is correct
import './booklist.scss';

const BOOKS_PER_PAGE = 4;

const BookList = (): JSX.Element => {
  const { data: books, isLoading, isError, error } = useGetBooksQuery();
  const [currentPage, setCurrentPage] = useState(1);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Improved error handling
  let errorMessage = "An unknown error occurred.";
  if (isError) {
    if ('status' in error) {
      errorMessage = `Error: ${error.status} ${error.data ? JSON.stringify(error.data) : ''}`;
    } else if ('error' in error) {
      errorMessage = `Error: ${error.error}`;
    }
  }

  if (isError) {
    return <div>{errorMessage}</div>;
  }

  const totalPages = Math.ceil((books?.length || 0) / BOOKS_PER_PAGE);
  const startIndex = (currentPage - 1) * BOOKS_PER_PAGE;
  const selectedBooks = books?.slice(startIndex, startIndex + BOOKS_PER_PAGE) || [];

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
            <BookItem key={book.id} book={book} onEdit={() => {}} />
          ))}
        </tbody>
      </table>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  );
};

export default BookList;
