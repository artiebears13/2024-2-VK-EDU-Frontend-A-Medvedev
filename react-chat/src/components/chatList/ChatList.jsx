import React, { useEffect, useRef } from 'react';
import './MessagesList.scss';
import { MessageItem } from '../MessageItem/MessageItem.jsx';

export const MessagesList = React.memo(({ messages, foundMessage, setFoundMessage }) => {
    const foundRef = useRef(null);
    const ref = useRef(null);

    useEffect(() => {
        if (ref.current) {
            ref.current.scrollTop = ref.current.scrollHeight;
        }
    }, [messages]);

    useEffect(() => {
        if (foundRef.current) {
            foundRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
            const timer = setTimeout(() => {
                setFoundMessage('');
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [foundMessage, setFoundMessage]);

    return (
        <div className="messages-container" ref={ref}>
            <ul className="messages-list">
                {messages.map((message) => (
                    <MessageItem
                        ref={message.id === foundMessage ? foundRef : null}
                        key={message.id || message.timestamp}
                        message={message}
                        isFound={message.id === foundMessage}
                    />
                ))}
            </ul>
        </div>
    );
});
