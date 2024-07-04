import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Book {
    id: number;
    title: string;
    author: string;
    year: number;
}

export const bookApi = createApi({
    reducerPath: "bookApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://book-repository-server.onrender.com" }),
    tagTypes: ['Book'],
    endpoints: (builder) => ({
        getBooks: builder.query<Book[], void>({
            query: () => 'books',
            providesTags: [{ type: 'Book', id: 'LIST' }],
        }),
        createBook: builder.mutation<Book, Partial<Book>>({
            query: (newBook) => ({
                url: 'books',
                method: 'POST',
                body: newBook,
            }),
            invalidatesTags: [{ type: 'Book', id: 'LIST' }],
        }),
        updateBook: builder.mutation<Book, Partial<Book>>({
            query: ({ id, ...rest }) => ({
                url: `books/${id}`,
                method: 'PUT',
                body: rest,
            }),
            invalidatesTags: [{ type: 'Book', id: 'LIST' }],
        }),
        deleteBook: builder.mutation<void, number>({
            query: (id) => ({
                url: `books/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{ type: 'Book', id: 'LIST' }],
        }),
    })
});

export const { useGetBooksQuery, useCreateBookMutation, useUpdateBookMutation, useDeleteBookMutation } = bookApi;
