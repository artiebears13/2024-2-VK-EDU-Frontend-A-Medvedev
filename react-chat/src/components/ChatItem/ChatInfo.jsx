import React from 'react';
import styles from './ChatItem.module.scss'
import log from "eslint-plugin-react/lib/util/log.js";

export const ChatInfo = ({ title, message }) => {
    let lastMessageText = message.text ? message.text : 'файл';

    const maxLength = 20;
    const displayText = lastMessageText.length > maxLength
        ? `${lastMessageText.slice(0, maxLength)}...`
        : lastMessageText;

    return (
        <div className={styles.chatItemInfo}>
            <div className={styles.chatItemName}>{title}</div>
            <div className={styles.chatItemLastMessage}>{displayText}</div>
        </div>
    );
};
