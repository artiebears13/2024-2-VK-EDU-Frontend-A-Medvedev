import React from 'react';

export const ChatPhoto = ({ person }) => {
    return (
        <div className="chat-item__photo">
            <img src={person.photo} alt={person.name} />
        </div>
    );
};
