import './chatList.scss';
import {loadPeople, getLastMessage, getAllMessages} from '../../utils/storage.js';
import {chatItem} from "./items/chatItem";

export function chatList(searchQuery = '') {
    const people = loadPeople();
    const chatListDiv = document.getElementById('chat-list');
    chatListDiv.innerHTML = '';

    let filteredChats = [];

    if (searchQuery === '') {
        const chatsWithLastMessage = people.map(person => {
            const lastMessage = getLastMessage(person.id);
            return {
                person,
                message: lastMessage,
            };
        });
        filteredChats = chatsWithLastMessage;
    } else {
        const chatsWithAllMessages = people.map(person => {
            const allMessages = getAllMessages(person.id);
            return {
                person,
                messages: allMessages,
            };
        });

        const query = searchQuery.toLowerCase();

        filteredChats = chatsWithAllMessages
            .map(chat => {
                // return last message if matches with name or last matched message or null
                const nameMatch = chat.person.name.toLowerCase().includes(query);

                const matchingMessages = chat.messages.filter(message =>
                    message.text.toLowerCase().includes(query)
                );

                if (nameMatch) {
                    const lastMessage = getLastMessage(chat.person.id);
                    return {
                        person: chat.person,
                        lastMessage,
                    };
                } else if (matchingMessages.length > 0) {
                    const lastMatchingMessage = matchingMessages.reduce((latest, current) => {
                        return (!latest || current.timestamp > latest.timestamp) ? current : latest;
                    }, null);

                    return {
                        person: chat.person,
                        message: lastMatchingMessage,
                    };
                } else {
                    return null;
                }
            })
            .filter(chat => chat !== null);
    }

    // sort by time descending
    const sortedChats = filteredChats.sort((a, b) => {

        const timeA = a.message ? a.message.timestamp : 0;
        const timeB = b.message ? b.message.timestamp : 0;
        return timeB - timeA;
    });


    sortedChats.forEach(chat => {
        chatListDiv.appendChild(chatItem(chat));
    });
}
