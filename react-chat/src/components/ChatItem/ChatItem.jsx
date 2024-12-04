import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ChatPhoto } from './ChatPhoto.jsx';
import { ChatInfo } from './ChatInfo.jsx';
import { ChatStatus } from './ChatStatus.jsx';
import { ChatTime } from './ChatTime.jsx';
import styles from './ChatItem.module.scss';

export const ChatItem = ({ chat, message, isSearched }) => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.user); // Получаем пользователя из Redux
    console.log({chat, message, isSearched});
    if (!message) return null;
    const handleClick = () => {
        localStorage.setItem('currentChatId', chat.id);
        if (message && isSearched) {
            localStorage.setItem('found_message', chat.id || '');
        }
        navigate(`/chat/${chat.id}`);
    };

    // Находим другого участника чата
    const person = chat.members.find(member => member.id !== user?.id);
    const title = chat.title;

    return (
        <div className={styles.chatItem} onClick={handleClick}>
            <ChatPhoto person={person} />
            <ChatInfo title={title} message={message} />
            {message && user && (
                <ChatStatus
                    message={message}
                    received={message.sender.id !== user.id}
                />
            )}
            <ChatTime time={chat.updated_at} />
        </div>
    );
};
