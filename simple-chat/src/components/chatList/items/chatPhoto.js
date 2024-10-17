export function chatPhoto(person) {
    const chatItemPhotoDiv = document.createElement('div');
    chatItemPhotoDiv.classList.add('chat-item__photo');
    const img = `<img src="${person.photo}" alt="${person.name}">`;

    chatItemPhotoDiv.insertAdjacentHTML('afterbegin', img);

    return chatItemPhotoDiv;
}