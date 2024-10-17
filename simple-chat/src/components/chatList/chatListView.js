import {chatListHeader} from "./header/chatListHeader";
import {createCreateChatModal} from "./createChatModal/createChatModal";
import {createChatButton} from "./createChatButton/createChatButton";
import {chatList} from "./chatList";
import {initializeModal} from "../modal/modal";
import {handleSearch} from "../../utils/search";

export function chatListView(app) {
    const fragment = document.createDocumentFragment();

    const chatListView = document.createElement('div');
    chatListView.classList.add('chat-list-view');

    const chatListDiv = document.createElement('div');
    chatListDiv.id = 'chat-list';

    const modal = createCreateChatModal();
    const addChatButton = createChatButton();

    chatListView.append(chatListDiv, addChatButton);
    fragment.append(
        chatListHeader(handleSearch),
        createCreateChatModal(),
        chatListView
    );
    app.appendChild(fragment)

    chatList();
    initializeModal();

    addChatButton.addEventListener('click', () => {
        modal.style.display = 'block';
    });
}



