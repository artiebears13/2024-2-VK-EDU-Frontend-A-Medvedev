import React from 'react';
import styles from './ChatItem.module.scss'

export const ChatInfo = ({ person, message }) => {
    const lastMessageText = message ? message.text : '';

    const maxLength = 20;
    const displayText = lastMessageText.length > maxLength
        ? `${lastMessageText.slice(0, maxLength)}...`
        : lastMessageText;

    return (
        <div className={styles.chatItemInfo}>
            <div className={styles.chatItemName}>{person.name}</div>
            <div className={styles.chatItemLastMessage}>{displayText}</div>
        </div>
    );
};
