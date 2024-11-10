import React, {memo, useContext, useEffect, useMemo, useState} from 'react';
import styles from './ChatList.module.scss';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import {ChatItem} from "../ChatItem/ChatItem.jsx";
import {ChatContext} from "../../context/ChatContext.jsx";

export const ChatList = memo(({ searchQuery = '' }) => {
    const {persons, messages, setFoundMessage } = useContext(ChatContext);
    const [filteredChats, setFilteredChats] = useState([]);

    useEffect(() => {
        if (searchQuery === '') {
            // return last message
            const chatsWithLastMessage = persons.map(person => {
                const personMessages = messages[person.id] || [];
                const lastMessage = personMessages.length > 0
                    ? personMessages[personMessages.length - 1]
                    : null;
                return {
                    person,
                    message: lastMessage,
                };
            });
            setFilteredChats(chatsWithLastMessage);
        } else {
            const query = searchQuery.toLowerCase();
            const filtered = persons.map(person => {
                const personMessages = messages[person.id] || [];
                const nameMatch = person.name.toLowerCase().includes(query);
                const matchingMessages = personMessages.filter(message =>
                    message.text.toLowerCase().includes(query)
                );

                if (nameMatch) {
                    // if query is name return it first
                    const lastMessage = personMessages.length > 0
                        ? personMessages[personMessages.length - 1]
                        : null;
                    return {
                        person,
                        message: lastMessage,
                    };
                } else if (matchingMessages.length > 0) {
                    // not found messages
                    const lastMatchingMessage = matchingMessages.reduce((latest, current) => {
                        return (!latest || current.timestamp > latest.timestamp) ? current : latest;
                    }, null);
                    // if found return last found
                    setFoundMessage(lastMatchingMessage.id);

                    return {
                        person,
                        message: lastMatchingMessage,
                    };
                } else {
                    return null;
                }
            }).filter(chat => chat !== null);

            setFilteredChats(filtered);
        }
    }, [searchQuery, persons, messages]);

    // cached
    const sortedChats = useMemo(() => {
        return [...filteredChats].sort((a, b) => {
            const timeA = a.message ? a.message.timestamp : 0;
            const timeB = b.message ? b.message.timestamp : 0;
            return timeB - timeA;
        });
    }, [filteredChats]);

    return (
        <div className={styles.chatList}>
            {sortedChats.length > 0 ? (
                sortedChats.map((chat, index) => (
                    <ChatItem
                        key={chat.person.id}
                        person={chat.person}
                        message={chat.message}
                        isSearched={searchQuery !== ''}
                    />
                ))
            ) : (
                <div className={styles.notFoundMessage}>
                    <SentimentVeryDissatisfiedIcon/>
                    <p>По запросу "{searchQuery}" ничего не найдено</p>
                </div>
            )}
        </div>
    );
});