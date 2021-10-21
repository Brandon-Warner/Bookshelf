import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { Transition } from 'react-transition-group';
import './Notification.css';

const Notification = ({ message, visible, ...otherProps }) => {
    // console.log('message: ', message);
    // console.log('type: ', type);
    // console.log('showNotification: ', showNotification);

    return (
        <Transition classNames='notification' timeout={4000} in={visible} unmountOnExit>
            {status => {
                return (
                    <MyNotification className='notification' status={status} {...otherProps}>
                        {message}
                    </MyNotification>
                );
            }}
        </Transition>
    );
};

const fadeIn = () => keyframes`
0% {
    opacity: 0;
}
100% {
    opacity: 1;
}
`;

const fadeOut = () => keyframes`
0% {
    opacity: 1;
}
100% {
    opacity: 0;
}
`;

const MyNotification = styled.div`
    background-color: ${props => (props.type === 'success' ? '#249410' : '#c43737')};
    top: ${props => `${props.visibleNotifications * 4 + 1}rem`};

    ${props =>
        props.status === 'entered' &&
        css`
            animation: 1s linear forwards ${fadeIn};
        `}

    ${props =>
        props.status === 'exiting' &&
        css`
            animation: 1s linear forwards ${fadeOut};
        `}
`;
export default Notification;
