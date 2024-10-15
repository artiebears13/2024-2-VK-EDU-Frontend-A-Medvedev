import {initializeChatWindow} from "./chatWindow";

export function chatWindowView(app, chatId) {
    const header = document.createElement('div');
    const fragment = document.createDocumentFragment();
    header.classList.add('header');

    const chatContainer = document.createElement('div');
    chatContainer.classList.add('chat-container');

    const messagesContainer = document.createElement('div');
    messagesContainer.classList.add('messages-container');

    const backgroundImages = document.createElement('div');
    backgroundImages.classList.add('background-images');

    const messagesList = document.createElement('ul');
    messagesList.classList.add('messages-list');

    const formContainer = document.createElement('div');
    formContainer.classList.add('form-container');

    const form = document.createElement('form');
    form.classList.add('form');
    form.action = '#';

    const input = document.createElement('input');
    input.classList.add('form-input');
    input.name = 'message-text';
    input.placeholder = 'Введите сообщение';
    input.type = 'text';

    const sendButton = document.createElement('button');
    sendButton.classList.add('send-btn');
    sendButton.type = 'submit';

    const sendIcon = document.createElement('span');
    sendIcon.classList.add('material-symbols-outlined', 'white');
    sendIcon.textContent = 'send';
    sendButton.appendChild(sendIcon);

    form.append(input, sendButton);
    formContainer.appendChild(form);
    messagesContainer.append(backgroundImages, messagesList);
    chatContainer.append(messagesContainer, formContainer);
    fragment.append(header, chatContainer);

    app.appendChild(fragment);

    initializeChatWindow(chatId, form, input, messagesList);
}