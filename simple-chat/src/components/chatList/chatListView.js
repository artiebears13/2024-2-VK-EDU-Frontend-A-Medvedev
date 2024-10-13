import {chatListHeader} from "./header/chatListHeader";
import {createCreateChatModal} from "./createChatModal/createChatModal";
import {createChatButton} from "./createChatButton/createChatButton";
import {chatList} from "./chatList";
import {initializeModal} from "../modal/modal";

export function chatListView(app) {
    const header = chatListHeader(handleSearch);
    app.appendChild(header);

    const chatListView = document.createElement('div');
    chatListView.classList.add('chat-list-view');

    const chatListDiv = document.createElement('div');
    chatListDiv.id = 'chat-list';
    chatListView.appendChild(chatListDiv);

    const modal = createCreateChatModal();
    app.appendChild(modal);
    const addChatButton = createChatButton();
    chatListView.appendChild(addChatButton);

    app.appendChild(chatListView);

    chatList();
    initializeModal();

    addChatButton.addEventListener('click', () => {
        modal.style.display = 'block';
    });
}

let searchTimeout = null;

function handleSearch(query) {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        chatList(query);
    }, 300);
}