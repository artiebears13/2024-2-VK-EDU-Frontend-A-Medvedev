import React from 'react';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import CheckIcon from '@mui/icons-material/Check';
import styles from './ChatItem.module.scss'

export const StatusBadge = ({message, received}) => {

    if (!message) return null;

    if (received && message.was_read_by.length === 0) {
        return <div className={styles.unreadCount}></div>;
    } else if (!received) {
        return (
            <>
            {message.was_read_by.length === 0 ? <CheckIcon /> : <DoneAllIcon />}
            </>
        );
    }

    return null;
};
