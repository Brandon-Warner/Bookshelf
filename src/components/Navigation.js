import React from 'react';
import './Navigation.css';
import LoginForm from './LoginForm';

const Navigation = ({ token, setToken, setPage, setNotification, logout }) => {
    return (
        <div className='navigation'>
            <div className='buttons'>
                <button className='btn' onClick={() => setPage('landingPage')}>
                    home
                </button>
                {token === null ? (
                    <LoginForm setToken={setToken} setNotification={setNotification} />
                ) : (
                    <button className='btn' onClick={() => setPage('add')}>
                        add book
                    </button>
                )}

                {token === null ? null : (
                    <button className='btn' onClick={() => setPage('recommend')}>
                        recommend
                    </button>
                )}

                {token === null ? (
                    <button className='btn' onClick={() => setPage('newUser')}>
                        new user
                    </button>
                ) : null}

                <button className='btn' onClick={() => setPage('authors')}>
                    authors
                </button>
                <button className='btn' onClick={() => setPage('books')}>
                    books
                </button>

                {token === null ? null : (
                    <button className='btn' onClick={logout}>
                        logout
                    </button>
                )}
            </div>
        </div>
    );
};

export default Navigation;
