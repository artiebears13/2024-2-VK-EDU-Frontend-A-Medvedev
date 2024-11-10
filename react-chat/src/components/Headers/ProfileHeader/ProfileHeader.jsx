import React, {useContext} from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {ChatContext} from "../../../context/ChatContext.jsx";
import styles from './ProfileHeader.module.scss'
import {Title} from "../../Title/Title.jsx";
import {useNavigate} from "react-router-dom";

export const ProfileHeader = ( {username} ) => {
    const navigate = useNavigate();

    const {selfPerson} = useContext(ChatContext);

    if (!selfPerson) return null;

    return (
        <div className={styles.header}>

            <button className={styles.backButton} onClick={() => navigate(`/`)}>
                <ArrowBackIosIcon className={styles.white}>arrow_back_ios</ArrowBackIosIcon>
            </button>

            <Title text={username}></Title>
            {/* for correct centering*/}
            <div></div>
        </div>
    );
};
