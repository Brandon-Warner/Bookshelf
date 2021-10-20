import React, { useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import './Navigation.css';
import Hamburger from '../Hamburger/Hamburger';

const Navigation = ({ token, logout, transitionHelper, pageDelayHelper }) => {
    const [hamburgerOpen, setHamburgerOpen] = useState(false);

    // console.log('hamburgerOpen: ', hamburgerOpen);

    const toggleHamburger = () => {
        setHamburgerOpen(!hamburgerOpen);
    };

    const pageTransition = newPage => {
        pageDelayHelper(newPage);
        transitionHelper();
        toggleHamburger();
    };

    return (
        <Nav>
            <ButtonsList hamburgerOpen={hamburgerOpen} className='navigation'>
                <li>
                    <button className='btn' onClick={() => pageTransition('landingPage')}>
                        home
                    </button>
                </li>
                <li>
                    <button className='btn' onClick={() => pageTransition('authors')}>
                        authors
                    </button>
                </li>
                <li>
                    <button className='btn' onClick={() => pageTransition('books')}>
                        books
                    </button>
                </li>
                {token === null ? (
                    <button className='btn' onClick={() => pageTransition('login')}>
                        login
                    </button>
                ) : (
                    <li>
                        <button className='btn' onClick={() => pageTransition('add')}>
                            add book
                        </button>
                    </li>
                )}

                {token === null ? null : (
                    <li>
                        <button className='btn' onClick={() => pageTransition('recommend')}>
                            recommend
                        </button>
                    </li>
                )}

                {token === null ? (
                    <li>
                        <button className='btn' onClick={() => pageTransition('newUser')}>
                            new user
                        </button>
                    </li>
                ) : null}

                {token === null ? null : (
                    <li>
                        <button className='btn' onClick={logout}>
                            logout
                        </button>
                    </li>
                )}
            </ButtonsList>
            <div className='hamburger' onClick={toggleHamburger}>
                <Hamburger hamburgerOpen={hamburgerOpen} />
            </div>
        </Nav>
    );
};

const slideIn = keyframes`
from {
    transform: translateX(-100%);
    opacity: 0;
}
to {
    transform: translateX(0);
    opacity: 1;
}
`;

const animationEnter = css`
    ${slideIn} 300ms cubic-bezier(0.5, 0, 0.5, 1)
`;

const Nav = styled.nav`
    background: linear-gradient(180deg, black, rgba(0, 0, 0, 0));
    opacity: 1;
    height: 60px;
    margin-bottom: 10px;
`;

const ButtonsList = styled.ul`
    display: flex;
    flex-wrap: wrap;
    float: right;
    padding: 0 25px;

    @media (max-width: 1185px) {
        display: ${props => (props.hamburgerOpen ? 'inline' : 'none')};
        background-color: black;
        text-align: center;
        color: #eee;
        height: 100vw;
        width: 50vw;
        position: fixed;
        z-index: 10;
        animation: ${props =>
            props.hamburgerOpen
                ? css`
                      ${animationEnter}
                  `
                : 'none'};
`;

export default Navigation;
