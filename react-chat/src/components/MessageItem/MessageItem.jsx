import React, {forwardRef, memo, useContext, useEffect, useRef} from 'react';
import styles from './MessageItem.module.scss';
import CheckIcon from '@mui/icons-material/Check';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import {ChatContext} from "../../context/ChatContext.jsx";
import {GeoPreview} from "../GeoPreview/GeoPreview.jsx";

export const MessageItem = memo(forwardRef(({message, isFound = false}, ref) => {
    const {user} = useContext(ChatContext);
    const audioRef = useRef(null);
    if (!user) {return }

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.load();
            console.log('load',audioRef.current);
        }
    }, [message.voice]);

    const direction = message.sender.id === user.id ? 'sent' : 'received';
    return (
        <li className={`${styles.messageItem} ${direction === 'received' ? styles.received : styles.sent} ${styles.scaleInCenter}`}
            ref={ref}>
            {(message.files.length > 0) &&
                <div className={styles.messageItemImage}>
                    <img src={message.files[0].item} alt={"image"}/>
                </div>
            }

            {message.text && message.text.startsWith(`type:geolocation`)?
            <GeoPreview width={200} href={200} href={message.text.split('___')[1]}  />
                :
            <p className={`${styles.messageItemText} ${isFound ? styles.found : ''}`}>{message.text}</p>
            }
            {message.voice && <audio ref={audioRef} src={message.voice} controls />}
            <div className={styles.messageItemStatus}>
                <p className={styles.messageItemStatusItem}>
                    {
                        message.was_read_by.length === 0 ?
                            <CheckIcon fontSize="small"/> :
                            <DoneAllIcon fontSize="small"/>
                    }
                </p>
                <p className={styles.time}>
                    {new Date(message.created_at).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}
                </p>
            </div>
        </li>
    );
}));
