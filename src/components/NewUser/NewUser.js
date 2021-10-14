import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../../queries';
import './NewUser.css';

const NewUser = ({ show, setNotification, notificationTimer }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [favoriteGenre, setFavoriteGenre] = useState('');
    const [createUser] = useMutation(CREATE_USER);

    if (!show) {
        return null;
    }

    const containsNumber = array => {
        for (let i = 0; i < array.length; i++) {
            // console.log('array[i]: ', array[i]);
            if (
                array[i] === '0' ||
                array[i] === '1' ||
                array[i] === '2' ||
                array[i] === '3' ||
                array[i] === '4' ||
                array[i] === '5' ||
                array[i] === '6' ||
                array[i] === '7' ||
                array[i] === '8' ||
                array[i] === '9'
            ) {
                return true;
            }
        }
        return false;
    };

    const validatePassword = password => {
        const passwordArray = password.split('');
        console.log('passwordArray: ', passwordArray);
        if (passwordArray.length < 8) {
            setNotification('password needs to be 8 characters or more', 'error', 5);
            notificationTimer();
            return false;
        } else if (!containsNumber(passwordArray)) {
            setNotification('password must contain at least one number', 'error', 5);
            notificationTimer();
            return false;
        }
        return true;
    };

    const submit = e => {
        e.preventDefault();
        if (!validatePassword(password)) {
        } else {
            createUser({ variables: { username, password, favoriteGenre } });

            setNotification(`${username}'s account has been created`, 'success', 5);
            notificationTimer();
        }
        setUsername('');
        setPassword('');
        setFavoriteGenre('');
    };
    return (
        <div className='new-container'>
            <h2 className='new-title'>New User</h2>
            <p className='new-subtitle'>please enter a valid username and password</p>
            <p className='new-subtitle'>
                include your favorite genre so we can provide you recommendations!
            </p>
            <p className='new-instructions'>
                <strong>password must be 8 characters and contain at least 1 number</strong>
            </p>
            <form className='new-form' onSubmit={submit}>
                username
                <input
                    className='new-form__input'
                    value={username}
                    onChange={({ target }) => setUsername(target.value)}
                />
                <br />
                password
                <input
                    className='new-form__input'
                    type='password'
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                />
                <br />
                favorite genre
                <input
                    className='new-form__input'
                    value={favoriteGenre}
                    onChange={({ target }) => setFavoriteGenre(target.value.toLowerCase())}
                />
                <br />
                <button className='new-form__button' type='submit'>
                    create new user
                </button>
            </form>
        </div>
    );
};

export default NewUser;
