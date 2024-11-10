import React from 'react';
import styles from './ChatItem.module.scss'

export const ChatTime = ({message}) => {
    const lastMessageTime = message
        ? new Date(message.timestamp).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
        : '';

    return (
        <div className={styles.chatItemTime}>
            {lastMessageTime}
        </div>
    );
};
