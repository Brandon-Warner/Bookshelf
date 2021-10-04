import { useQuery } from '@apollo/client';
import React, { useState, useEffect } from 'react';

import { ALL_BOOKS } from '../queries';

const Books = ({ show }) => {
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState('');
    const [uniqueGenres, setUniqueGenres] = useState([]);

    const result = useQuery(ALL_BOOKS);

    useEffect(() => {
        if (result.data) {
            const allBooks = result.data.allBooks;
            setBooks(allBooks);
            let genres = ['ALL'];
            books.forEach(book => {
                book.genres.forEach(g => {
                    genres.push(g);
                });
            });
            setGenres(genres);

            setUniqueGenres([...new Set(genres)]);
        }

        setSelectedGenre('ALL');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [result, books]);

    useEffect(() => {
        if (selectedGenre === 'ALL') {
            setFilteredBooks(books);
        } else {
            setFilteredBooks(books.filter(b => b.genres.includes(selectedGenre)));
        }
    }, [books, selectedGenre]);

    if (!show) {
        return null;
    }

    return (
        <div>
            <h2>books</h2>
            <br />
            <table>
                <tbody>
                    <tr>
                        <th>title</th>
                        <th>author</th>
                        <th>published</th>
                    </tr>
                    {filteredBooks.map(a => (
                        <tr key={a.title} className='book'>
                            <td className='book-title'>{a.title}</td>
                            <td className='book-author'>{a.author.name}</td>
                            <td className='book-published'>{a.published}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                {uniqueGenres.map(genre => (
                    <button key={genre} onClick={() => setSelectedGenre(genre)}>
                        {genre}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Books;
