import React, { useState, FormEvent, useEffect } from 'react';
import { toast } from 'react-toastify';
import './bookform.scss';
import { Book } from '../../types';
import { useCreateBookMutation, useUpdateBookMutation } from '../../features/bookAPi';

interface BookFormProps {
  onSubmit: (book: Book) => void;
  initialData: Book | null;
  closeModal: () => void;
}


const BookForm = ({  initialData, closeModal }: BookFormProps): JSX.Element => {
  const [book, setBook] = useState<Book>({ id: 0, title: '', author: '', year: 0 });
  
const [addBook] = useCreateBookMutation();
const [updateBook] = useUpdateBookMutation();

  useEffect(() => {
    if (initialData) {
      setBook(initialData);
    } else {
      resetForm();
    }
  }, [initialData]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setBook(prevBook => ({ ...prevBook, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Clone the book object and remove the 'id' property for new entries
    let submissionBook = { ...book };
    if (!initialData) {
      delete submissionBook?.id; 
    }
  
    try {
     
       await initialData
        ? await updateBook({...submissionBook, id:book.id}).unwrap()
        : await addBook(submissionBook).unwrap();

        closeModal();
      toast.success("Book added successfully!");
    } catch (error: any) {
      console.error('Error submitting book:', error.response?.data || error.message);
      alert(`Failed to submit book: ${error.response?.data.error || error.message}`);
      toast.error(`Failed to ${initialData ? 'update' : 'add'} book: ${error.response?.data.error || error.message}`);
      toast.error("Failed to add book!");
    }
  };
  
  // Function to reset the form to initial empty values
  const resetForm = () => {
    setBook({ id: 0, title: '', author: '', year: 0 }); 
  };
  
  return (
    <form onSubmit={handleSubmit} className='form'>
      <h2>{initialData ? 'Edit Book' : 'Add Book'}</h2>
      <div className='form-group'>
        <label htmlFor="title" className='label'>Title</label>
        <input id="title" type="text" name="title" value={book.title} onChange={handleChange} className='input' required />
        <label htmlFor="author" className='label'>Author</label>
        <input id="author" type="text" name="author" value={book.author} onChange={handleChange} className='input' required />
        <label htmlFor="year" className='label'>Publication Year</label>
        <input id="year" type="text" name="year" value={book.year} onChange={handleChange} className='input' required />
        <button type="submit" className='submitBtn'>{initialData ? 'Update' : 'Submit'}</button>
      </div>
    </form>
  );
};

export default BookForm;
