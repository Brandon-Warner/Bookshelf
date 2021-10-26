import React, { useState, useEffect } from 'react';
import { useApolloClient, useSubscription, useLazyQuery } from '@apollo/client';
import { ALL_BOOKS, BOOK_ADDED, ME } from './queries';
import LoginForm from './components/LoginForm/LoginForm';
import Authors from './components/Authors/Authors';
import Books from './components/Books/Books';
import NewBook from './components/NewBook/NewBook';
import Recommend from './components/Recommend/Recommend';
import NewUser from './components/NewUser/NewUser';
import Notification from './components/Notification/Notification';
import LandingPage from './components/LandingPage/LandingPage';
import Navigation from './components/Navigation/Navigation';
import PageTransition from './components/PageTransition/PageTransition';

const App = () => {
    const client = useApolloClient();

    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [page, setPage] = useState('landingPage');

    const [notifications, setNotifications] = useState([]);
    const [visibleNotifications, setVisibleNotifications] = useState([]);
    // console.log('notifications: ', notifications);
    // console.log('visibleNotifications: ', visibleNotifications);

    const [transitionActive, setTransitionActive] = useState(false);

    const [getUser, userResults] = useLazyQuery(ME);

    // if a token exists, this will fetch the user information
    useEffect(() => {
        if (token) {
            getUser();
        }
        userResults.data ? setUser(userResults.data.me) : setUser(null);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, userResults.data]);

    useEffect(() => {
        // amount of visible notifications
        const visibleNotifications = notifications.filter(
            notification => notification.visible === true
        ).length;
        setVisibleNotifications(visibleNotifications);
    }, [notifications]);

    // helper function for setting notifications
    const addNotification = (message, type) => {
        const newNotification = {
            id: notifications.length,
            message,
            type,
            visible: true,
            visibleNotifications
        };

        // set visibilty to 0 after x secconds
        setTimeout(() => {
            setNotifications(prevState => {
                // copy previous state
                let newState = [...prevState];
                // update the notification
                const target = { ...prevState[notifications.length], visible: false };
                console.log('target: ', target);
                // add updated notification back in copied state
                newState[notifications.length] = target;
                // update state with new state
                return newState;
            });
        }, 4000);

        // add new notification to the state
        setNotifications(prevState => [...prevState, newNotification]);
    };

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
            addNotification(`New book added: ${addedBook.title}`, 'success');
            updateCacheWith(addedBook);
        }
    });

    // toggle transition when changing page
    const transitionHelper = () => {
        setTransitionActive(!transitionActive);
    };

    // delays the page state switch to match up with the transition style
    const pageDelayHelper = newPage => {
        setPage(page);
        setTimeout(() => {
            setPage(newPage);
        }, 1000);
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.clear();
        client.resetStore();
        transitionHelper();
        pageDelayHelper('landingPage');
    };

    return (
        <div className='page'>
            <PageTransition transitionActive={transitionActive} />

            <Navigation
                token={token}
                setToken={setToken}
                pageDelayHelper={pageDelayHelper}
                addNotification={addNotification}
                transitionHelper={transitionHelper}
                logout={logout}
            />
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    top: '70px'
                }}
            >
                {notifications.length > 0 &&
                    notifications.map(({ ...props }, i) => <Notification key={i} {...props} />)}
            </div>
            <LandingPage show={page === 'landingPage'} />

            <LoginForm
                show={page === 'login'}
                setToken={setToken}
                addNotification={addNotification}
            />

            <NewUser addNotification={addNotification} show={page === 'newUser'} />

            <Authors addNotification={addNotification} show={page === 'authors'} />

            <Recommend user={user} setPage={setPage} show={page === 'recommend'} />

            <Books show={page === 'books'} />

            <NewBook
                addNotification={addNotification}
                updateCacheWith={updateCacheWith}
                show={page === 'add'}
            />
        </div>
    );
};

export default App;
