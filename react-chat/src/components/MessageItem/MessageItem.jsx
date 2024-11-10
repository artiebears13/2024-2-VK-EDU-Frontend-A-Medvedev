import React, {forwardRef, memo} from 'react';
import styles from './MessageItem.module.scss';
import CheckIcon from '@mui/icons-material/Check';
import DoneAllIcon from '@mui/icons-material/DoneAll';

export const MessageItem = memo(forwardRef(({message, isFound = false}, ref) => {
    return (
        <li className={`${styles.messageItem} ${message.direction === 'received' ? styles.received : styles.sent} ${styles.scaleInCenter}`}
            ref={ref}>
            {(message.image) &&
                <div className={styles.messageItemImage}>
                    <img src={message.image} alt={"image"}/>
                </div>
            }
            <p className={`${styles.messageItemText} ${isFound ? styles.found : ''}`}>{message.text}</p>
            <div className={styles.messageItemStatus}>
                <p className={styles.messageItemStatusItem}>
                    {message.direction === 'sent' && (
                        message.readStatus === 'unread' ?
                            <CheckIcon fontSize="small"/> :
                            <DoneAllIcon fontSize="small"/>
                    )}
                </p>
                <p className={styles.time}>
                    {new Date(message.timestamp).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}
                </p>
            </div>
        </li>
    );
}));
