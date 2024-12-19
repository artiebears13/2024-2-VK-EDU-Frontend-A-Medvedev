import React, {useContext} from 'react';
import styles from './PageChatHeader.module.scss';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {useNavigate} from "react-router-dom";

export const PageChatHeader = ({ chat, openEditChatModal }) => {
    const navigate = useNavigate();


    return (
        <div className={styles.header}>
            <button className={styles.backButton} onClick={() => navigate(`/`)}>
                <ArrowBackIosIcon className={styles.white}>arrow_back_ios</ArrowBackIosIcon>
            </button>
            <div className={styles.receiver}>
                <span className={styles.receiverName} onClick={openEditChatModal}>{chat? chat.title : "Не найдено"}</span>
                <div className={styles.receiverPhoto} onClick={openEditChatModal}>
                    {chat && <img src={chat.avatar} alt={chat.title} className={styles.receiverPhotoImage} />}
                </div>
            </div>
        </div>
    );
};
