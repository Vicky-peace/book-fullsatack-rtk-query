import BookItem from '../bookitem/BookItem';
import { Book } from '../../types';
import { useGetBooksQuery } from '../../features/bookAPi';
import './booktable.scss';

interface BookTableProps {
  onEdit: (book: Book) => void;
  onDelete: (bookId: number) => void;
}

const BookTable = ({ onEdit, onDelete }: BookTableProps): JSX.Element => {
  const { data: books, isFetching, isError, error } = useGetBooksQuery();

  if (isFetching) return <div>Loading books...</div>;
  if (isError) {
    const message = 'status' in error
      ? `Error fetching books: ${error.status} - ${JSON.stringify(error.data)}`
      : `Error fetching books: ${error.error}`;
    return <div>{message}</div>;
  }

  return (
    <table className='bookTable'>
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Publication Year</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {books?.map(book => (
          <BookItem
            key={book.id}
            book={book}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </tbody>
    </table>
  );
};

export default BookTable;
