import React from 'react';
import styles from './ChatItem.module.scss'
import {imgOrPlaceholder} from "../../utils/imgOrPlaceholder/imgOrPlaceholder.js";

export const ChatPhoto = ({ person }) => {
    const src = imgOrPlaceholder(person.avatar);
    return (
        <div className={styles.chatItemPhoto}>
            <img src={src} alt={person.name}/>
        </div>
    );
};
