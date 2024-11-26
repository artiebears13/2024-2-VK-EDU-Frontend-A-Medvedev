import React from 'react';
import styles from './ChatItem.module.scss'

export const ChatTime = ({time}) => {
    const lastMessageTime = time
        ? new Date(time).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
        : '';


    return (
        <div className={styles.chatItemTime}>
            {lastMessageTime}
        </div>
    );
};
