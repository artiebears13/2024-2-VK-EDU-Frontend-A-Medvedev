import React from 'react';

export const ChatInfo = ({ person, message }) => {
    const lastMessageText = message ? message.text : '';

    const maxLength = 20;
    const displayText = lastMessageText.length > maxLength
        ? `${lastMessageText.slice(0, maxLength)}...`
        : lastMessageText;

    return (
        <div className="chat-item__info">
            <div className="chat-item__name">{person.name}</div>
            <div className="chat-item__last-message">{displayText}</div>
        </div>
    );
};
