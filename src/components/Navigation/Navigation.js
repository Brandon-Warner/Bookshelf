import React, { useState } from 'react';
import styled from 'styled-components';
import './Navigation.css';
import Hamburger from '../Hamburger/Hamburger';

const Navigation = ({ token, setPage, logout }) => {
    const [hamburgerOpen, setHamburgerOpen] = useState(false);

    console.log('hamburgerOpen: ', hamburgerOpen);

    const toggleHamburger = () => {
        setHamburgerOpen(!hamburgerOpen);
    };

    return (
        <Nav>
            <ButtonsList hamburgerOpen={hamburgerOpen} className='navigation'>
                <li>
                    <button className='btn' onClick={() => setPage('landingPage')}>
                        home
                    </button>
                </li>
                <li>
                    <button className='btn' onClick={() => setPage('authors')}>
                        authors
                    </button>
                </li>
                <li>
                    <button className='btn' onClick={() => setPage('books')}>
                        books
                    </button>
                </li>
                {token === null ? (
                    <button className='btn' onClick={() => setPage('login')}>
                        login
                    </button>
                ) : (
                    <li>
                        <button className='btn' onClick={() => setPage('add')}>
                            add book
                        </button>
                    </li>
                )}

                {token === null ? null : (
                    <li>
                        <button className='btn' onClick={() => setPage('recommend')}>
                            recommend
                        </button>
                    </li>
                )}

                {token === null ? (
                    <li>
                        <button className='btn' onClick={() => setPage('newUser')}>
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
    transform: translateX(0);

    @media (max-width: 1185px) {
        display: ${props => (props.hamburgerOpen ? 'inline' : 'none')};
        background-color: black;
        text-align: center;
        color: #eee;
        height: 100vw;
        width: 50vw;
        position: fixed;
        z-index: 10;
    }
`;

export default Navigation;
