import React, { useState, useContext, useEffect, useRef } from 'react';
import styles from './CreateChatModal.module.scss';
import { useNavigate } from "react-router-dom";
import { ChatContext } from '../../../context/ChatContext.jsx';
import { v4 as uuidv4 } from 'uuid';
import {ErrorContext} from "../../../context/ErrorContext.jsx";
import {readFileAsDataURL} from "../../../utils/storage.js";
import {RecommendedUser} from "./RecommendedUser.jsx";
import {getUsers} from "../../../api/users.js";
import {createChat} from "../../../api/chats.js";

export const CreatePersonalChatModal = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const { persons, user, setChatId } = useContext(ChatContext);
    const [personName, setPersonName] = useState('');
    const [personPhoto, setPersonPhoto] = useState(null);
    const [photoPreview, setPhotoPreview] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [recommendedUsers, setRecommendedUsers] = useState([]);
    const fileInputRef = useRef(null);
    const {setError} = useContext(ErrorContext)
    // getUsers(1, 5).then(res => setRecommendedUsers(res.results));



    const onNameInput = (e) => {
        if (e.target.value !== searchQuery) {
            setSearchQuery(e.target.value);
            getUsers(1, 5, e.target.value)
                .then(
                    res => setRecommendedUsers(res.results)
                )
        }

    }

    useEffect(() => {
        if (isOpen) {
            setPersonName('');
            setPersonPhoto(null);
            setPhotoPreview('');
            getUsers(1, 5).then(res => setRecommendedUsers(res.results));
        }
    }, [isOpen]);

    const createPersonalChat = (member) => {

        const params = {
            members: [member.id],
            is_private: true,
            creator: user
        }
        createChat(params).then(res => {
            navigate(`/chat/${res.id}`);
            }
        ).catch((err) => {
            setError(err.message);
        })
    }



    if (!isOpen) return null;

    return (
        <div className={`${styles.modal}`} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <span className={styles.closeButton} onClick={onClose}>&times;</span>
                <h2>Создать новый чат</h2>



                <input
                    type="text"
                    className={styles.newPersonName}
                    value={searchQuery}
                    onChange={onNameInput}
                    placeholder="Имя пользователя"
                />
                <RecommendedUser users={recommendedUsers} createChat={createPersonalChat}/>

            </div>
        </div>
    );
};
