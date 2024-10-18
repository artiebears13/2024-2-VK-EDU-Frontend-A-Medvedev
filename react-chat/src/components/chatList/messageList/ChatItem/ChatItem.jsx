import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChatContext } from '../../../../context/ChatContext';
import { ChatPhoto } from './ChatPhoto';
import { ChatInfo } from './ChatInfo';
import { ChatStatus } from './ChatStatus';
import { ChatTime } from './ChatTime';
import './chatItem.scss';

export const ChatItem = ({ person, message, isSearched }) => {
    const navigate = useNavigate();
    const { markAllReceivedAsRead, chatId, setChatId } = useContext(ChatContext);

    const handleClick = () => {
        markAllReceivedAsRead(person.id);
        localStorage.setItem('currentChatId', person.id);
        if (message && isSearched) {
            localStorage.setItem('found_message', message.id || '');
        }
        navigate(`/chat/${person.id}`);
    };

    return (
        <div className="chat-item" onClick={handleClick}>
            <ChatPhoto person={person} />
            <ChatInfo person={person} message={message} />
            <ChatStatus message={message} />
            <ChatTime message={message} />
        </div>
    );
};
