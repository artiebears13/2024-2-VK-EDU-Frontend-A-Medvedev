import React, { useEffect, useRef, memo, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './MessagesList.module.scss';
import { MessageItem } from '../MessageItem/MessageItem.jsx';
import { setFoundMessage } from '../../store/messageSlice'; // Импортируем действие для обновления foundMessage

export const MessagesList = memo(({ messages }) => {
    const dispatch = useDispatch();
    const foundMessage = useSelector((state) => state.messages.foundMessage);
    const user = useSelector((state) => state.user.user);

    const foundRef = useRef(null);
    const ref = useRef(null);
    const [currentAudio, setCurrentAudio] = useState(null);

    useEffect(() => {
        if (ref.current) {
            ref.current.scrollTop = ref.current.scrollHeight;
        }

        if (foundRef.current) {
            foundRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            const timer = setTimeout(() => {
                dispatch(setFoundMessage(''));
            }, 1000);
            return () => {
                clearTimeout(timer);
            };
        }
    }, [messages, dispatch, foundRef]);

    const getMessageItems = useCallback(
        (message) => {
            if (foundMessage && message.id === foundMessage) {
                return (
                    <MessageItem
                        ref={foundRef}
                        key={message.id || message.timestamp}
                        message={message}
                        isFound={true}
                        setCurrentAudio={setCurrentAudio}
                        currentAudio={currentAudio}
                    />
                );
            }
            return (
                <MessageItem
                    key={message.id || message.timestamp}
                    message={message}
                    setCurrentAudio={setCurrentAudio}
                    currentAudio={currentAudio}
                />
            );
        },
        [foundMessage, currentAudio]
    );

    return (
        <div className={styles.messagesContainer} ref={ref}>
            <ul className={styles.messagesList}>
                {[...messages].reverse().map(getMessageItems)}
            </ul>
        </div>
    );
});
