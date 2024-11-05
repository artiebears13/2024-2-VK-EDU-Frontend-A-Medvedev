import React, {memo, useCallback, useContext, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {ChatContext} from '../../context/ChatContext';
import {createMessageObject} from '../../utils/storage';
import {answerMock} from '../../mocks/__mocks__';
import styles from './PageChat.module.scss';
import {MessageInput} from "../../components/Inputs/MessageInput/MessageInput.jsx";
import {MessagesList} from "../../components/MessagesList/MessagesList.jsx";
import {PageChatHeader} from "../../components/Headers/PageChatHeader/PageChatHeader.jsx";
import {PersonNotFoundBadge} from "../../components/Badges/PersonNotFoundBadge.jsx";
import {EditPersonModal} from "../../components/Modals/EditPersonModal/EditPersonModal.jsx";

export const PageChat = memo(() => {
    const {chatId} = useParams();
    const [editPersonModal, setEditPersonModal] = useState(false);
    const {messages, addMessage, markMessageAsRead, markAllReceivedAsRead, persons, editPersonInPersons} = useContext(ChatContext);
    const currentMessages = messages[chatId] || [];
    const personFound = persons.some(person => person.id === chatId);
    const person = persons.find(person => person.id === chatId) || {};

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

    const openEditPersonModal = () => {
        setEditPersonModal(true);
    }

    const closeEditPersonModal = () => {
        setEditPersonModal(false);
    }

    const editPersonInfo = useCallback(({name, photo}) => {
        console.log({ name, photo });
        editPersonInPersons(chatId, {name, photo});
    })

    const sendMessage = useCallback(({text, image}) => {
        const messageText = text.trim();
        if (messageText || image) {
            const message = createMessageObject(messageText, 'sent', image);
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
        <div>
            <PageChatHeader chatId={chatId} openEditPersonModal={openEditPersonModal} />
            {editPersonModal &&
                <EditPersonModal
                    onClose={closeEditPersonModal}
                    person={person}
                    updatePerson={editPersonInfo}
                />}
            <div className={styles.chatContainer}>
                {personFound ?
                    <MessagesList messages={currentMessages}/>
                    :
                    <PersonNotFoundBadge/>}
                <MessageInput onSendMessage={sendMessage} active={personFound}/>
            </div>
        </div>
    );
});