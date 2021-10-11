import React from 'react';
import { useQuery } from '@apollo/client';
import { FAV_GENRE_BOOK } from '../../queries';
import './Recommend.css';

const Recommend = ({ show, user }) => {
    // console.log('Recommend page user: ', user);

    const booksResult = useQuery(FAV_GENRE_BOOK, {
        variables: {
            genre: !user ? 'thriller' : user.favoriteGenre
        }
    });

    if (!show) {
        return null;
    }

    return (
        <div>
            <h2>Book Recommendations: </h2>
            <p>
                matches to your favorite genre <strong>{user.favoriteGenre}</strong>
            </p>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>author</th>
                        <th>published</th>
                    </tr>
                    {booksResult.data.allBooks.map(a => (
                        <tr key={a.title}>
                            <td>{a.title}</td>
                            <td>{a.author.name}</td>
                            <td>{a.published}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Recommend;
