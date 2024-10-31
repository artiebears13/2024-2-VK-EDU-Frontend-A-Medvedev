// ProfilePhoto.jsx
import React, { useState, useRef, useContext } from 'react';
import {ErrorContext} from "../../../context/ErrorContext.jsx";
import './ProfilePhoto.scss'
import {readFileAsDataURL} from "../../../utils/storage.js";

export const ProfilePhoto = ( {selfPerson, setSelfPerson} ) => {
    const { setError } = useContext(ErrorContext);
    const [photoPreview, setPhotoPreview] = useState(selfPerson.photo || 'https://avatar.iran.liara.run/public');
    const fileInputRef = useRef(null);

    const handleFileChange = async (event) => {
        console.log("new photo")
        const file = event.target.files[0];
        const photoURL = await readFileAsDataURL(file)
        if (file) {
            if (!file.type.startsWith('image/')) {
                setError('Файл должен быть изображением.');
                return;
            }
            const reader = new FileReader();
            reader.onload = (e) => {
                setPhotoPreview(e.target.result);
                setSelfPerson((prev) => ({
                    ...prev,
                    photo: photoURL,
                }));
                localStorage.setItem('user', JSON.stringify({...selfPerson, photo: e.target.result}));
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="profile-photo">
            <div className="profile-photo-preview" onClick={() => fileInputRef.current.click()}>
                <div className="profile-photo-container">
                <img src={photoPreview} alt="Profile Preview" />
                    <div className="profile-photo-container-change slide-in-bottom">Изменить</div>
                </div>
            </div>
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
            />
        </div>
    );
};
