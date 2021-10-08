import React from 'react';
import background from '../images/alfons-morales-YLSwjSy7stw-unsplash.jpg';

const LandingPage = ({ show }) => {
    if (!show) {
        return null;
    }
    return (
        <div
            className='home'
            style={{
                backgroundImage: `url(${background})`,
                backgroundSize: 'contain',
                height: '100vh',
                padding: '0',
                margin: '0'
            }}
        >
            <h1>Welcome to Bookshelf!</h1>
        </div>
    );
};

export default LandingPage;
