import React, {useState, useContext, useRef} from 'react';
import styles from './MessageInput.module.scss';
import SendIcon from '@mui/icons-material/Send';
import AttachmentIcon from '@mui/icons-material/Attachment';
import CloseIcon from '@mui/icons-material/Close';
import {readFileAsDataURL} from "../../../utils/storage.js";
import {ErrorContext} from "../../../context/ErrorContext.jsx";

export const MessageInput = ({onSendMessage, active}) => {
    const attachedImageInputRef = useRef(null);
    const [messageText, setMessageText] = useState('');
    const [attachedImage, setAttachedImage] = useState(null);
    const {setError} = useContext(ErrorContext)

    const handleSubmit = (e) => {
        e.preventDefault();
        const trimmedMessage = messageText.trim();
        if (trimmedMessage || attachedImage) {
            onSendMessage({text: trimmedMessage, image: attachedImage})
            setMessageText('');
            setAttachedImage(null);
        }
    };

    const handleAttachmentChange = async (e) => {
        const file = e.target.files[0];
        let photoUrl = 'https://avatar.iran.liara.run/public';

        try {
            photoUrl = await readFileAsDataURL(file);
        } catch (error) {
            setError('Ошибка при загрузке фотографии.');
            return;
        }
        if (file) {
            setAttachedImage(photoUrl);
        }
    };

    const deleteAttachment = () => {
        setAttachedImage(null);
    }

    return (
        <div className={styles.inputContainer}>
            {
                attachedImage && (
                    <div className={styles.inputContainerAttachment}>
                        <img src={attachedImage} alt="" />
                        <button className={styles.inputContainerAttachmentClose} onClick={deleteAttachment}><CloseIcon sx={{ fontSize: 10 }}/></button>
                    </div>
                )
            }
            <div className={`${styles.formContainer} ${active ? '' : 'disabled'}`}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <input
                        ref={attachedImageInputRef}
                        accept="image/*"
                        style={{display: 'none'}}
                        id="attachment-input"
                        type="file"
                        onChange={handleAttachmentChange}
                        disabled={!active}
                    />
                    <label htmlFor="attachment-input">
                        <button
                            type="button"
                            className={styles.attachmentBtn}
                            aria-label="Attach Image"
                            onClick={() => attachedImageInputRef.current.click()}
                            disabled={!active}
                        >
                            <AttachmentIcon className="attachment-icon"/>
                        </button>
                    </label>
                    <input
                        className={styles.formInput}
                        type="text"
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        placeholder="Введите сообщение"
                        aria-label="Message input"
                        disabled={!active}
                    />

                    <button className={styles.sendBtn} type="submit" aria-label="Send Message" disabled={!active}>
                        <SendIcon className={`${styles.sendIcon} ${styles.white}`} fontSize={"medium"}/>
                    </button>
                </form>
            </div>
        </div>
    );
};
