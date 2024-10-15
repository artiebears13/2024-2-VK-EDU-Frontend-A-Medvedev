import './modal.scss'

import {loadPeople} from '../../utils/storage.js';
import {openChat} from "../../index";

// window of creating new chat
export function initializeModal() {
    const createChatButton = document.querySelector('.create-chat-button');
    const modal = document.getElementById('create-chat-modal');
    const closeButton = document.querySelector('.close-button');
    const createChatConfirm = document.getElementById('create-chat-confirm');
    const newNameInput = document.getElementById('new-person-name');
    const photoPreview = modal.querySelector('#photo-preview');
    const fileInput = modal.querySelector('#new-person-photo');

    createChatButton.addEventListener('click', () => openModal(modal));
    closeButton.addEventListener('click', () => closeModal(modal, newNameInput));
    window.addEventListener('click', event => {
        if (event.target === modal) {
            closeModal(modal);
        }
    });

    createChatConfirm.addEventListener('click', () => {
        handleCreateChat(newNameInput, modal);
    });

    modal.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            handleCreateChat(newNameInput, modal);
        }
    })
    photoPreview.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', (event) => {
        if (fileInput.files && fileInput.files[0]) {
            const reader = new FileReader();
            reader.onload = function (e) {
                photoPreview.style.backgroundImage = `url(${e.target.result})`;
                photoPreview.classList.add('has-image');
            };
            reader.readAsDataURL(fileInput.files[0]);
        }
    });
}

function openModal(modal) {
    modal.style.display = 'block';
}

function closeModal(modal) {
    modal.style.display = 'none';
    const inputs = modal.querySelectorAll('input');
    inputs.forEach(input => input.value = '');

    const photoPreview = modal.querySelector('#photo-preview');
    photoPreview.style.backgroundImage = '';
    photoPreview.classList.remove('has-image');

    const fileInput = modal.querySelector('#new-person-photo');
    fileInput.value = '';
}


function handleCreateChat(newNameInput, modal) {
    const newPersonName = newNameInput.value.trim();
    const fileInput = document.getElementById('new-person-photo');
    const selectedFile = fileInput.files[0]; // Получаем выбранный файл
    let people = loadPeople();

    if (newPersonName === '') {
        alert('Пожалуйста, введите имя пользователя.');
        return;
    }

    const existingPerson = people.find(
        person => person.name.toLowerCase() === newPersonName.toLowerCase()
    );
    if (existingPerson) {
        alert('Пользователь с таким именем уже существует.');
        return;
    }

    const createNewPerson = (photoUrl) => {
        const newPerson = {
            id: Date.now().toString(),
            name: newPersonName,
            photo: photoUrl,
        };

        people.push(newPerson);
        try {
            localStorage.setItem('people', JSON.stringify(people));
        } catch (e) {
            if (e.code === 22) {
                alert('Локальное хранилище заполнено. Невозможно сохранить данные.');
                return
            }
        }

        closeModal(modal, newNameInput);
        openChat(newPerson.id);
    };

    if (selectedFile) {
        const reader = new FileReader();
        reader.onload = function (event) {
            createNewPerson(event.target.result);
        };
        reader.readAsDataURL(selectedFile);
    } else {
        // default pic
        createNewPerson('https://picsum.photos/50/50?random=2');
    }
}
