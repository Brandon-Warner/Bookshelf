import React from 'react';
import background from '../../images/alfons-morales-YLSwjSy7stw-unsplash.jpg';

const LandingPage = ({ show }) => {
    if (!show) {
        return null;
    }
    return (
        <div
            className='home'
            style={{
                backgroundImage: `url(${background})`,
                backgroundSize: 'cover',
                height: '100vh',
                width: '100vw',
                padding: '0',
                margin: '0',
                position: 'absolute',
                textAlign: 'center'
            }}
        >
            <div className='home-header'>
                <h1>Welcome to Bookshelf!</h1>
            </div>
        </div>
    );
};

export default LandingPage;
