import { useState } from 'react';
import BookForm from './components/bookform/BookForm';
import BookList from './components/booklist/BookList';
import SearchComponent from './components/searchComponent/SearchComponent';
import Modal from './components/modal/Modal';
import { Book } from './types';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';
import { useGetBooksQuery, useCreateBookMutation, useUpdateBookMutation, useDeleteBookMutation } from './features/bookAPi';

function App() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [editBook, setEditBook] = useState<Book | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const { data: books, isLoading } = useGetBooksQuery(searchQuery);
  const [addBook] = useCreateBookMutation();
  const [updateBook] = useUpdateBookMutation();
  const [deleteBook] = useDeleteBookMutation();

  const closeModal = () => setModalOpen(false);

  const handleFormSubmit = async (book: Book) => {
    try {
      const savedBook = editBook ? await updateBook(book).unwrap() : await addBook(book).unwrap();
      closeModal();
      toast.success(`Book ${editBook ? 'updated' : 'added'} successfully!`);
    } catch (err) {
      console.error(`Failed to ${editBook ? 'update' : 'add'} book:`, err);
      toast.error(`Failed to ${editBook ? 'update' : 'add'} book`);
    }
  };

  const handleDelete = async (bookId: number) => {
    try {
      await deleteBook(bookId).unwrap();
      toast.success("Book deleted successfully!");
    } catch (err) {
      console.error('Failed to delete book:', err);
      toast.error('Failed to delete book');
    }
  };

  const handleEdit = (book: Book) => {
    setEditBook(book);
    setModalOpen(true);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const filteredBooks = books?.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  return (
    <div className="app">
      <SearchComponent onSearch={handleSearch} />
      <ToastContainer/>
      <button onClick={() => setModalOpen(true)} className='add-book-btn'>Add Book</button>
      <Modal show={isModalOpen} onClose={closeModal}>
        <BookForm onSubmit={handleFormSubmit} initialData={editBook} closeModal={closeModal} />
      </Modal>
      {isLoading ? <p>Loading...</p> : <BookList books={filteredBooks} onEdit={handleEdit} onDelete={handleDelete} />}
    </div>
  );
}

export default App;
