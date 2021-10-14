import React from 'react';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import './Notification.css';

const Notification = ({ message, type, showNotification }) => {
    console.log('message: ', message);
    console.log('type: ', type);
    console.log('showNotification: ', showNotification);

    return (
        <CSSTransition classNames='notification' in={showNotification} timeout={5000} unmountOnExit>
            <MyNotification type={type}>
                <h3>{message}</h3>
            </MyNotification>
        </CSSTransition>
    );
};

const MyNotification = styled.div`
    position: fixed;
    align-item: right;
    width: 500px;
    margin-right: 0px;
    text-align: center;
    border-radius: 4px;
    background-color: ${props => (props.type === 'success' ? '#249410' : '#c43737')};
    color: #eee;
    z-index: 1000;
`;
export default Notification;
