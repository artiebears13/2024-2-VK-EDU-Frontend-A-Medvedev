import './createChatButton.scss'

export function createChatButton() {

    const chatButton = document.createElement('button');
    chatButton.classList.add('create-chat-button');

    const addIcon = `<span class="material-symbols-outlined" style="margin: 0">add</span>`;
    chatButton.insertAdjacentHTML('afterbegin', addIcon);
    return chatButton;
}
