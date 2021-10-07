import React, { useEffect } from 'react';
import { useQuery, useLazyQuery } from '@apollo/client';
import { FAV_GENRE_BOOK, ME } from '../queries';
import './Recommend.css';

const Recommend = ({ show, token, setPage }) => {
    // console.log('token', token);
    const [getUser, userResults] = useLazyQuery(ME);
    // console.log('userResults: ', userResults);
    const booksResult = useQuery(FAV_GENRE_BOOK, {
        variables: {
            genre:
                userResults.data === undefined || userResults.data.me === null
                    ? 'thriller'
                    : userResults.data.me.favoriteGenre
        }
    });

    useEffect(() => {
        if (token !== null) {
            getUser();
        } else if (!token) {
            setPage('authors');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    if (!show) {
        return null;
    }

    return (
        <div>
            <h2>Book Recommendations: </h2>
            <p>
                matches to your favorite genre <strong>{userResults.data.me.favoriteGenre}</strong>
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
