export function chatInfo(person, lastMessage) {
    const lastMessageText = lastMessage ? lastMessage.text : '';

    const maxLength = 20;
    const displayText = lastMessageText.length > maxLength
        ? `${lastMessageText.slice(0, maxLength)}...`
        : lastMessageText;

    const chatItemInfoDiv = document.createElement('div');
    const content = `
        <div class="chat-item__info">
            <div class="chat-item__name">${person.name}</div>
        </div>
        <div class="chat-item__last-message">
            ${displayText}
        </div>
    `
    chatItemInfoDiv.insertAdjacentHTML('afterbegin', content);

    return chatItemInfoDiv
}