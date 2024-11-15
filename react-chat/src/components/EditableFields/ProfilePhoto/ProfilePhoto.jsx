import React, { useRef, useContext, useState, useEffect } from 'react';
import { ErrorContext } from "../../../context/ErrorContext.jsx";
import styles from './ProfilePhoto.module.scss';

export const ProfilePhoto = ({ person, setPerson }) => {
    const { setError } = useContext(ErrorContext);
    const fileInputRef = useRef(null);

    // State to hold the image source
    const [imageSrc, setImageSrc] = useState('https://placehold.co/400x400?text=Фото');

    // Effect to update imageSrc whenever person.avatar changes
    useEffect(() => {
        const getImage = async () => {
            if (typeof person.avatar === 'string') {
                // If avatar is a URL string
                setImageSrc(person.avatar);
            } else if (!person.avatar) {
                // If avatar is empty or undefined
                setImageSrc('https://placehold.co/400x400?text=Фото');
            } else if (!person.avatar.type.startsWith('image/')) {
                // If the file is not an image
                setError('Файл должен быть изображением.');
                setImageSrc('https://placehold.co/400x400?text=Фото');
            } else {
                // If avatar is a File object (image)
                try {
                    const reader = new FileReader();
                    reader.onload = (e) => setImageSrc(e.target.result);
                    reader.onerror = (e) => {
                        console.error('Error reading file:', e);
                        setImageSrc('https://placehold.co/400x400?text=Ошибка');
                    };
                    reader.readAsDataURL(person.avatar);
                } catch (error) {
                    console.error('Error reading file:', error);
                    setImageSrc('https://placehold.co/400x400?text=Ошибка');
                }
            }
        };

        getImage();
    }, [person.avatar, setError]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            if (!file.type.startsWith('image/')) {
                setError('Файл должен быть изображением.');
                return;
            }
            // Update person.avatar with the selected file
            setPerson({
                ...person,
                avatar: file,
            });
        }
    };

    return (
        <div className={styles.ProfilePhoto}>
            <div
                className={styles.ProfilePhotoPreview}
                onClick={() => fileInputRef.current.click()}
            >
                <div className={styles.ProfilePhotoContainer}>
                    <img src={imageSrc} alt="Profile Preview" />
                    <div
                        className={`${styles.ProfilePhotoContainerChange} ${styles.slideInBottom}`}
                    >
                        Изменить
                    </div>
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
