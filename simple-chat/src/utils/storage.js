import { initialPeople } from '../mocks/__mocks__.js';

// load from localStorage
export function loadPeople() {
    const storedPeople = JSON.parse(localStorage.getItem('people'));
    if (storedPeople && Array.isArray(storedPeople)) {
        return storedPeople;
    } else {
        localStorage.setItem('people', JSON.stringify(initialPeople));
        return initialPeople;
    }
}

export function getLastMessage(personId) {
    const lastMessageId = localStorage.getItem(`${personId}.lastMessageId`);
    if (lastMessageId) {
        return JSON.parse(localStorage.getItem(`${personId}.message_${lastMessageId}`));
    }
    return null;
}

export function markReceivedMessagesAsRead(personId) {
    const lastMessageId = parseInt(localStorage.getItem(`${personId}.lastMessageId`));
    if (lastMessageId) {
        const messageKey = `${personId}.message_${lastMessageId}`;
        const message = JSON.parse(localStorage.getItem(messageKey));
        if (message && message.direction === 'received' && message.readStatus === 'unread') {
            message.readStatus = 'read';
            localStorage.setItem(messageKey, JSON.stringify(message));
        }
    }
}

export function createMessageObject(text, direction) {
    const timeStamp = new Date();

    return {
        id: Date.now().toString(),
        text,
        timestamp: timeStamp.getTime(),
        direction,
        readStatus: 'unread'
    };
}

export function saveMessage(chatId, message) {
    let lastMessageId = parseInt(localStorage.getItem(`${chatId}.lastMessageId`)) || 0;
    lastMessageId += 1;
    localStorage.setItem(`${chatId}.message_${lastMessageId}`, JSON.stringify(message));
    localStorage.setItem(`${chatId}.lastMessageId`, `${lastMessageId}`);
}
