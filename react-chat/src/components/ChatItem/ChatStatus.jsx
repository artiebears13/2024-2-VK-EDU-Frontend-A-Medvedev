import React from 'react';
import { StatusBadge } from './StatusBadge.jsx';
import styles from './ChatItem.module.scss'


export const ChatStatus = ({ message }) => {
    return (
        <div className={styles.chatItemStatus}>
            <StatusBadge message={message}/>
        </div>
    );
};
