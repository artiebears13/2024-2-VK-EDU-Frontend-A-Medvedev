import React, {useContext, useState, useEffect, useCallback} from 'react';
import styles from './ProfilePage.module.scss';
import {ProfileHeader} from "../../components/Headers/ProfileHeader/ProfileHeader.jsx";
import {ProfilePhoto} from "../../components/EditableFields/ProfilePhoto/ProfilePhoto.jsx";
import {ProfileAbout} from "../../components/EditableFields/ProfileAbout/ProfileAbout.jsx";
import {ChatContext} from "../../context/ChatContext.jsx";
import {ProfileTextItem} from "../../components/EditableFields/ProfileCity/ProfileTextItem.jsx";
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';

export const ProfilePage = () => {
    const {user, updateProfile} = useContext(ChatContext);
    if (!user) return

    const [isEdit, setIsEdit] = useState(false);
    const [name, setName] = useState(user.first_name);
    const [userInfo, setUserInfo] = useState({
        bio: user.bio,
        avatar: user.avatar,
    });

    const loadData = useCallback(() => {
        setName(user.first_name);
        setUserInfo(prev => ({
            ...prev,
            bio: user.bio,
        }));
    }, [user]);


    useEffect(() => {
        loadData()
    }, [loadData]);


    const handleUpdateProfile = () => {
        const updatedData = {};


        if (userInfo.bio && userInfo.bio !== user.bio) {
            updatedData.bio = userInfo.bio;
        }

        if (Object.keys(updatedData).length > 0) {
            updateProfile(
                updatedData
            ).then();
        }

        setIsEdit(false);
        loadData();
    };

    const editAvatar = (data) => {
        updateProfile(data)
    }
    const handleCloseEdit = () => {
        loadData();
        setIsEdit(false);
    }

    const setAbout = (bio) => {
        setUserInfo(prevState => ({
            ...prevState,
            bio: bio
        }))
    }

    return (
        <div className={styles.ProfilePage}>
            <ProfileHeader
                username={user.username}
            />
            <div className={styles.ProfilePageContainer}>
                <ProfilePhoto person={user} setPerson={editAvatar}/>
                <div className={styles.ProfilePageDescription}>
                    <ProfileTextItem title={"Имя пользователя"} text={name} setText={setName} isEdit={isEdit}/>
                    <ProfileAbout about={userInfo.bio} setAbout={setAbout} isEdit={isEdit}/>

                </div>
                {!isEdit ?
                    <button className={styles.ProfilePageEditButton} onClick={() => setIsEdit(true)}>
                        Изменить
                    </button>
                    :
                    <div className={styles.ProfilePageEditButtonsContainer}>
                        <button className={styles.ProfilePageEditButtonIcon} onClick={handleUpdateProfile}><DoneIcon/>
                        </button>
                        <button className={styles.ProfilePageEditButtonIcon} onClick={handleCloseEdit}><CloseIcon/>
                        </button>
                    </div>
                }
            </div>
        </div>
    );
};
