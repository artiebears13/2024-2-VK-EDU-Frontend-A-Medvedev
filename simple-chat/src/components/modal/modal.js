import './modal.css'

import { loadPeople } from '../../utils/storage.js';

// init new chat modal
export function initializeModal() {
    const createChatButton = document.querySelector('.create-chat-button');
    const modal = document.getElementById('create-chat-modal');
    const closeButton = document.querySelector('.close-button');
    const createChatConfirm = document.getElementById('create-chat-confirm');
    const newNameInput = document.getElementById('new-person-name');

    createChatButton.addEventListener('click', () => openModal(modal));
    closeButton.addEventListener('click', () => closeModal(modal, newNameInput));
    window.addEventListener('click', event => {
        if (event.target === modal) {
            closeModal(modal, newNameInput);
        }
    });

    createChatConfirm.addEventListener('click', () => {
        handleCreateChat(newNameInput, modal);
    });
}

function openModal(modal) {
    modal.style.display = 'block';
}

function closeModal(modal, inputField) {
    modal.style.display = 'none';
    inputField.value = '';
}

function handleCreateChat(newNameInput, modal) {
    const newPersonName = newNameInput.value.trim();
    let people = loadPeople();

    if (newPersonName !== '') {
        const existingPerson = people.find(
            person => person.name.toLowerCase() === newPersonName.toLowerCase()
        );
        if (existingPerson) {
            alert('Пользователь с таким именем уже существует.');
            return;
        }

        const newPerson = {
            id: Date.now().toString(),
            name: newPersonName,
            photo: 'https://picsum.photos/50/50',
        };

        people.push(newPerson);
        localStorage.setItem('people', JSON.stringify(people));

        closeModal(modal, newNameInput);

        location.reload();

        window.location.href = `chat.html?id=${newPerson.id}`; // to be refactored in spa
    } else {
        alert('Пожалуйста, введите имя пользователя.');
    }
}
