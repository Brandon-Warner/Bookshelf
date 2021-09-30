import React, { useState } from 'react';
import { useApolloClient, useQuery, useSubscription } from '@apollo/client';
import { ALL_AUTHORS, ALL_BOOKS, ME, BOOK_ADDED } from './queries';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import LoginForm from './components/LoginForm';
import Recommend from './components/Recommend';

const App = () => {
    const client = useApolloClient();
    const [token, setToken] = useState(null);
    const [page, setPage] = useState('authors');
    const result = useQuery(ALL_AUTHORS);
    const userResult = useQuery(ME);
    // console.log('userResult: ', userResult);
    // console.log('result: ', result);

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
            console.log('subscription data: ', subscriptionData);
            const addedBook = subscriptionData.data.bookAdded;
            console.log('added book: ', addedBook);
            window.alert(`New book added: ${addedBook.title}`);
            updateCacheWith(addedBook);
        }
    });

    if (result.loading) {
        return <div>loading...</div>;
    }

    const user = userResult.data.me;

    const logout = () => {
        setToken(null);
        localStorage.clear();
        client.resetStore();
    };

    return (
        <div>
            <div>
                <button onClick={() => setPage('authors')}>authors</button>
                <button onClick={() => setPage('books')}>books</button>
                {token === null ? (
                    <button onClick={() => setPage('login')}>login</button>
                ) : (
                    <button onClick={() => setPage('add')}>add book</button>
                )}

                {token === null ? null : (
                    <button onClick={() => setPage('recommend')}>recommend</button>
                )}
                {token === null ? null : <button onClick={logout}>logout</button>}
            </div>

            <LoginForm setToken={setToken} show={page === 'login'} />

            <Authors authors={result.data.allAuthors} show={page === 'authors'} />

            <Recommend user={user} show={page === 'recommend'} />

            <Books show={page === 'books'} />

            <NewBook updateCacheWith={updateCacheWith} show={page === 'add'} />
        </div>
    );
};

export default App;
