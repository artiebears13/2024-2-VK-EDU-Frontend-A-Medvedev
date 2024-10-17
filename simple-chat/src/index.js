import './index.scss';
import {chatListView} from "./components/chatList/chatListView";
import {chatWindowView} from "./components/chatWindow/chatWindowView";

function renderApp() {
    const app = document.getElementById('app');
    const theme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', theme);

    app.innerHTML = '';

    const currentChatId = localStorage.getItem('currentChatId');
    if (currentChatId) {
        chatWindowView(app, currentChatId);
    } else {
        chatListView(app);
    }
}

export function openChat(chatId, message = null) {
    localStorage.setItem('currentChatId', chatId);
    if (message) {
        localStorage.setItem('to_message', message.messageId);
    }
    renderApp();
}

export function closeChat() {
    localStorage.removeItem('currentChatId');
    renderApp();
    localStorage.setItem('to_message', null);

}


document.addEventListener('DOMContentLoaded', () => {
    renderApp();
});
