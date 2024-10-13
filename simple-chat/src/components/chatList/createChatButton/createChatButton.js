import './createChatButton.scss'

export function createChatButton() {

    const chatButton = document.createElement('button');
    chatButton.classList.add('create-chat-button');

    const addIcon = document.createElement('span');
    addIcon.classList.add('material-symbols-outlined');
    addIcon.textContent = 'add';
    chatButton.appendChild(addIcon);
    addIcon.classList.add('no-margin');
    return chatButton;
}
