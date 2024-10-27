import React, {createContext, useState, useEffect, useCallback, useContext} from 'react';
import {
    loadPersons,
    getAllMessages,
    saveMessage,
    markReceivedMessagesAsRead,
    readMessage, readUserData
} from '../utils/storage';
import {ErrorContext} from "./ErrorContext.jsx";
import log from "eslint-plugin-react/lib/util/log.js";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const {setError} = useContext(ErrorContext);
    const [selfPerson, setSelfPerson] = useState({});
    const [persons, setPersons] = useState([]);
    const [messages, setMessages] = useState({}); // { personId: [messages] }
    const [foundMessage, setFoundMessage] = useState(''); // Для поиска сообщений

    // initialize from localStorage
    useEffect(() => {
        const loadData = async () => {
        try {
            const loadedPersons = await loadPersons();
            setPersons(loadedPersons);


            const self = readUserData();
            setSelfPerson(self);


            const messagesPromises = loadedPersons.map(person =>
                getAllMessages(person.id).then(messages => ({ id: person.id, messages }))
            );

            const results = await Promise.all(messagesPromises);
            const loadedMessages = results.reduce((acc, { id, messages }) => {
                acc[id] = messages;
                return acc;
            }, {});
            setMessages(loadedMessages);
        } catch (error) {
            setError(error.message)
            setPersons([]);
            setMessages([]);
        }
    };
        loadData().then();

    }, [setError]);



    const editPerson = useCallback((updatedData) => {
        console.log(updatedData);


        setSelfPerson((prevPerson) => {
            const updatedPerson = { ...prevPerson, ...updatedData };
            localStorage.setItem('user', JSON.stringify(updatedPerson));
            return updatedPerson;
        });
    }, [setSelfPerson]);

    const addMessage = useCallback(async (personId, message) => {
        console.log('add messages context ', message);

        await saveMessage(personId, message);
        setMessages(prevMessages => ({
            ...prevMessages,
            [personId]: [...(prevMessages[personId] || []), message]
        }));
        console.log('add messages context ', messages);
    }, []);

    const markMessageAsRead = useCallback((personId, messageId) => {
        readMessage(personId, messageId);
        setMessages(prevMessages => ({
            ...prevMessages,
            [personId]: (prevMessages[personId] || []).map(msg =>
                msg.id === messageId ? { ...msg, readStatus: 'read' } : msg
            )
        }));
    }, []);

    const markAllReceivedAsRead = useCallback((personId) => {
        setMessages(prevMessages => {
            const currentMessages = prevMessages[personId];

            if (!currentMessages || currentMessages.length === 0) {
                return prevMessages; // Возвращаем предыдущее состояние без изменений
            }

            const hasUnreadReceived = currentMessages.some(msg =>
                msg.direction === 'received' && msg.readStatus === 'unread'
            );

            if (!hasUnreadReceived) {
                return prevMessages; // Возвращаем предыдущее состояние без изменений
            }

            markReceivedMessagesAsRead(personId);

            const updatedMessages = currentMessages.map(msg =>
                (msg.direction === 'received' && msg.readStatus === 'unread')
                    ? { ...msg, readStatus: 'read' }
                    : msg
            );

            return {
                ...prevMessages,
                [personId]: updatedMessages
            };
        });
    }, []);

    const addPerson = useCallback((newPerson) => {
        setPersons(prevPersons => {
            const updatedPersons = [...prevPersons, newPerson];
            localStorage.setItem('people', JSON.stringify(updatedPersons));
            return updatedPersons;
        });
    }, []);

    return (
        <ChatContext.Provider value={{
            selfPerson,
            editPerson,
            persons,
            messages,
            addMessage,
            markMessageAsRead,
            markAllReceivedAsRead,
            addPerson,
            foundMessage,
            setFoundMessage,
        }}>
            {children}
        </ChatContext.Provider>
    );
};
