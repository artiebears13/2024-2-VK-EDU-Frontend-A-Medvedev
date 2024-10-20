import './chatWindow.css'


import {createMessageObject, saveMessage, markReceivedMessagesAsRead, loadPeople} from '../../utils/storage.js';


export function initializeChatWindow() {
    // парсим URL
    const urlParams = new URLSearchParams(window.location.search);
    const chatId = urlParams.get('id');

    const form = document.querySelector('.form');
    const input = document.querySelector('.form-input');
    const messagesList = document.querySelector('.messages-list');

    fillHeader(chatId);

    document.addEventListener('DOMContentLoaded', () => loadMessages(chatId, messagesList));

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const messageText = input.value.trim();

        if (messageText) {
            const message = createMessageObject(messageText, 'sent');
            saveMessage(chatId, message);
            addMessageToUI(message, messagesList);
            input.value = '';
        }
    });

    setTimeout(() => {
        simulateReceivedMessage(chatId, 'Привет) как дела?', messagesList);
    }, 5000);
}

function fillHeader(chatId) {
    const header = document.querySelector('.header');
    const people = loadPeople();
    const person = people.find(p => p.id === chatId);

    if (person) {
        header.innerHTML = '';

        const receiverDiv = document.createElement('div');
        receiverDiv.classList.add('receiver');

        const backButton = document.createElement('button');
        backButton.classList.add('material-symbols-outlined', 'back-button', 'white');
        backButton.textContent = 'arrow_back_ios';
        backButton.onclick = () => {window.history.back()}

        const receiverNameSpan = document.createElement('span');
        receiverNameSpan.classList.add('receiver-name', 'white');
        receiverNameSpan.textContent = person.name;

        const receiverPhotoDiv = document.createElement('div');
        receiverPhotoDiv.classList.add('receiver-photo');

        const receiverPhotoImg = document.createElement('img');
        receiverPhotoImg.classList.add('receiver-photo__image');
        receiverPhotoImg.src = person.photo;
        receiverPhotoImg.width = 50;
        receiverPhotoImg.height = 50;
        receiverPhotoImg.alt = 'profile photo';

        receiverPhotoDiv.appendChild(receiverPhotoImg);
        receiverDiv.appendChild(backButton);
        receiverDiv.appendChild(receiverNameSpan);
        receiverDiv.appendChild(receiverPhotoDiv);
        header.appendChild(receiverDiv);
    } else {
        console.error('Пользователь не найден для chatId:', chatId);
    }
}

function getMessageId(chatId, id) {
    return `${chatId}.message_${id}`;
}

// подгрузка сообщений
function loadMessages(chatId, messagesList) {
    let lastMessageId = 0;
    if (localStorage.getItem(`${chatId}.lastMessageId`) !== null) {
        lastMessageId = parseInt(localStorage.getItem(`${chatId}.lastMessageId`));
    }
    for (let i = 1; i <= lastMessageId; i++) {
        const messageKey = getMessageId(chatId, i);
        const messageData = localStorage.getItem(messageKey);
        if (messageData) {
            const message = JSON.parse(messageData);
            addMessageToUI(message, messagesList);
        }
    }

    markReceivedMessagesAsRead(chatId);
}

// добавляем пузырек сообщения
function addMessageToUI(message, messagesList) {
    const messageItem = document.createElement('li');
    messageItem.classList.add('message-item', message.direction);

    const timeSpan = document.createElement('span');
    timeSpan.classList.add('time');
    timeSpan.textContent = new Date(message.timestamp).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});

    let statusIcon = null;
    if (message.direction === 'sent') {
        statusIcon = document.createElement('span');
        statusIcon.classList.add('material-symbols-outlined');
        if (message.readStatus === 'unread') {
            statusIcon.textContent = 'check';
        } else if (message.readStatus === 'read') {
            statusIcon.textContent = 'done_all';
        }
    }

    messageItem.textContent = message.text;
    if (statusIcon) messageItem.appendChild(statusIcon);
    messageItem.appendChild(timeSpan);

    messagesList.appendChild(messageItem);
}

function simulateReceivedMessage(chatId, text, messagesList) {
    const message = createMessageObject(text, 'received');
    saveMessage(chatId, message);
    addMessageToUI(message, messagesList);
}
