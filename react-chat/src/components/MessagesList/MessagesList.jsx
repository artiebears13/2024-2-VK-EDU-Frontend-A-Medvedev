// src/components/PageChat/MessagesList/MessagesList.jsx

import React, {useEffect, useRef, useContext, memo} from 'react';
import './MessagesList.scss';
import { MessageItem } from '../MessageItem/MessageItem.jsx';
import { ChatContext } from '../../context/ChatContext.jsx';

export const MessagesList = memo(({ messages }) => {
    const { foundMessage, setFoundMessage } = useContext(ChatContext);
    const foundRef = useRef(null);
    const ref = useRef(null);

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

    return (
        <div className="messages-container" ref={ref}>
            <ul className="messages-list">
                {messages.map((message) => {
                    if (foundMessage && message.id === foundMessage ) {
                        return <MessageItem
                            ref={foundRef}
                            key={message.id || message.timestamp}
                            message={message}
                            isFound={true}
                        />
                    }
                    return <MessageItem
                        key={message.id || message.timestamp}
                        message={message}
                    />
                })}
            </ul>
        </div>
    )});
