import React, {useContext} from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import styles from './ProfileHeader.module.scss'
import {Title} from "../../Title/Title.jsx";
import {useNavigate} from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import {logout} from "../../../store/userSlice.js";

export const ProfileHeader = ( {username} ) => {
    const navigate = useNavigate();


    return (
        <div className={styles.header}>

            <button className={styles.backButton} onClick={() => navigate(`/`)}>
                <ArrowBackIosIcon className={styles.white}>arrow_back_ios</ArrowBackIosIcon>
            </button>

            <Title text={username}></Title>
            {/* for correct centering*/}
            <div className={styles.logout} onClick={logout}><LogoutIcon className={"white"} /> </div>
        </div>
    );
};
