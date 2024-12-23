import React, { memo, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styles from './PageChat.module.scss';
import { MessageInput } from '../../components/Inputs/MessageInput/MessageInput.jsx';
import { MessagesList } from '../../components/MessagesList/MessagesList.jsx';
import { PageChatHeader } from '../../components/Headers/PageChatHeader/PageChatHeader.jsx';
// import { EditPersonModal } from '../../components/Modals/EditPersonModal/EditPersonModal.jsx';
import { fetchCurrentChat, setCurrentChat } from '../../store/chatSlice';
import { fetchMessages, markMessagesAsRead, sendNewMessage } from '../../store/messageSlice';

export const PageChat = memo(() => {
    const { chatId } = useParams();
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user.user);
    const messages = useSelector((state) => state.messages.messages);
    const currentChat = useSelector((state) => state.chats.currentChat);

    const [editChatModal, setEditChatModal] = useState(false);
    const [chatFound, setChatFound] = useState(true);

    const currentMessages = messages[chatId] || [];

    useEffect(() => {
        if (chatId) {
            dispatch(fetchCurrentChat(chatId))
                .unwrap()
                .catch(() => setChatFound(false));

            dispatch(fetchMessages(chatId));
        }
        return () => {
            dispatch(setCurrentChat(null));
        };
    }, [chatId, dispatch]);

    useEffect(() => {
        dispatch(markMessagesAsRead(chatId));
    }, [chatId, dispatch]);

    const openEditChatModal = () => {
        setEditChatModal(true);
    };

    const closeEditChatModal = () => {
        setEditChatModal(false);
    };

    const editChatInfo = useCallback(
        ({ name, photo }) => {
            // TODO: make chat info editable
        },
        [chatId]
    );

    const sendMessage = useCallback(
        async ({ text, files }) => {
            const messageText = text.trim();
            if (messageText || (files && files.length > 0)) {
                try {
                    await dispatch(
                        sendNewMessage({
                            chatId,
                            messageData: {
                                text: messageText,
                                files: files,
                            },
                        })
                    );
                } catch (error) {
                    console.error('Ошибка при отправке сообщения:', error);
                }
            }
        },
        [chatId, dispatch]
    );

    const sendVoiceMessage = useCallback(
        async (voice) => {
            if (voice) {
                try {
                    await dispatch(
                        sendNewMessage({
                            chatId,
                            messageData: {
                                text: '',
                                voice: voice,
                            },
                        })
                    );
                } catch (error) {
                    console.error('Ошибка при отправке голосового сообщения:', error);
                }
            }
        },
        [chatId, dispatch]
    );

    return (
        <div>
            <PageChatHeader chat={currentChat} openEditChatModal={openEditChatModal} />
            {/* TODO: make chat info editable */}
            {/* {editChatModal && <EditPersonModal onClose={closeEditChatModal} chat={chatId} updateChat={editChatInfo} />} */}
            <div className={styles.chatContainer}>
                <MessagesList messages={currentMessages} />
                <MessageInput onSendMessage={sendMessage} active={chatFound} onSendVoice={sendVoiceMessage} />
            </div>
        </div>
    );
});
