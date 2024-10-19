export function createCreateChatModal() {
    const modal = document.createElement('div');
    modal.id = 'create-chat-modal';
    modal.classList.add('modal');

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    const closeButton = document.createElement('span');
    closeButton.classList.add('close-button');
    closeButton.innerHTML = '&times;';

    const heading = document.createElement('h2');
    heading.textContent = 'Создать новый чат';

    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'new-person-name';
    input.placeholder = 'Имя пользователя';

    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.id = 'new-person-photo';
    fileInput.accept = 'image/*';
    fileInput.style.display = 'none'; // Скрываем поле

    const photoPreview = document.createElement('div');
    photoPreview.id = 'photo-preview';
    photoPreview.classList.add('photo-preview');

    const confirmButton = document.createElement('button');
    confirmButton.id = 'create-chat-confirm';
    confirmButton.textContent = 'OK';

    modalContent.append(closeButton, heading, photoPreview, input, confirmButton, fileInput);
    modal.appendChild(modalContent);

    return modal;
}
