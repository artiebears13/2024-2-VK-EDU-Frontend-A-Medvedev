export function chatStatus(statusBadge) {
    const chatItemStatusDiv = document.createElement('div');
    chatItemStatusDiv.classList.add('chat-item__status');
    if (statusBadge) {
        chatItemStatusDiv.appendChild(statusBadge);
    }

    return chatItemStatusDiv;
}