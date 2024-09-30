import "./index.css"

const form = document.querySelector('.form');
const input = document.querySelector('.form-input');
const messagesList = document.querySelector('.messages-list');
import avatar from "./img/artem.jpg"

document.addEventListener('DOMContentLoaded', loadMessages);

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

function createMessageObject(text, type) {
    const senderName = 'Artem';
    const timeStamp = new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
    return {text, sender: senderName, time: timeStamp, type};
}

function saveMessage(message) {
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    messages.push(message);
    localStorage.setItem('messages', JSON.stringify(messages));
}

function addMessageToUI(message) {
    const messageItem = document.createElement('li');
    messageItem.classList.add(message.type);
    messageItem.innerHTML = `${message.text} <span class="time">${message.time}</span>`;
    messagesList.appendChild(messageItem);
}

function loadMessages() {
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    messages.forEach(addMessageToUI);
}

