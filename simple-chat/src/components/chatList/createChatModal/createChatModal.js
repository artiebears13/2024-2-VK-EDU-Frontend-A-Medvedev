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

    const confirmButton = document.createElement('button');
    confirmButton.id = 'create-chat-confirm';
    confirmButton.textContent = 'OK';

    modalContent.appendChild(closeButton);
    modalContent.appendChild(heading);
    modalContent.appendChild(input);
    modalContent.appendChild(confirmButton);
    modal.appendChild(modalContent);

    return modal;
}