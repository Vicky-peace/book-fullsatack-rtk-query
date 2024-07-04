import { useDeleteBookMutation } from '../../features/bookAPi';
import './bookItem.scss';
import { Book } from '../../types';
import {toast} from 'react-toastify';

interface BookItemProps {
  book: Book;
  onEdit: (book: Book) => void;
}

const BookItem = ({ book, onEdit }: BookItemProps) => {
const [deleteBook, {isLoading: isDeleting}] = useDeleteBookMutation();


  const handleDelete = async (bookId: number) => {
    try {
      await deleteBook(bookId).unwrap();
      toast.success("Book deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete book!");
      console.error('Error deleting book:', error);
    }
  };

  const handleEdit = () => {
    onEdit(book);
  };

  return (
    <tr className='bookItem'>
      <td>{book.title}</td>
      <td>{book.author}</td>
      <td>{book.year}</td>
      <td className='actions'>
        <button onClick={handleEdit} className='edit'>Edit</button>
        <button onClick={() => book.id && handleDelete(book.id)} className='delete' disabled={isDeleting}>
          {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
      </td>
    </tr>
  );
};

export default BookItem;
