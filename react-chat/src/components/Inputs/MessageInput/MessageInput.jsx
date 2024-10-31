import React, { useState, useContext } from 'react';
import './MessageInput.scss';
import SendIcon from '@mui/icons-material/Send';

export const MessageInput = ({onSendMessage}) => {
    const [messageText, setMessageText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const trimmedMessage = messageText.trim();
        if (trimmedMessage) {
            onSendMessage(trimmedMessage)
            setMessageText('');
        }
    };

    return (
        <div className="form-container">
            <form className="form" onSubmit={handleSubmit}>
                <input
                    className="form-input"
                    type="text"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Введите сообщение"
                    aria-label="Message input"
                />
                <button className="send-btn" type="submit" aria-label="Send Message">
                    <SendIcon className="send-icon white" fontSize={"small"}/>
                </button>
            </form>
        </div>
    );
};
