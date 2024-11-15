// src/context/ChatContext.jsx

import React, { createContext, useState, useEffect, useCallback, useContext, useRef } from 'react';

import { connectToCentrifugo } from '../api/centrifugo';
import { ErrorContext } from './ErrorContext.jsx';
import {getCurrentUser, getUsers, updateUserInfo} from "../api/users.js";
import {getChats} from "../api/chats.js";
import {getMessage, getMessages, sendMessage} from "../api/messages.js";
import {useNavigate} from "react-router-dom";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const navigate = useNavigate();
    const { setError } = useContext(ErrorContext);
    const [user, setUser] = useState(null);
    const [centrifuge, setCentrifuge] = useState(false);
    const [chats, setChats] = useState([]);
    const [messages, setMessages] = useState({}); // { chatId: [messages] }
    const [foundMessage, setFoundMessage] = useState(''); // Для поиска сообщений

    // Ref для хранения экземпляра Centrifuge
    const centrifugeRef = useRef(null);

    // Проверка наличия токенов в localStorage
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    const logout = useCallback(() => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setUser(null);
        navigate('/login');
    }, []);

    const loadCurrentUser = useCallback(async () => {
        try {
            const userData = await getCurrentUser();
            setUser(userData);
        } catch (error) {
            console.error('Ошибка при загрузке пользователя:', error);
            logout();
        }
    }, [logout, setUser]);

    useEffect(() => {
        if (accessToken && refreshToken) {
            loadCurrentUser().then().catch((err) => {
                throw new Error(`не получилось загрузить юзера: ${err}`)
            });
        } else {
            logout();
        }
    }, [accessToken, refreshToken, loadCurrentUser, logout]);

    const login = useCallback(async (access, refresh) => {
        localStorage.setItem('accessToken', access);
        localStorage.setItem('refreshToken', refresh);

        try {
            await loadCurrentUser();
        } catch (error) {
            console.error('Ошибка при загрузке пользователя после входа:', error);
            logout();
        }
    }, [loadCurrentUser, logout]);

    const loadChats = useCallback(async () => {
        try {
            const chatsData = await getChats();
            setChats(chatsData.results || chatsData);

        } catch (error) {
            console.error('Ошибка при загрузке чатов:', error);
            setError('Ошибка при загрузке чатов');
        }
    }, [setError]);

    const searchChats = useCallback(async (query) => {
        try {
            const chatsData = await getChats(1, 10, query);
            setChats(chatsData.results || chatsData);
        } catch (error) {
            console.error('Ошибка при загрузке чатов:', error);
            setError('Ошибка при загрузке чатов');
        }
    }, [setError]);

    useEffect(() => {
        if (user) {
            loadChats().then().catch((err) => {
                throw new Error(`не получилось загрузить чаты: ${err}`)
            });
        }
    }, [user, loadChats, messages]);

    // Стабилизируем обработчик сообщений
    const handleCentrifugoMessage = useCallback((event, message) => {
        if (event === 'create') {
            console.log('message', getMessage(message.id).then(res => console.log("res", res)))
            setMessages(prevMessages => ({
                ...prevMessages,
                [message.chat]: [message, ...(prevMessages[message.chat] || [])],
            }));
        } else if (event === 'update') {
            setMessages(prevMessages => ({
                ...prevMessages,
                [message.chat]: prevMessages[message.chat].map(msg =>
                    msg.id === message.id ? message : msg
                ),
            }));
        } else if (event === 'delete') {
            setMessages(prevMessages => ({
                ...prevMessages,
                [message.chat]: prevMessages[message.chat].filter(msg => msg.id !== message.id),
            }));
        }
    }, []);

    // Подключение к Centrifugo
    useEffect(() => {
        if (user && !centrifuge) {
            const centrifuge = connectToCentrifugo(user.id, handleCentrifugoMessage);
            centrifugeRef.current = centrifuge;
            setCentrifuge(true);
            return () => {
                if (centrifugeRef.current) {
                    centrifugeRef.current.disconnect();
                    centrifugeRef.current = null;
                    setCentrifuge(false);
                }
            };
        }
    }, [user]);

    const loadMessages = useCallback(async (chatId) => {
        try {
            const messagesData = await getMessages(chatId, {page_size:20, page: 1});
            setMessages(prevMessages => ({
                ...prevMessages,
                [chatId]: messagesData.results || messagesData,
            }));
        } catch (error) {
            console.error(`Ошибка при загрузке сообщений чата ${chatId}:`, error);
            setError(`Ошибка при загрузке сообщений чата ${chatId}`);
        }
    }, [setError]);

    const addMessage = useCallback(async (chatId, messageData) => {
        try {
            const newMessage = await sendMessage({
                chatId,
                text: messageData.text,
                files: messageData.files,
                voice: messageData.voice,
            });
            // setMessages(prevMessages => ({
            //     ...prevMessages,
            //     [chatId]: [...(prevMessages[chatId] || []), newMessage],
            // }));
        } catch (error) {
            console.error('Ошибка при отправке сообщения:', error);
            setError('Ошибка при отправке сообщения');
        }
    }, [setError]);

    const updateProfile = useCallback(async (updateData) => {
        try {
            const newUser = await updateUserInfo(updateData);
            setUser(newUser);
        }catch (e) {
            console.error('Ошибка при обновлении пользователя:', e);
            setError('Ошибка при обновлении пользователя:')
        }

    }, [setUser, setError]);


    return (
        <ChatContext.Provider value={{
            user,
            setUser,
            chats,
            messages,
            searchChats,
            login,
            logout,
            loadMessages,
            updateProfile,
            addMessage,
            foundMessage,
            setFoundMessage,
        }}>
            {children}
        </ChatContext.Provider>
    );
};
