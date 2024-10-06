import './chatList.css'

import { loadPeople, getLastMessage, markReceivedMessagesAsRead } from '../../utils/storage.js';

export function renderChatList() {
    let people = loadPeople();

    const chatListDiv = document.getElementById('chat-list');
    chatListDiv.innerHTML = ''; // Clear existing content

    // вытаскиваем последнее сообщение
    const chatsWithLastMessage = people.map(person => {
        const lastMessage = getLastMessage(person.id);
        return {
            person,
            lastMessage,
        };
    });

    // сортировка по времени
    chatsWithLastMessage.sort((a, b) => {
        const timeA = a.lastMessage ? a.lastMessage.timestamp : 0;
        const timeB = b.lastMessage ? b.lastMessage.timestamp : 0;
        return timeB - timeA;
    });

    // добавляем сообщения
    chatsWithLastMessage.forEach(chat => {
        const chatItem = createChatItem(chat);
        chatListDiv.appendChild(chatItem);
    });
}

function createChatItem({ person, lastMessage }) {
    const chatItem = document.createElement('div');
    chatItem.classList.add('chat-item');

    // создаем компоненты
    const statusBadge = createStatusBadge(lastMessage);
    const chatItemPhotoDiv = createChatItemPhotoDiv(person);
    const chatItemInfoDiv = createChatItemInfoDiv(person, lastMessage);
    const chatItemStatusDiv = createChatItemStatusDiv(statusBadge);
    const chatItemTimeDiv = createChatItemTimeDiv(lastMessage)

    chatItem.appendChild(chatItemPhotoDiv);
    chatItem.appendChild(chatItemInfoDiv);
    chatItem.appendChild(chatItemStatusDiv);
    chatItem.appendChild(chatItemTimeDiv);

    // переход к чату
    chatItem.addEventListener('click', () => {
        markReceivedMessagesAsRead(person.id);
        window.location.href = `chat.html?id=${person.id}`;
    });

    return chatItem;
}

// статус сообщения
function createStatusBadge(lastMessage){

    let statusBadge = null;

    if (lastMessage) {
        if (lastMessage.direction === 'received' && lastMessage.readStatus === 'unread') {
            const unreadCountDiv = document.createElement('div');
            unreadCountDiv.classList.add('unread-count');
            unreadCountDiv.textContent = '1';
            statusBadge = unreadCountDiv;
        } else if (lastMessage.direction === 'sent') {
            const statusIconSpan = document.createElement('span');
            statusIconSpan.classList.add('material-symbols-outlined');
            if (lastMessage.readStatus === 'unread') {
                statusIconSpan.classList.add('message-status-icon');
                statusIconSpan.textContent = 'check';
            } else if (lastMessage.readStatus === 'read') {
                statusIconSpan.textContent = 'done_all';
            }
            statusBadge = statusIconSpan;
        }

    }
    return statusBadge;
}

// аватарка
function createChatItemPhotoDiv(person){
    const chatItemPhotoDiv = document.createElement('div');
    chatItemPhotoDiv.classList.add('chat-item-photo');
    const img = document.createElement('img');
    img.src = person.photo;
    img.alt = person.name;
    chatItemPhotoDiv.appendChild(img);

    return chatItemPhotoDiv;
}

// имя + текст сообщения
function createChatItemInfoDiv(person, lastMessage){
    const lastMessageText = lastMessage ? lastMessage.text : '';

    const chatItemInfoDiv = document.createElement('div');
    chatItemInfoDiv.classList.add('chat-item-info');

    const chatItemNameDiv = document.createElement('div');
    chatItemNameDiv.classList.add('chat-item-name');

    const nameSpan = document.createElement('span');
    nameSpan.textContent = person.name;

    const chatItemLastMessageDiv = document.createElement('div');
    chatItemLastMessageDiv.classList.add('chat-item-last-message');
    chatItemLastMessageDiv.textContent = lastMessageText;

    chatItemNameDiv.appendChild(nameSpan);
    chatItemInfoDiv.appendChild(chatItemNameDiv);
    chatItemInfoDiv.appendChild(chatItemLastMessageDiv);

    return chatItemInfoDiv
}

//контейнер статуса чата
function createChatItemStatusDiv(statusBadge){
    const chatItemStatusDiv = document.createElement('div');
    chatItemStatusDiv.classList.add('chat-item-status');
    if (statusBadge) {
        chatItemStatusDiv.appendChild(statusBadge);
    }

    return chatItemStatusDiv;
}

// время сообщения
function createChatItemTimeDiv(lastMessage){
    const lastMessageTime = lastMessage
        ? new Date(lastMessage.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        : '';

    const chatItemTimeDiv = document.createElement('div');
    chatItemTimeDiv.classList.add('chat-item-time');
    chatItemTimeDiv.textContent = lastMessageTime;

    return chatItemTimeDiv;
}
