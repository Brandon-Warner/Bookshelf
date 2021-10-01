import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../queries';

const NewUser = ({ show, setMessage }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [favoriteGenre, setFavoriteGenre] = useState('');
    const [createUser] = useMutation(CREATE_USER);

    if (!show) {
        return null;
    }

    // const validatePassword = password => {
    //     const passwordArray = password.split(' ');
    //     console.log('passwordArray: ', passwordArray);
    //     if (passwordArray.length < 8) {
    //         setMessage('password needs to be 8 characters or more');
    //         return false;
    //     } else if (passwordArray.some(typeof Number)) {
    //         alert('password must contain at least one number');
    //         return false;
    //     }
    //     return true;
    // };

    const submit = e => {
        e.preventDefault();

        // if (!validatePassword(password)) {
        // }

        console.log(username, password, favoriteGenre);

        createUser({ variables: { username, password, favoriteGenre } });

        setMessage(`${username}'s account has been created`);
        setTimeout(() => {
            setMessage(null);
        }, 5000);

        setUsername('');
        setPassword('');
        setFavoriteGenre('');
    };
    return (
        <div>
            <h2>New User</h2>
            <h3>please enter a valid username and password</h3>
            <h3>include your favorite genre so we can provide you recommendations!</h3>
            <form onSubmit={submit}>
                username
                <input value={username} onChange={({ target }) => setUsername(target.value)} />
                <br />
                password
                <input
                    type='password'
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                />
                <br />
                favorite genre
                <input
                    value={favoriteGenre}
                    onChange={({ target }) => setFavoriteGenre(target.value)}
                />
                <br />
                <button type='submit'>create new user</button>
            </form>
        </div>
    );
};

export default NewUser;
