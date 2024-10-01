import "./index.css"

const form = document.querySelector('.form');
const input = document.querySelector('.form-input');
const messagesList = document.querySelector('.messages-list');

document.addEventListener('DOMContentLoaded', loadMessages);
let lastMessageId = 0;

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const messageText = input.value.trim();

    if (messageText) {
        const message = createMessageObject(messageText, 'sent');
        saveMessage(message);
        addMessageToUI(message);
        input.value = '';
    }
});

function getMessageId(id) {
    return `message_${id}`
}

function createMessageObject(text, type) {
    const senderName = 'Artem';
    const timeStamp = new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
    return {text, sender: senderName, time: timeStamp, type};
}

function saveMessage(message) {
    lastMessageId += 1;
    localStorage.setItem(getMessageId(lastMessageId), JSON.stringify(message));
    localStorage.setItem('lastMessageId', lastMessageId);
}

function addMessageToUI(message) {
    const messageItem = document.createElement('li');
    messageItem.classList.add('message-item');
    const timeSpan = `<span class="time">${message.time}</span>`
    messageItem.classList.add(message.type);
    messageItem.insertAdjacentText('afterbegin', message.text);
    messageItem.insertAdjacentHTML('beforeend', timeSpan);
    messagesList.appendChild(messageItem);
}

function loadMessages() {
    if (localStorage.getItem('lastMessageId') !== null) {
        lastMessageId = +localStorage.getItem('lastMessageId');
    }
    for (let i = 0; i < localStorage.length; i++) {
        if (JSON.parse(localStorage.getItem(getMessageId(i))) !== null) {
            const message = JSON.parse(localStorage.getItem(getMessageId(i)));
            addMessageToUI(message);
        }
    }
}

