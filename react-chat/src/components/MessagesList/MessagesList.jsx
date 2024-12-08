import React, {useEffect, useRef, useContext, memo, useCallback, useState} from 'react';
import styles from './MessagesList.module.scss';
import { MessageItem } from '../MessageItem/MessageItem.jsx';
import { ChatContext } from '../../context/ChatContext.jsx';

export const MessagesList = memo(({ messages }) => {
    const { foundMessage, setFoundMessage, user } = useContext(ChatContext);
    const foundRef = useRef(null);
    const ref = useRef(null);
    const [currentAudio, setCurrentAudio] = useState(null);


    useEffect(() => {
        if (ref && ref.current) {
            ref.current.scrollTop = ref.current.scrollHeight;
        }

        if (foundRef.current){
            foundRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
            const timer = setTimeout(() => {
                setFoundMessage('');
            }, 1000);
            return () => {
                clearTimeout(timer);
            }
        }

    }, [messages, setFoundMessage]);


    const getMessageItems = useCallback((message) => {
        if (foundMessage && message.id === foundMessage ) {
            return <MessageItem
                ref={foundRef}
                key={message.id || message.timestamp}
                message={message}
                isFound={true}
                setCurrentAudio={setCurrentAudio}
                currentAudio={currentAudio}
                // user={user}
            />
        }
        return <MessageItem
            key={message.id || message.timestamp}
            message={message}
            setCurrentAudio={setCurrentAudio}
            currentAudio={currentAudio}
            // user={user}
        />
    });

    return (
        <div className={styles.messagesContainer} ref={ref}>
            <ul className={styles.messagesList}>
                {[...messages].reverse().map(getMessageItems)}
            </ul>
        </div>
    )});
