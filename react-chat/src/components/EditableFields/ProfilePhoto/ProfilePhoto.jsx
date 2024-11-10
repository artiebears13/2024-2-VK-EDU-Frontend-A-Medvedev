import React, { useRef, useContext } from 'react';
import {ErrorContext} from "../../../context/ErrorContext.jsx";
import styles from './ProfilePhoto.module.scss'
import {readFileAsDataURL} from "../../../utils/storage.js";

export const ProfilePhoto = ( {person, setPerson} ) => {
    console.log({person})
    const { setError } = useContext(ErrorContext);
    const fileInputRef = useRef(null);

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        const photoURL = await readFileAsDataURL(file)
        if (file) {
            if (!file.type.startsWith('image/')) {
                setError('Файл должен быть изображением.');
                return;
            }
            const reader = new FileReader();
            reader.onload = (e) => {
                setPerson({ photo: photoURL });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className={styles.ProfilePhoto}>
            <div className={styles.ProfilePhotoPreview} onClick={() => fileInputRef.current.click()}>
                <div className={styles.ProfilePhotoContainer}>
                <img src={person.photo} alt="Profile Preview" />
                    <div className={`${styles.ProfilePhotoContainerChange} ${styles.slideInBottom}`}>Изменить</div>
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
