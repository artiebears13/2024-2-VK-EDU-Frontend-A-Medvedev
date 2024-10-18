import React from 'react';
import { StatusBadge } from './StatusBadge';

export const ChatStatus = ({ message }) => {
    return (
        <div className="chat-item__status">
            <StatusBadge message={message} />
        </div>
    );
};
