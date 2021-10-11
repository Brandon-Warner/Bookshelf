import React from 'react';

import './LandingPage.css';

const LandingPage = ({ show }) => {
    if (!show) {
        return null;
    }
    return (
        <div className='home'>
            <div className='home-header'>
                <h1>
                    <i>Welcome to Bookshelf!</i>
                </h1>
            </div>
        </div>
    );
};

export default LandingPage;
