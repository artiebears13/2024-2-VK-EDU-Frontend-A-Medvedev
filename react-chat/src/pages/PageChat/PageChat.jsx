import React, {memo, useCallback, useContext, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { ChatContext } from '../../context/ChatContext';
import {createMessageObject} from '../../utils/storage';
import { answerMock } from '../../mocks/__mocks__';
import './PageChat.scss';
import {MessageInput} from "../../components/Inputs/MessageInput/MessageInput.jsx";
import {MessagesList} from "../../components/MessagesList/MessagesList.jsx";
import {PageChatHeader} from "../../components/Headers/PageChatHeader/PageChatHeader.jsx";

export const PageChat = memo(() => {
    const { chatId } = useParams();
    const { messages, addMessage, markMessageAsRead, markAllReceivedAsRead } = useContext(ChatContext);
    const currentMessages = messages[chatId] || [];

    useEffect(() => {
        if (chatId) {
            markAllReceivedAsRead(chatId);
        }

    }, [chatId, markAllReceivedAsRead]);

    useEffect(() => {
        if (messages[chatId] && messages[chatId].length > 0) {
            const lastMessage = messages[chatId][messages[chatId].length - 1];
            if (lastMessage.direction === "received" && lastMessage.readStatus === "unread") {
                markMessageAsRead(chatId, lastMessage.id);
            }
        }
    }, [messages, chatId, markMessageAsRead]);


    const sendMessage = useCallback((messageText) => {
        if (messageText.trim()) {
            const message = createMessageObject(messageText, 'sent');
            addMessage(chatId, message);
            // simulations
            setTimeout(() => {
                markMessageAsRead(chatId, message.id);
            }, 2000);
            setTimeout(() => simulateReceivedMessage(chatId), 3000);
        }
    });

    const simulateReceivedMessage = useCallback(() => {
        const randomMessageIndex = Math.floor(Math.random() * answerMock.length);
        const receivedMessageText = answerMock[randomMessageIndex];
        const receivedMessage = createMessageObject(receivedMessageText, 'received');
        addMessage(chatId, receivedMessage);
    });

    return (
        <div className="page-chat">
            <PageChatHeader chatId={chatId} />
            <div className="chat-container">
                <MessagesList messages={currentMessages} />
                <MessageInput onSendMessage={sendMessage} />
            </div>
        </div>
    );
});