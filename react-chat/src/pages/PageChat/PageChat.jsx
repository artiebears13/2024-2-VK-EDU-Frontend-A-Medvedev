import React, { useEffect, useCallback, memo } from 'react';
import { useParams } from 'react-router-dom';
import { useChatContext } from '../../context/ChatContext';
import './PageChat.scss';
import { PageChatHeader } from "../../components/Headers/PageChatHeader";
import { MessagesList } from "../../components/MessagesList";
import { MessageInput } from "../../components/Inputs/MessageInput";
import {createMessageObject} from "../../utils/storage.js";
import {answerMock} from "../../mocks/__mocks__.js";

export const PageChat = memo(() => {
    const { chatId } = useParams();
    const {
        getMessagesByChatId,
        addMessage,
        markMessageAsRead,
        markAllReceivedAsRead,
        foundMessage,
        setFoundMessage
    } = useChatContext();
    const currentMessages = getMessagesByChatId(chatId);

    useEffect(() => {
        if (chatId) {
            markAllReceivedAsRead(chatId);
        }
    }, [chatId, markAllReceivedAsRead]);

    const sendMessage = useCallback((messageText) => {
        if (messageText.trim()) {
            const message = createMessageObject(messageText, 'sent');
            addMessage(chatId, message);
            setTimeout(() => markMessageAsRead(chatId, message.id), 2000);
            setTimeout(() => simulateReceivedMessage(chatId), 3000);
        }
    }, [chatId, addMessage, markMessageAsRead]);

    const simulateReceivedMessage = useCallback(() => {
        const randomMessageIndex = Math.floor(Math.random() * answerMock.length);
        const receivedMessageText = answerMock[randomMessageIndex];
        const receivedMessage = createMessageObject(receivedMessageText, 'received');
        addMessage(chatId, receivedMessage);
    }, [chatId, addMessage]);

    return (
        <div className="page-chat">
            <PageChatHeader chatId={chatId} />
            <div className="chat-container">
                <MessagesList messages={currentMessages} foundMessage={foundMessage} setFoundMessage={setFoundMessage} />
                <MessageInput onSendMessage={sendMessage} />
            </div>
        </div>
    );
});
