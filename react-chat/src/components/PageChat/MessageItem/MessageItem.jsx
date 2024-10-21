import React, {forwardRef} from 'react';
import './MessageItem.scss';
import CheckIcon from '@mui/icons-material/Check';
import DoneAllIcon from '@mui/icons-material/DoneAll';

export const MessageItem = forwardRef(({ message, isFound= false }, ref) => {
    return (
        <li className={`message-item ${message.direction} scale-in-center`} ref={ref}>
            <span className={`message-item__text ${isFound ? 'found' : ''}`}>{message.text}</span>
            {message.direction === 'sent' && (
                message.readStatus === 'unread' ? <CheckIcon className="message-item__status" fontSize={"16px"}/> :
                    <DoneAllIcon className="message-item__status" fontSize={"16px"}/>
            )}
            <span className="time">
                {new Date(message.timestamp).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}
            </span>
        </li>
    );
});