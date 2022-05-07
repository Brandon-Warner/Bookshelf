import { useQuery } from '@apollo/client';
import React, { useState, useEffect } from 'react';
import './Books.css';
import { ALL_BOOKS } from '../../queries';

const Books = ({ show }) => {
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState('');
    const [uniqueGenres, setUniqueGenres] = useState([]);

    const result = useQuery(ALL_BOOKS);

    // ERROR EXISTS IN SET GENRE CODE BLOCK
    useEffect(() => {
        if (result.data) {
            const allBooks = result.data.allBooks;
            setBooks(allBooks);
            // let genres = ['ALL'];
            // books.forEach(book => {
            //     book.genres.forEach(g => {
            //         genres.push(g);
            //     });
            // });
            // setGenres(genres);

            // setUniqueGenres([...new Set(genres)]);
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
        <div className='container'>
            <div className='books_genres'>
                <p className='books_genres__title'>filter by genre: </p>
                <div className='books_genres__buttons'>
                    {uniqueGenres.map(genre => (
                        <button
                            key={genre}
                            className='books_genres__button'
                            onClick={() => setSelectedGenre(genre)}
                        >
                            {genre}
                        </button>
                    ))}
                </div>
            </div>
            <div className='books'>
                <h2 className='books_title'>books</h2>
                <table className='books_table'>
                    <thead className='books_table__headers'>
                        <tr>
                            <th scope='col'>title</th>
                            <th scope='col'>author</th>
                            <th scope='col'>published</th>
                        </tr>
                    </thead>
                    <tbody className='books_table__body'>
                        {filteredBooks.map(a => (
                            <tr key={a.title}>
                                <th scope='row'>{a.title}</th>
                                <td>{a.author.name}</td>
                                <td>{a.published}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Books;
