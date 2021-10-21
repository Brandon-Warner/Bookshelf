import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../../queries';
import './LoginForm.css';

const LoginForm = ({ show, setToken, addNotification }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [login, result] = useMutation(LOGIN, {
        onError: () => addNotification(`Username/password is not valid`, 'error'),
        onCompleted: () => addNotification(`Logged in successfully!`, 'success')
    });

    useEffect(() => {
        if (result.data) {
            const token = result.data.login.value;
            setToken(token);
            localStorage.setItem('library-user-token', token);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [result.data]);

    const validateInput = input => {
        if (input === '') {
            return false;
        }
        return true;
    };

    const submit = async e => {
        e.preventDefault();
        if (!validateInput(username) || !validateInput(password)) {
            addNotification('Username/password is not valid', 'error');
        } else {
            login({ variables: { username, password } });
        }

        setUsername('');
        setPassword('');
    };

    if (!show) {
        return null;
    }

    return (
        <div className='login'>
            <h2 className='login-title'>Login</h2>
            <form onSubmit={submit} className='login-form'>
                username
                <input
                    className='login-form__username'
                    value={username}
                    onChange={({ target }) => setUsername(target.value)}
                />
                <br />
                password
                <input
                    className='login-form__password'
                    type='password'
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                />
                <br />
                <button className='login-form__button' type='submit'>
                    login
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
