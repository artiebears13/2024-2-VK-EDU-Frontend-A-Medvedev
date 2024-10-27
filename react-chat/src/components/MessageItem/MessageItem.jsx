import React, {forwardRef, memo} from 'react';
import './MessageItem.scss';
import CheckIcon from '@mui/icons-material/Check';
import DoneAllIcon from '@mui/icons-material/DoneAll';

export const MessageItem = memo(forwardRef(({message, isFound = false}, ref) => {
    console.log('image', message.image)
    return (
        <li className={`message-item ${message.direction} scale-in-center`} ref={ref}>
            {(message.image) &&
                <div className="message-item__image">
                    <img src={message.image} alt={"image"}/>
                </div>
            }
            <p className={`message-item__text ${isFound ? 'found' : ''}`}>{message.text}</p>
            <div className="message-item__status">
                <p className="message-item__status-item">
                {message.direction === 'sent' && (
                    message.readStatus === 'unread' ?
                        <CheckIcon fontSize="small"/> :
                        <DoneAllIcon fontSize="small"/>
                )}
                </p>
                <p className="time">
                {new Date(message.timestamp).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}
                </p>
            </div>
        </li>
    );
}));
