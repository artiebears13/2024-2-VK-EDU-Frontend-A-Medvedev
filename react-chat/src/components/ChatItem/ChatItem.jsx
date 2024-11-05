import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChatContext } from '../../context/ChatContext.jsx';
import { ChatPhoto } from './ChatPhoto.jsx';
import { ChatInfo } from './ChatInfo.jsx';
import { ChatStatus } from './ChatStatus.jsx';
import { ChatTime } from './ChatTime.jsx';
import styles from './ChatItem.module.scss';

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
        <div className={styles.chatItem} onClick={handleClick}>
            <ChatPhoto person={person} />
            <ChatInfo person={person} message={message} />
            <ChatStatus message={message} />
            <ChatTime message={message} />
        </div>
    );
};
