import React from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import styles from './ProfileHeader.module.scss'
import {Title} from "../../Title/Title.jsx";
import {useNavigate} from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import {logout} from "../../../store/userSlice.js";
import {useDispatch} from "react-redux";

export const ProfileHeader = ( {username} ) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    }

    return (
        <div className={styles.header}>

            <button className={styles.backButton} onClick={() => navigate(`/`)}>
                <ArrowBackIosIcon className={styles.white}>arrow_back_ios</ArrowBackIosIcon>
            </button>

            <Title text={username}></Title>
            <div className={styles.logout} onClick={handleLogout}><LogoutIcon className={"white"} /> </div>
        </div>
    );
};
