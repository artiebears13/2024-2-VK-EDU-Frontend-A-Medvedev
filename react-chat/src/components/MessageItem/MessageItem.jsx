import React, { forwardRef, memo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './MessageItem.module.scss';
import CheckIcon from '@mui/icons-material/Check';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { GeoPreview } from '../GeoPreview/GeoPreview.jsx';
import { AudioPlayer } from '../AudioPlayer/AudioPlayer.jsx';
import {getFormattedDate, getFormattedTime} from "../../utils/datetime.js";

export const MessageItem = memo(
    forwardRef(({ message, isFound = false, currentAudio, setCurrentAudio }, ref) => {
        const user = useSelector((state) => state.user.user);
        const audioRef = useRef(null);
        const [playing, setPlaying] = useState(false);

        if (!user) {
            return null;
        }

        const direction = message.sender.id === user.id ? 'sent' : 'received';

    const formattedDate = getFormattedDate(message.created_at);
    const formattedTime = getFormattedTime(message.created_at);


        return (
            <li
                className={`${styles.messageItem} ${
                    direction === 'received' ? styles.received : styles.sent
                } ${styles.scaleInCenter}`}
                ref={ref}
            >
                {message.files && message.files.length > 0 && (
                    <div className={styles.messageItemImage}>
                        <img src={message.files[0].item} alt="image" />
                    </div>
                )}

                {message.text && message.text.startsWith('type:geolocation') ? (
                    <GeoPreview width={200} height={200} href={message.text.split('___')[1]} />
                ) : (
                    <p className={`${styles.messageItemText} ${isFound ? styles.found : ''}`}>
                        {message.text}
                    </p>
                )}

                {message.voice && (
                    <AudioPlayer
                        src={message.voice}
                        currentAudio={currentAudio}
                        setCurrentAudio={setCurrentAudio}
                    />
                )}

            <div className={styles.messageItemStatus}>
                <p className={styles.messageItemStatusItem}>
                    {message.was_read_by.length === 0 ? (
                        <CheckIcon fontSize="small" />
                    ) : (
                        <DoneAllIcon fontSize="small" />
                    )}
                </p>
                <p className={styles.time}>
                    {formattedDate && formattedTime ? `${formattedDate}, ${formattedTime}` : ''}
                </p>
            </div>
        </li>
    );
}));
