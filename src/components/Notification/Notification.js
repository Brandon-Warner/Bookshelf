import React from 'react';
// import { ToastNotification } from 'carbon-components-react';
import { CSSTransition } from 'react-transition-group';
import './Notification.css';

const successStyle = {
    // display: 'flex',
    alignItem: 'right',
    width: '500px',
    marginRight: '-500px',
    // padding: '0',
    textAlign: 'center',
    borderRadius: '4px',
    backgroundColor: '#249410',
    color: '#eee',
    zIndex: '1000'
};

const errorStyle = {
    display: 'flex',
    margin: '0 auto',
    maxWidth: '500px',
    padding: '0',
    textAlign: 'center',
    borderRadius: '4px',
    backgroundColor: '#c43737',
    color: 'white'
};

const Notification = ({ message, type }) => {
    const startTransition = message ? true : false;
    console.log('startTransition: ', startTransition);
    return (
        <CSSTransition classNames='notification' in={startTransition} timeout={5000}>
            <div style={successStyle}>
                <h3 className={'popup'}>{message}</h3>
            </div>
        </CSSTransition>
    );
    // } else if (type === 'error') {
    //     return (
    //         <div style={errorStyle}>
    //             <h3 className='popup'>{message}</h3>
    //         </div>
    //     );
    // }
    // return null;
};
export default Notification;
