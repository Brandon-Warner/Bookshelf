import React from 'react';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import './Notification.css';

const Notification = ({ message, type, showNotification }) => {
    // console.log('message: ', message);
    // console.log('type: ', type);
    // console.log('showNotification: ', showNotification);

    return (
        <CSSTransition classNames='notification' in={showNotification} timeout={4000} unmountOnExit>
            {status => {
                return (
                    <MyNotification status={status} type={type}>
                        {message}
                    </MyNotification>
                );
            }}
        </CSSTransition>
    );
};

const MyNotification = styled.div`
    position: fixed;
    float: right;
    width: 500px;
    margin-right: -500px;
    text-align: center;
    border-radius: 4px;
    padding: 10px;
    background-color: ${props => (props.type === 'success' ? '#249410' : '#c43737')};
    font-size: 24px;
    font-weight: bold;
    color: #eee;
    text-shadow: 1px 1px 1px black;
    z-index: 2000;

    @media (max-width: 1185px) {
        margin: 0;
    }
`;
export default Notification;
