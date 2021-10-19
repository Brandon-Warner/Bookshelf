import React from 'react';
import './PageTransition.css';

const PageTransition = ({ transitionActive }) => {
    console.log('transition active props page transition: ', transitionActive);
    return (
        <div>
            <div className={transitionActive ? 'top-layer active' : 'top-layer inactive'}></div>
            <div
                className={
                    transitionActive
                        ? 'top-layer active top-layer--2'
                        : 'top-layer inactive top-layer--2'
                }
            ></div>
            <div
                className={
                    transitionActive
                        ? 'top-layer active top-layer--3'
                        : 'top-layer inactive top-layer--3'
                }
            ></div>
            <div
                className={
                    transitionActive
                        ? 'top-layer active top-layer--4'
                        : 'top-layer inactive top-layer--4'
                }
            ></div>
        </div>
    );
};

export default PageTransition;
