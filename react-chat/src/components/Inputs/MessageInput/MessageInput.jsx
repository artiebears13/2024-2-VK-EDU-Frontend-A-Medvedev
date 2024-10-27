import React, {useState, useContext, useRef} from 'react';
import './MessageInput.scss';
import SendIcon from '@mui/icons-material/Send';
import AttachmentIcon from '@mui/icons-material/Attachment';
import CloseIcon from '@mui/icons-material/Close';
import {readFileAsDataURL} from "../../../utils/storage.js";
import {ErrorContext} from "../../../context/ErrorContext.jsx";

export const MessageInput = ({onSendMessage}) => {
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
        <div className="input-container">
            {
                attachedImage && (
                    <div className="input-container__attachment">
                        <img src={attachedImage} alt="" />
                        <button className="input-container__attachment-close" onClick={deleteAttachment}><CloseIcon sx={{ fontSize: 10 }}/></button>
                    </div>
                )
            }
            <div className="form-container">
                <form className="form" onSubmit={handleSubmit}>
                    <input
                        ref={attachedImageInputRef}
                        accept="image/*"
                        style={{display: 'none'}}
                        id="attachment-input"
                        type="file"
                        onChange={handleAttachmentChange}
                    />
                    <label htmlFor="attachment-input">
                        <button
                            type="button"
                            className="attachment-btn"
                            aria-label="Attach Image"
                            onClick={() => attachedImageInputRef.current.click()}
                        >
                            <AttachmentIcon className="attachment-icon"/>
                        </button>
                    </label>
                    <input
                        className="form-input"
                        type="text"
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        placeholder="Введите сообщение"
                        aria-label="Message input"
                    />

                    <button className="send-btn" type="submit" aria-label="Send Message">
                        <SendIcon className="send-icon white" fontSize={"small"}/>
                    </button>
                </form>
            </div>
        </div>
    );
};
