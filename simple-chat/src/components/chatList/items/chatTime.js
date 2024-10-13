export function chatTime(lastMessage) {
    const lastMessageTime = lastMessage
        ? new Date(lastMessage.timestamp).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
        : '';

    const chatItemTimeDiv = document.createElement('div');
    chatItemTimeDiv.classList.add('chat-item__time');
    chatItemTimeDiv.textContent = lastMessageTime;

    return chatItemTimeDiv;
}