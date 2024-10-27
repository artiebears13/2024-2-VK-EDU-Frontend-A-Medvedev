import React, { useState, useContext, useEffect, useRef } from 'react';
import './CreateChatModal.scss';
import { useNavigate } from "react-router-dom";
import { ChatContext } from '../../../context/ChatContext.jsx';
import { v4 as uuidv4 } from 'uuid';
import {ErrorContext} from "../../../context/ErrorContext.jsx";
import {readFileAsDataURL} from "../../../utils/storage.js";

export const CreateChatModal = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const { persons, addPerson, setChatId } = useContext(ChatContext);
    const [personName, setPersonName] = useState('');
    const [personPhoto, setPersonPhoto] = useState(null);
    const [photoPreview, setPhotoPreview] = useState('');
    const fileInputRef = useRef(null);
    const {setError} = useContext(ErrorContext)

    useEffect(() => {
        if (isOpen) {
            setPersonName('');
            setPersonPhoto(null);
            setPhotoPreview('');
        }
    }, [isOpen]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                setError('Файл должен быть изображением.');
                return;
            }
            const reader = new FileReader();
            reader.onload = (e) => {
                setPhotoPreview(e.target.result);
                setPersonPhoto(file);
            };
            reader.readAsDataURL(file);
        }
    };



    const handleCreateChat = async () => {
        const newPersonName = personName.trim();

        if (!newPersonName) {
            setError('Пожалуйста, введите имя пользователя.');
            return;
        }

        const existingPerson = persons.find(
            person => person.name.toLowerCase() === newPersonName.toLowerCase()
        );

        if (existingPerson) {
            setError('Пользователь с таким именем уже существует.');
            return;
        }

        let photoUrl = 'https://avatar.iran.liara.run/public';

        if (personPhoto) {
            try {
                photoUrl = await readFileAsDataURL(personPhoto);
            } catch (error) {
                setError('Ошибка при загрузке фотографии.');
                return;
            }
        }

        const newPerson = {
            id: uuidv4(),
            name: newPersonName,
            photo: photoUrl,
        };

        try {
            addPerson(newPerson);
        } catch (e) {
            setError('Ошибка при создании чата.');
            return;
        }

        onClose();
        navigate(`/chat/${newPerson.id}`);
    };

    if (!isOpen) return null;

    return (
        <div className={`modal ${isOpen ? 'show' : ''}`}>
            <div className="modal-content">
                <span className="close-button" onClick={onClose}>&times;</span>
                <h2>Создать новый чат</h2>

                <div className="photo-preview" onClick={() => fileInputRef.current.click()}>
                    {photoPreview ? (
                        <img src={photoPreview} alt="Превью фотографии" />
                    ) : (
                        <p>Загрузить фото</p>
                    )}
                </div>

                {/*hidden*/}
                <input
                    ref={fileInputRef}
                    type="file"
                    className="new-person-photo"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                />

                <input
                    type="text"
                    className="new-person-name"
                    value={personName}
                    onChange={(e) => setPersonName(e.target.value)}
                    placeholder="Имя пользователя"
                />


                <button id="create-chat-confirm" onClick={handleCreateChat}>
                    OK
                </button>
            </div>
        </div>
    );
};
