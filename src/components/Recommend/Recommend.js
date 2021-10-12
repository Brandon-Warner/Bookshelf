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
        <div className='recommend-container'>
            <h2 className='recommend-title'>Book Recommendations: </h2>
            <p className='recommend-subtitle'>
                matches to your favorite genre <strong>{user.favoriteGenre}</strong>
            </p>
            <table className='recommend-table'>
                <thead className='recommend-table__headers'>
                    <tr>
                        <th scope='col'>title</th>
                        <th scope='col'>author</th>
                        <th scope='col'>published</th>
                    </tr>
                </thead>
                <tbody className='recommend-table__body'>
                    {booksResult.data.allBooks.map(a => (
                        <tr key={a.title}>
                            <th scope='row'>{a.title}</th>
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
