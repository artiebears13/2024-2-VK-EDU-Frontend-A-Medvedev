import classes from './EditPersonModal.module.scss'
import React, {useState} from "react";
import {ProfilePhoto} from "../../EditableFields/ProfilePhoto/ProfilePhoto.jsx";

export const EditPersonModal = ({onClose, person, updatePerson}) => {
    const [newPersonInfo, setNewPersonInfo] = useState(person);

    const editPersonPhoto = (data) => {
        setNewPersonInfo(prev => ({ ...prev, photo: data.photo }));
    };

    const editPersonName = (name) => {
        setNewPersonInfo(prev => ({ ...prev, name }));
    };

    const saveChanges = () => {
        if (newPersonInfo.name !== '') {
            updatePerson(newPersonInfo);
            onClose();
        }
    };

    return (
        <div className={`${classes.EditPersonModalBackground}`} onClick={onClose}>
            <div className={classes.EditPersonModalContent} onClick={e => e.stopPropagation()}>
                <span className={classes.EditPersonModalCloseButton} onClick={onClose}>&times;</span>
                <h2>Создать новый чат</h2>
                <ProfilePhoto person={newPersonInfo} setPerson={editPersonPhoto}/>
                <input
                    type="text"
                    className={classes.EditPersonModalName}
                    value={newPersonInfo.name}
                    onChange={(e) => editPersonName(e.target.value)}
                    placeholder="Имя пользователя"
                />
                <button className={classes.EditPersonModalConfirmButton} onClick={saveChanges}>
                    OK
                </button>
            </div>
        </div>
    )
}