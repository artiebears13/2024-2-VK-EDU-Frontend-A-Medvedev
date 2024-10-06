// src/index.js

import './index.css';
import { renderChatList } from './components/chatList/chatList.js';
import { initializeModal } from './components/modal/modal.js';

document.addEventListener('DOMContentLoaded', () => {
    renderChatList();
    initializeModal();
});
