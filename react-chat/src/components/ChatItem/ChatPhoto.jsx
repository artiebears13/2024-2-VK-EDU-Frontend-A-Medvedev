import React from 'react';
import styles from './ChatItem.module.scss'

export const ChatPhoto = ({ person }) => {
    return (
        <div className={styles.chatItemPhoto}>
            <img src={person.photo} alt={person.name}/>
        </div>
    );
};
