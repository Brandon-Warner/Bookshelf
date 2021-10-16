import React from 'react';
import './Hamburger.css';

const Hamburger = ({ hamburgerOpen }) => {
    console.log('hamburgerOpen: ', hamburgerOpen);
    return (
        <div className='hamburger'>
            <div className='burger burger1' />
            <div className='burger burger2' />
            <div className='burger burger3' />
        </div>
    );
};

export default Hamburger;
