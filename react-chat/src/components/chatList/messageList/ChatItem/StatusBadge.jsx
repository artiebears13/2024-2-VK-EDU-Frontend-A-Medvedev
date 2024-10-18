import React from 'react';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import CheckIcon from '@mui/icons-material/Check';

export const StatusBadge = ({message}) => {
    if (!message) return null;

    if (message.direction === 'received' && message.readStatus === 'unread') {
        return <div className="unread-count">1</div>;
    } else if (message.direction === 'sent') {
        return (
            <>
            {message.readStatus === 'unread' ? <CheckIcon /> : <DoneAllIcon />}
            </>
        );
    }

    return null;
};
