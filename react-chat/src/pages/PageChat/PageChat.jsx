// src/pages/PageChat/PageChat.jsx

import React, {memo, useCallback, useContext, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {ChatContext} from '../../context/ChatContext';
import styles from './PageChat.module.scss';
import {MessageInput} from "../../components/Inputs/MessageInput/MessageInput.jsx";
import {MessagesList} from "../../components/MessagesList/MessagesList.jsx";
import {PageChatHeader} from "../../components/Headers/PageChatHeader/PageChatHeader.jsx";
import {EditPersonModal} from "../../components/Modals/EditPersonModal/EditPersonModal.jsx";
import {PersonNotFoundBadge} from "../../components/Badges/PersonNotFoundBadge.jsx";
import {getChat} from "../../api/chats.js"; // Если есть

export const PageChat = memo(() => {
    const {chatId} = useParams();
    const {user, chats, messages, loadMessages, addMessage, addVoiceMessage, markMessagesAsRead} = useContext(ChatContext);
    const [editChatModal, setEditChatModal] = useState(false);
    const [currentChat, setCurrentChat] = useState(null);
    const [chatFound, setChatFound] = useState(true);

    const [currentMessages, setCurrentMessages] = useState([]);

    useEffect(() => {
        getChat(chatId).then(res => setCurrentChat(res)).catch(() => setChatFound(false));
        if (chatId) {
            loadMessages(chatId);
        }
    }, [chatId]);

    useEffect(() => {
        console.log("reading");
        markMessagesAsRead(chatId);
    }, [messages, markMessagesAsRead]);

    useEffect(() => {
        setCurrentMessages(messages[chatId] || []);
    }, [messages, setCurrentMessages, chatId]);

    const openEditChatModal = () => {
        setEditChatModal(true);
    }

    const closeEditChatModal = () => {
        setEditChatModal(false);
    }

    const editChatInfo = useCallback(({name, photo}) => {
        // editChatInChats(chatId, { name, photo });
    }, [chatId]);


    const sendMessage = useCallback(async ({text, files}) => {
        const messageText = text.trim();
        if (messageText || (files && files.length > 0)) {
            try {
                await addMessage(chatId, {
                    text: messageText,
                    files: files,
                });
            } catch (error) {
                console.error('Ошибка при отправке сообщения:', error);
            }
        }
    }, [chatId, addMessage]);

    const sendVoiceMessage = useCallback(async (voice) => {
        if (voice) {
            try {
                await addVoiceMessage(chatId, voice);
            } catch (error) {
                console.error('Ошибка при отправке сообщения:', error);
            }
        }
    }, [chatId, addMessage]);


    return (
        <div>
            <PageChatHeader chat={currentChat} openEditChatModal={openEditChatModal}/>
            {editChatModal &&
                <EditPersonModal
                    onClose={closeEditChatModal}
                    chat={chatId}
                    updateChat={editChatInfo}
                />}
            <div className={styles.chatContainer}>
                <MessagesList messages={currentMessages}/>
                <MessageInput onSendMessage={sendMessage} active={chatFound} onSendVoice={sendVoiceMessage}/>
            </div>
        </div>
    );
});
