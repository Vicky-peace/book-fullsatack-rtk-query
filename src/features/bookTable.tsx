
import { toast } from "react-toastify";
import { useGetBooksQuery, useDeleteBookMutation } from "./bookAPi";

const BookTable = () => {
    // Fetch books with polling and manage focus behavior
    const { data: booksData, error, isLoading, isError } = useGetBooksQuery(undefined, { pollingInterval: 3000, skipPollingIfUnfocused: true });
    
    // Mutation hook for deleting a book
    const [deleteBook, { isLoading: isDeleting }] = useDeleteBookMutation();

    const handleDelete = async (id: number) => {
        try {
            await deleteBook(id).unwrap();
            toast.success('Book deleted successfully');
        } catch (error) {
            toast.error('Failed to delete book');
            console.error('Error deleting book:', error);
        }
    }

    return (
        <div>
            <h4>Book Data</h4>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Year</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading ? (
                        <tr>
                            <td colSpan={4} style={{ textAlign: 'center' }}>Loading books...</td>
                        </tr>
                    ) : isError ? (
                        <tr>
                            <td colSpan={4} style={{ textAlign: 'center' }}>Error: {error.message}</td>
                        </tr>
                    ) : booksData?.length > 0 ? (
                        booksData.map(book => (
                            <tr key={book.id}>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.year}</td>
                                <td>
                                    <button 
                                        onClick={() => handleDelete(book.id)}
                                        disabled={isDeleting}
                                        style={{ marginRight: '10px' }}
                                    >
                                        {isDeleting ? 'Deleting...' : 'Delete'}
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4} style={{ textAlign: 'center' }}>No books found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default BookTable;
