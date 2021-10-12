import React from 'react';
import './Notification.css';

const successStyle = {
    display: 'flex',
    margin: '0 auto',
    maxWidth: '500px',
    padding: '0',
    textAlign: 'center',
    borderRadius: '4px',
    backgroundColor: '#249410',
    color: '#eee'
};

const errorStyle = {
    display: 'flex',
    margin: '0 auto',
    maxWidth: '500px',
    padding: '0',
    textAlign: 'center',
    borderRadius: '4px',
    backgroundColor: '#c43737',
    color: 'white'
};

const Notification = ({ message, type }) => {
    if (type === 'success') {
        return (
            <div style={successStyle}>
                <h3 className='popup'>{message}</h3>
            </div>
        );
    } else if (type === 'error') {
        return (
            <div style={errorStyle}>
                <h3 className='popup'>{message}</h3>
            </div>
        );
    }
    return null;
};
export default Notification;
