import React, {useContext} from 'react';
import styles from './PageChatHeader.module.scss';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {ChatContext} from "../../../context/ChatContext.jsx";
import {useNavigate} from "react-router-dom";

export const PageChatHeader = ({ chatId, openEditPersonModal }) => {
    const navigate = useNavigate();
    const { persons } = useContext(ChatContext);

    const person = persons.find(p => p.id === chatId);

    return (
        <div className={styles.header}>
            <button className={styles.backButton} onClick={() => navigate(`/`)}>
                <ArrowBackIosIcon className={styles.white}>arrow_back_ios</ArrowBackIosIcon>
            </button>
            <div className={styles.receiver}>
                <span className={styles.receiverName} onClick={openEditPersonModal}>{person? person.name : "Не найдено"}</span>
                <div className={styles.receiverPhoto} onClick={openEditPersonModal}>
                    {person && <img src={person.photo} alt={person.name} className={styles.receiverPhotoImage} />}
                </div>
            </div>
        </div>
    );
};
