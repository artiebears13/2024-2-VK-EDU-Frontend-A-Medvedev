// components/chatWindow/chatWindow.js

import './chatWindow.scss';
import {createMessageObject, saveMessage, markReceivedMessagesAsRead, loadPeople} from '../../utils/storage.js';
import {closeChat} from '../../index.js';
import {answerMock} from "../../mocks/__mocks__";

export function initializeChatWindow(chatId, form, input, messagesList) {
    fillHeader(chatId);

    loadMessages(chatId, messagesList);

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const messageText = input.value.trim();

        if (messageText) {
            const message = createMessageObject(messageText, 'sent');
            saveMessage(chatId, message);
            addMessageToUI(message, messagesList, true);
            input.value = '';
            setTimeout(() => {
                const randomMessage = Math.floor(Math.random() * 100 / 10);
                simulateReceivedMessage(chatId, answerMock[randomMessage], messagesList);
            }, 2000);
        }
    });
}

function fillHeader(chatId) {
    const header = document.querySelector('.header');
    const people = loadPeople();
    const person = people.find(p => p.id === chatId);

    if (person) {
        const receiverDiv = document.createElement('div');
        receiverDiv.classList.add('receiver');

        const backButton = document.createElement('button');
        backButton.classList.add('material-symbols-outlined', 'back-button', 'white');
        backButton.textContent = 'arrow_back_ios';
        backButton.onclick = () => {
            closeChat();
        };

        const receiverNameSpan = `<span class="receiver-name white">${person.name}</span>`;

        const receiverPhotoDiv = `<div class="receiver-photo"><img 
            class="receiver-photo__image" 
            src="${person.photo}" 
            width="50px" 
            height="50px" 
            alt="profile"
        /></div>`

        receiverDiv.appendChild(backButton)
        receiverDiv.insertAdjacentHTML("beforeend", `${receiverNameSpan} ${receiverPhotoDiv}`);
        header.appendChild(receiverDiv);
    } else {
        console.error('Пользователь не найден для chatId:', chatId);
    }
}

function getMessageId(chatId, id) {
    return `${chatId}.message_${id}`;
}

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

    const element = document.querySelector('.foundMessage');
    if (element) {
        element.scrollIntoView({behavior: 'smooth', block: 'center'});
    }
}

function addMessageToUI(message, messagesList, animate = false) {
    const messageItem = document.createElement('li');
    messageItem.classList.add('message-item', message.direction);
    if (animate) {
        messageItem.classList.add('scale-in-center')
    }
    if (message.messageId === +localStorage.getItem('to_message')) {
        messageItem.classList.add("foundMessage");
    }

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

    const messageText = document.createElement('span');
    messageText.textContent = message.text;

    messageItem.appendChild(messageText);
    if (statusIcon) messageItem.appendChild(statusIcon);
    messageItem.appendChild(timeSpan);

    messagesList.appendChild(messageItem);

    messagesList.parentElement.scrollTop = messagesList.parentElement.scrollHeight;
}

function simulateReceivedMessage(chatId, text, messagesList) {
    const message = createMessageObject(text, 'received');
    saveMessage(chatId, message);
    addMessageToUI(message, messagesList, true);
}
