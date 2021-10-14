import React, { useState, useEffect } from 'react';
import { useApolloClient, useSubscription, useLazyQuery } from '@apollo/client';
import { ALL_BOOKS, BOOK_ADDED, ME } from './queries';
import Authors from './components/Authors/Authors';
import Books from './components/Books/Books';
import NewBook from './components/NewBook/NewBook';
import Recommend from './components/Recommend/Recommend';
import NewUser from './components/NewUser/NewUser';
import Notification from './components/Notification/Notification';
import LandingPage from './components/LandingPage/LandingPage';
import Navigation from './components/Navigation/Navigation';

const App = () => {
    const client = useApolloClient();

    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [page, setPage] = useState('landingPage');
    const [message, setMessage] = useState(null);
    const [messageType, setMessageType] = useState(null);
    const [showNotification, setShowNotification] = useState(false);

    const [getUser, userResults] = useLazyQuery(ME);

    // if a token exists, this will fetch the user information
    useEffect(() => {
        if (token) {
            getUser();
        }
        userResults.data ? setUser(userResults.data.me) : setUser(null);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, userResults.data]);

    console.log('user: ', user);

    const updateCacheWith = addedBook => {
        const includedIn = (set, object) => set.map(p => p.id).includes(object.id);

        const dataInStore = client.readQuery({ query: ALL_BOOKS });
        console.log('data in store: ', dataInStore);

        if (!includedIn(dataInStore.allBooks, addedBook)) {
            client.writeQuery({
                query: ALL_BOOKS,
                data: { allBooks: dataInStore.allBooks.concat(addedBook) }
            });
        }
    };

    // updates cache with websocket connection listening for added books
    useSubscription(BOOK_ADDED, {
        onSubscriptionData: ({ subscriptionData }) => {
            // console.log('subscription data: ', subscriptionData);
            const addedBook = subscriptionData.data.bookAdded;
            setNotification(`New book added: ${addedBook.title}`, 'success', 5);
            notificationTimer();
            updateCacheWith(addedBook);
        }
    });

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.clear();
        client.resetStore();
        setPage('landingPage');
    };

    // helper function for setting notifications
    const setNotification = (text, type, duration) => {
        setMessage(text);
        setMessageType(type);
        setTimeout(() => {
            setMessage(null);
            setMessageType(null);
        }, duration * 1000);
        
    };
    // timer function is 1sec shorter than setNotification to keep text showing while notification exits
    const notificationTimer = () => {
        setShowNotification(true);
        setTimeout(() => {
            setShowNotification(false);
        }, 5000);
    };

    return (
        <div className='page'>
            <Navigation
                token={token}
                setToken={setToken}
                setPage={setPage}
                setNotification={setNotification}
                notificationTimer={notificationTimer}
                logout={logout}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Notification
                    type={messageType}
                    message={message}
                    showNotification={showNotification}
                />
            </div>
            <LandingPage show={page === 'landingPage'} />

            <NewUser
                setNotification={setNotification}
                notificationTimer={notificationTimer}
                show={page === 'newUser'}
            />

            <Authors
                setNotification={setNotification}
                notificationTimer={notificationTimer}
                show={page === 'authors'}
            />

            <Recommend user={user} setPage={setPage} show={page === 'recommend'} />

            <Books show={page === 'books'} />

            <NewBook
                setNotification={setNotification}
                notificationTimer={notificationTimer}
                updateCacheWith={updateCacheWith}
                show={page === 'add'}
            />
        </div>
    );
};

export default App;
