import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ChatContext } from '../../context/ChatContext';
import {createMessageObject, getLastMessage} from '../../utils/storage';
import { answerMock } from '../../mocks/__mocks__';
import './PageChat.scss';
import { Header } from "../../components/PageChat/Header";
import {MessagesList} from "../../components/PageChat/MessagesList";
import {MessageInput} from "../../components/PageChat/MessageInput";

export const PageChat = () => {
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


    const sendMessage = (messageText) => {
        if (messageText.trim()) {
            const message = createMessageObject(messageText, 'sent');
            addMessage(chatId, message);
            // simulations
            setTimeout(() => {
                markMessageAsRead(chatId, message.id);
            }, 2000);
            setTimeout(() => simulateReceivedMessage(chatId), 3000);
        }
    };

    const simulateReceivedMessage = () => {
        const randomMessageIndex = Math.floor(Math.random() * answerMock.length);
        const receivedMessageText = answerMock[randomMessageIndex];
        const receivedMessage = createMessageObject(receivedMessageText, 'received');
        addMessage(chatId, receivedMessage);
    };

    return (
        <div className="page-chat">
            <Header chatId={chatId} />
            <div className="chat-container">
                <MessagesList messages={currentMessages} />
                <MessageInput onSendMessage={sendMessage} />
            </div>
        </div>
    );
};
