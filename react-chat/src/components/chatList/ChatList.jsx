import React, {memo, useContext, useEffect, useMemo, useState} from 'react';
import styles from './ChatList.module.scss';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import {ChatItem} from '../ChatItem/ChatItem.jsx';
import {ChatContext} from '../../context/ChatContext.jsx';

export const ChatList = memo(({searchQuery = ''}) => {
    const {chats, messages, setFoundMessage} = useContext(ChatContext);
    const [filteredChats, setFilteredChats] = useState([]);

    useEffect(() => {
        if (searchQuery === '') {
            // Возвращаем чаты с последним сообщением
            const chatsWithLastMessage = chats.map(chat => {
                const chatMessages = messages[chat.id] || [];
                const lastMessage = chat.last_message || null;

                return {
                    chat,
                    message: lastMessage,
                };
            });
            setFilteredChats(chatsWithLastMessage);
        } else {
            const query = searchQuery.toLowerCase();
            const filtered = chats
                .map(chat => {
                    const chatMessages = messages[chat.id] || [];
                    const chatTitle = chat.title || '';
                    const nameMatch = chatTitle.toLowerCase().includes(query);

                    const matchingMessages = chatMessages.filter(message =>
                        (message.text || '').toLowerCase().includes(query)
                    );

                    if (nameMatch) {
                        // Если совпадает название чата
                        const lastMessage = chat.last_message || null;
                        return {
                            chat,
                            message: lastMessage,
                        };
                    } else if (matchingMessages.length > 0) {
                        // Если есть сообщения, совпадающие с запросом
                        const lastMatchingMessage = matchingMessages.reduce(
                            (latest, current) => {
                                const latestTime = new Date(latest.created_at).getTime();
                                const currentTime = new Date(current.created_at).getTime();
                                return currentTime > latestTime ? current : latest;
                            }
                        );
                        setFoundMessage(lastMatchingMessage.id);

                        return {
                            chat,
                            message: lastMatchingMessage,
                        };
                    } else {
                        return null;
                    }
                })
                .filter(chat => chat !== null);

            setFilteredChats(filtered);
        }
    }, [searchQuery, chats, messages, setFoundMessage]);

    // Кэшируем и сортируем чаты по времени последнего сообщения
    const sortedChats = useMemo(() => {
        return [...filteredChats].sort((a, b) => {
            const timeA = a.message ? new Date(a.message.created_at).getTime() : 0;
            const timeB = b.message ? new Date(b.message.created_at).getTime() : 0;
            return timeB - timeA;
        });
    }, [filteredChats]);

    return (
        <div className={styles.chatList}>
            {sortedChats.length > 0 ? (
                sortedChats.map(chatItem => {
                        return (<ChatItem
                            key={chatItem.chat.id}
                            chat={chatItem.chat}
                            message={chatItem.message}
                            isSearched={searchQuery !== ''}
                        />)
                    }
                )
            ) : (searchQuery === "" ?
                (<div className={styles.notFoundMessage}>
                    <SentimentVeryDissatisfiedIcon/>
                    <p>Вы еще не создали чат</p>
                </div>)
                :
                (<div className={styles.notFoundMessage}>
                    <SentimentVeryDissatisfiedIcon/>
                    <p>По запросу "{searchQuery}" ничего не найдено</p>
                </div>
                )
                )}
        </div>
    );
});
