import React from 'react';
import { StatusBadge } from './StatusBadge.jsx';

export const ChatStatus = ({ message }) => {
    return (
        <div className="chat-item__status">
            <StatusBadge message={message} />
        </div>
    );
};
