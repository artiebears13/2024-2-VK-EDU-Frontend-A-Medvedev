import React, {useContext} from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {ChatContext} from "../../../context/ChatContext.jsx";
import EditIcon from '@mui/icons-material/Edit';
import './ProfileHeader.scss'
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import {Title} from "../../Title/Title.jsx";

export const ProfileHeader = ( {username, isEdit, setIsEdit, doneHandler, closeHandler} ) => {
    const {selfPerson} = useContext(ChatContext);

    if (!selfPerson) return null;

    return (
        <div className="header">
            {!isEdit ?
                <button className="back-button" onClick={() => window.history.back()}>
                    <ArrowBackIosIcon className={"white"}>arrow_back_ios</ArrowBackIosIcon>
                </button>
                :
                <button className="back-button" onClick={() => closeHandler()}>
                    <CloseIcon className={"white"} />
                </button>
            }

            <Title text={username}></Title>
            {!isEdit ?
                <button className="edit-button" onClick={() => setIsEdit(true)}>
                    <EditIcon className={"white"}>arrow_edit</EditIcon>
                </button>
                :
                <button className="edit-button" onClick={() => doneHandler()}>
                    <DoneIcon className={"white"}>done</DoneIcon>
                </button>}

        </div>
    );
};
