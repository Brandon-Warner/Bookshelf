import React from 'react';
import './Navigation.css';
import LoginForm from '../LoginForm/LoginForm';

const Navigation = ({ token, setToken, setPage, setNotification, logout, notificationTimer }) => {
    return (
        <div className='navigation'>
            <div className='buttons'>
                <ul>
                    <li>
                        <button className='btn' onClick={() => setPage('landingPage')}>
                            home
                        </button>
                    </li>
                    <li>
                        <button className='btn' onClick={() => setPage('authors')}>
                            authors
                        </button>
                    </li>
                    <li>
                        <button className='btn' onClick={() => setPage('books')}>
                            books
                        </button>
                    </li>
                    {token === null ? (
                        <li>
                            <LoginForm
                                setToken={setToken}
                                setNotification={setNotification}
                                notificationTimer={notificationTimer}
                            />
                        </li>
                    ) : (
                        <li>
                            <button className='btn' onClick={() => setPage('add')}>
                                add book
                            </button>
                        </li>
                    )}

                    {token === null ? null : (
                        <li>
                            <button className='btn' onClick={() => setPage('recommend')}>
                                recommend
                            </button>
                        </li>
                    )}

                    {token === null ? (
                        <li>
                            <button className='btn' onClick={() => setPage('newUser')}>
                                new user
                            </button>
                        </li>
                    ) : null}

                    {token === null ? null : (
                        <li>
                            <button className='btn' onClick={logout}>
                                logout
                            </button>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Navigation;
