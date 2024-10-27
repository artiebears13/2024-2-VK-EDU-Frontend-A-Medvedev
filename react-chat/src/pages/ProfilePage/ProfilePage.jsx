import React, {useContext, useState, useEffect, useCallback} from 'react';
import './ProfilePage.scss';
import {ProfileHeader} from "../../components/Headers/ProfileHeader/ProfileHeader.jsx";
import {ProfilePhoto} from "../../components/EditableFields/ProfilePhoto/ProfilePhoto.jsx";
import {ProfileAbout} from "../../components/EditableFields/ProfileAbout/ProfileAbout.jsx";
import {ChatContext} from "../../context/ChatContext.jsx";
import {ProfileBirthday} from "../../components/EditableFields/ProfileBirthday/ProfileBirthday.jsx";
import {ProfileTextItem} from "../../components/EditableFields/ProfileCity/ProfileTextItem.jsx";

export const ProfilePage = () => {
    const {selfPerson, editPerson} = useContext(ChatContext);


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
            editPerson(
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
        <div className="profile-page">
            <ProfileHeader
                username={selfPerson.username}
                isEdit={isEdit}
                setIsEdit={setIsEdit}
                doneHandler={handleUpdateProfile}
                closeHandler={handleCloseEdit}
            />
            <div className="profile-page-container">
                <ProfilePhoto selfPerson={selfPerson} setSelfPerson={editPerson}/>
                <div className="profile-page-description">
                    <ProfileTextItem title={"Имя пользователя"} text={name} setText={setName} isEdit={isEdit}/>
                    <ProfileBirthday birthday={birthday} setBirthday={setBirthday} isEdit={isEdit}/>
                    <ProfileTextItem title={"Город"} text={city} setText={setCity} isEdit={isEdit}/>
                    <ProfileAbout about={about} setAbout={setAbout} isEdit={isEdit}/>
                </div>
            </div>
        </div>
    );
};
