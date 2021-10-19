import React from 'react';
import styled from 'styled-components';
import './Hamburger.css';

const Hamburger = ({ hamburgerOpen }) => {
    // console.log('hamburgerOpen: ', hamburgerOpen);
    return (
        <div className='hamburger'>
            <Burger1 hamburgerOpen={hamburgerOpen} className='burger' />
            <Burger2 hamburgerOpen={hamburgerOpen} className='burger' />
            <Burger3 hamburgerOpen={hamburgerOpen} className='burger' />
        </div>
    );
};

const Burger1 = styled.div`
    transform: ${props => (props.hamburgerOpen ? 'rotate(45deg)' : 'rotate(0)')};
`;

const Burger2 = styled.div`
    transform: ${props => (props.hamburgerOpen ? 'translateX(100%)' : 'translateX(0)')};
    opacity: ${props => (props.hamburgerOpen ? '0' : '1')};
`;

const Burger3 = styled.div`
    transform: ${props => (props.hamburgerOpen ? 'rotate(-45deg)' : 'rotate(0)')};
`;

export default Hamburger;
