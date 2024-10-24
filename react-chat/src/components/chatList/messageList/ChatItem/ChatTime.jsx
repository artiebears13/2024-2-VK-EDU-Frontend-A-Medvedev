import React from 'react';

export const ChatTime = ({ message }) => {
    const lastMessageTime = message
        ? new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        : '';

    return (
        <div className="chat-item__time">
            {lastMessageTime}
        </div>
    );
};
