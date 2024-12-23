import classes from './ChatInfoModal.module.scss'
import React from "react";
import {imgOrPlaceholder} from "../../../utils/imgOrPlaceholder/imgOrPlaceholder.js";
import {ChatMembers} from "../../ChatMembers/ChatMembers.jsx";

export const ChatInfoModal = ({onClose, currentChat}) => {

    const chatAvatarSrc = imgOrPlaceholder(currentChat.avatar)

    return (
        <div className={`${classes.EditChatModalBackground}`} onClick={onClose}>
            <div className={classes.EditChatModalContent} onClick={e => e.stopPropagation()}>
                <span className={classes.EditChatModalCloseButton} onClick={onClose}>&times;</span>
                {currentChat && <h1 className={classes.EditChatName}>{currentChat.title}</h1>}
                <div className={classes.EditChatPhotoContainer}>
                    {currentChat && <img src={chatAvatarSrc} alt={currentChat.title} className={classes.EditChatPhoto}/>}
                </div>
                <h1 >Участники</h1>
                <ChatMembers members={currentChat.members}/>

            </div>
        </div>
    )
}