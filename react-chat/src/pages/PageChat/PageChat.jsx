
import React, { memo, useCallback, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ChatContext } from '../../context/ChatContext';
import styles from './PageChat.module.scss';
import { MessageInput } from "../../components/Inputs/MessageInput/MessageInput.jsx";
import { MessagesList } from "../../components/MessagesList/MessagesList.jsx";
import { PageChatHeader } from "../../components/Headers/PageChatHeader/PageChatHeader.jsx";
import { EditPersonModal } from "../../components/Modals/EditPersonModal/EditPersonModal.jsx";
import {getChat} from "../../api/chats.js";

export const PageChat = memo(() => {
    const {chatId} = useParams();
    const {
        user,
        chats,
        messages,
        loadMessages,
        addMessage,
        addVoiceMessage,
        markMessagesAsRead,
        currentChat,
        setCurrentChat
    } = useContext(ChatContext);
    const [editChatModal, setEditChatModal] = useState(false);
    const [chatFound, setChatFound] = useState(true);

    const [currentMessages, setCurrentMessages] = useState([]);

    useEffect(() => {
        getChat(chatId).then(res => setCurrentChat(res)).catch(() => setChatFound(false));
        if (chatId) {
            loadMessages(chatId);
        }
        return () => {setCurrentChat(null)}
    }, [chatId]);

    useEffect(() => {
        markMessagesAsRead(chatId);
    }, [])

    useEffect(() => {
        setCurrentMessages(messages[chatId] || []);
    }, [messages, setCurrentMessages, chatId]);

    const openEditChatModal = () => {
        setEditChatModal(true);
    }

    const closeEditChatModal = () => {
        setEditChatModal(false);
    }

    const editChatInfo = useCallback(({ name, photo }) => {
        // TODO: make chat info editable
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
            <PageChatHeader chat={currentChat} openEditChatModal={openEditChatModal} />
            {/*TODO: make chat info editable*/}
            {/*{editChatModal && <EditPersonModal onClose={closeEditChatModal} chat={chatId} updateChat={editChatInfo}/>}*/}
            <div className={styles.chatContainer}>
                    <MessagesList messages={currentMessages} />
                <MessageInput onSendMessage={sendMessage} active={chatFound} onSendVoice={sendVoiceMessage}/>
            </div>
        </div>
    );
});
