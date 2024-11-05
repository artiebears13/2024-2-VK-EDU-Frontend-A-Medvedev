import React, {useContext, useState, useEffect, useCallback} from 'react';
import styles from './ProfilePage.module.scss';
import {ProfileHeader} from "../../components/Headers/ProfileHeader/ProfileHeader.jsx";
import {ProfilePhoto} from "../../components/EditableFields/ProfilePhoto/ProfilePhoto.jsx";
import {ProfileAbout} from "../../components/EditableFields/ProfileAbout/ProfileAbout.jsx";
import {ChatContext} from "../../context/ChatContext.jsx";
import {ProfileBirthday} from "../../components/EditableFields/ProfileBirthday/ProfileBirthday.jsx";
import {ProfileTextItem} from "../../components/EditableFields/ProfileCity/ProfileTextItem.jsx";
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';

export const ProfilePage = () => {
    const {selfPerson, editSelfPerson} = useContext(ChatContext);
    console.log({selfPerson})

    const [isEdit, setIsEdit] = useState(false);
    const [name, setName] = useState(selfPerson.name);
    const [birthday, setBirthday] = useState(selfPerson.birthday);
    const [city, setCity] = useState(selfPerson.city);
    const [about, setAbout] = useState(selfPerson.about);

    const loadData = useCallback(() => {
        setName(selfPerson.name);
        setBirthday(selfPerson.birthday);
        setCity(selfPerson.city);
        setAbout(selfPerson.about);
    }, [selfPerson]);


    useEffect(() => {
        loadData()
    }, [loadData]);


    const handleUpdateProfile = () => {
        const updatedData = {};

        if (name && name !== selfPerson.name) {
            updatedData.name = name;
        }
        if (birthday && birthday !== selfPerson.birthday) {
            updatedData.birthday = birthday;
        }
        if (city && city !== selfPerson.city) {
            updatedData.city = city;
        }
        if (about && about !== selfPerson.about) {
            updatedData.about = about;
        }

        if (Object.keys(updatedData).length > 0) {
            editSelfPerson(
                updatedData,
            );
        }

        setIsEdit(false);
        loadData();
    };
    const handleCloseEdit = () => {
        loadData();
        setIsEdit(false);
    }

    return (
        <div className={styles.ProfilePage}>
            <ProfileHeader
                username={selfPerson.username}
                isEdit={isEdit}
            />
            <div className={styles.ProfilePageContainer}>
                <ProfilePhoto person={selfPerson} setPerson={editSelfPerson}/>
                <div className={styles.ProfilePageDescription}>
                    <ProfileTextItem title={"Имя пользователя"} text={name} setText={setName} isEdit={isEdit}/>
                    <ProfileBirthday birthday={birthday} setBirthday={setBirthday} isEdit={isEdit}/>
                    <ProfileTextItem title={"Город"} text={city} setText={setCity} isEdit={isEdit}/>
                    <ProfileAbout about={about} setAbout={setAbout} isEdit={isEdit}/>

                </div>
                {!isEdit ?
                    <button className={styles.ProfilePageEditButton} onClick={() => setIsEdit(true)}>
                        Изменить
                    </button>
                    :
                    <div className={styles.ProfilePageEditButtonsContainer}>
                        <button className={styles.ProfilePageEditButtonIcon} onClick={handleUpdateProfile}><DoneIcon /></button>
                        <button className={styles.ProfilePageEditButtonIcon} onClick={handleCloseEdit}><CloseIcon /></button>
                    </div>
                }
            </div>
        </div>
    );
};
