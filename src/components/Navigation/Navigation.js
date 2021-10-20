import React, { useState } from 'react';
import styled from 'styled-components';
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
                        <button
                            className='btn'
                            onClick={() => {
                                logout();
                                pageTransition('landingPage');
                            }}
                        >
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

const Nav = styled.nav`
    background: linear-gradient(180deg, black, rgba(0, 0, 0, 0));
    margin: 0;
    opacity: 1;
    height: 60px;
    margin-bottom: 10px;

    @media (max-width: 1185px) {
        position: fixed;
        width: 100vw;
    }
`;

const ButtonsList = styled.ul`
    display: flex;
    flex-wrap: wrap;
    float: right;
    padding: 0 25px;

    @media (max-width: 1185px) {
        display: block;
        background-color: black;
        text-align: center;
        color: #eee;
        margin: 0;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        position: fixed;
        z-index: 100;

        transform: ${props => (props.hamburgerOpen ? 'translateX(0)' : 'translateX(-100%)')};
        transition: transform 300ms cubic-bezier(0.5, 0, 0.5, 1);
`;

export default Navigation;
