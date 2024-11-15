import React, {forwardRef, memo, useContext} from 'react';
import styles from './MessageItem.module.scss';
import CheckIcon from '@mui/icons-material/Check';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import {ChatContext} from "../../context/ChatContext.jsx";

export const MessageItem = memo(forwardRef(({message, isFound = false}, ref) => {
    const {user} = useContext(ChatContext);
    if (!user) {return }
    const direction = message.sender.id === user.id ? 'sent' : 'received';
    return (
        <li className={`${styles.messageItem} ${direction === 'received' ? styles.received : styles.sent} ${styles.scaleInCenter}`}
            ref={ref}>
            {(message.files.length > 0) &&
                <div className={styles.messageItemImage}>
                    <img src={message.files[0].item} alt={"image"}/>
                </div>
            }
            <p className={`${styles.messageItemText} ${isFound ? styles.found : ''}`}>{message.text}</p>
            <div className={styles.messageItemStatus}>
                <p className={styles.messageItemStatusItem}>
                    {direction === 'sent' && (
                        message.readStatus === 'unread' ?
                            <CheckIcon fontSize="small"/> :
                            <DoneAllIcon fontSize="small"/>
                    )}
                </p>
                <p className={styles.time}>
                    {new Date(message.created_at).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}
                </p>
            </div>
        </li>
    );
}));
