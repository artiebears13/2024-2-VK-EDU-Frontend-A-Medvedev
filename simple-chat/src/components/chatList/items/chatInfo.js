export function chatInfo(person, lastMessage) {
    const lastMessageText = lastMessage ? lastMessage.text : '';

    const chatItemInfoDiv = document.createElement('div');
    chatItemInfoDiv.classList.add('chat-item__info');

    const chatItemNameDiv = document.createElement('div');
    chatItemNameDiv.classList.add('chat-item__name');

    const nameSpan = document.createElement('span');
    nameSpan.textContent = person.name;

    const chatItemLastMessageDiv = document.createElement('div');
    chatItemLastMessageDiv.classList.add('chat-item__last-message');
    const maxLength = 20;
    const displayText = lastMessageText.length > maxLength
        ? `${lastMessageText.slice(0, maxLength)}...`
        : lastMessageText;

    chatItemLastMessageDiv.textContent = displayText;


    chatItemNameDiv.appendChild(nameSpan);
    chatItemInfoDiv.appendChild(chatItemNameDiv);
    chatItemInfoDiv.appendChild(chatItemLastMessageDiv);

    return chatItemInfoDiv
}