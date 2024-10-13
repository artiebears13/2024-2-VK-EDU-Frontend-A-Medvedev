export function chatPhoto(person) {
    const chatItemPhotoDiv = document.createElement('div');
    chatItemPhotoDiv.classList.add('chat-item__photo');
    const img = document.createElement('img');
    img.src = person.photo;
    img.alt = person.name;
    chatItemPhotoDiv.appendChild(img);

    return chatItemPhotoDiv;
}