import React, { useState } from 'react';
import { useApolloClient, useSubscription } from '@apollo/client';
import { ALL_BOOKS, BOOK_ADDED } from './queries';
import Authors from './components/Authors/Authors';
import Books from './components/Books/Books';
import NewBook from './components/NewBook';
import Recommend from './components/Recommend/Recommend';
import NewUser from './components/NewUser';
import Notification from './components/Notification/Notification';
import LandingPage from './components/LandingPage/LandingPage';
import Navigation from './components/Navigation/Navigation';

const App = () => {
    const client = useApolloClient();

    const [token, setToken] = useState(null);
    const [page, setPage] = useState('landingPage');
    const [message, setMessage] = useState(null);

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

    useSubscription(BOOK_ADDED, {
        onSubscriptionData: ({ subscriptionData }) => {
            // console.log('subscription data: ', subscriptionData);
            const addedBook = subscriptionData.data.bookAdded;
            setNotification(`New book added: ${addedBook.title}`, 5);
            updateCacheWith(addedBook);
        }
    });

    const logout = () => {
        setToken(null);
        localStorage.clear();
        client.resetStore();
    };

    // helper function for setting notifications
    const setNotification = (text, duration) => {
        setMessage(text);
        setTimeout(() => {
            setMessage(null);
        }, duration * 1000);
    };

    return (
        <div className='page'>
            <Navigation
                token={token}
                setToken={setToken}
                setPage={setPage}
                setNotification={setNotification}
                logout={logout}
            />

            <Notification message={message} />

            <LandingPage show={page === 'landingPage'} />

            <NewUser setNotification={setNotification} show={page === 'newUser'} />

            <Authors setNotification={setNotification} show={page === 'authors'} />

            <Recommend token={token} setPage={setPage} show={page === 'recommend'} />

            <Books show={page === 'books'} />

            <NewBook updateCacheWith={updateCacheWith} show={page === 'add'} />
        </div>
    );
};

export default App;
