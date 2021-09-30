import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../queries';

const LoginForm = ({ setToken, show }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [login, result] = useMutation(LOGIN);

    useEffect(() => {
        if (result.data) {
            const token = result.data.login.value;
            setToken(token);
            localStorage.setItem('library-user-token', token);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [result.data]);

    if (!show) {
        return null;
    }

    const submit = async e => {
        e.preventDefault();
        login({ variables: { username, password } });

        setUsername('');
        setPassword('');
    };

    return (
        <div>
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
                <button type='submit'>login</button>
            </form>
        </div>
    );
};

export default LoginForm;
