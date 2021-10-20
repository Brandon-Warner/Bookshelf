import React from 'react';
import './PageTransition.css';

const PageTransition = ({ transitionActive }) => {
    console.log('transition active props page transition: ', transitionActive);
    return (
        <div>
            <div className={transitionActive ? 'left-layer active' : 'left-layer '}></div>
            <div
                className={
                    transitionActive
                        ? 'left-layer active left-layer--2'
                        : 'left-layer  left-layer--2'
                }
            ></div>
            <div
                className={
                    transitionActive
                        ? 'left-layer active left-layer--3'
                        : 'left-layer  left-layer--3'
                }
            ></div>
            <div
                className={
                    transitionActive
                        ? 'left-layer active left-layer--4'
                        : 'left-layer  left-layer--4'
                }
            ></div>
            <div
                className={
                    transitionActive
                        ? 'left-layer active left-layer--5'
                        : 'left-layer  left-layer--5'
                }
            ></div>
        </div>
    );
};

export default PageTransition;
