import React, {useContext} from 'react';
import './Header.scss';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {ChatContext} from "../../../context/ChatContext.jsx";

export const Header = ({ chatId }) => {
    const { persons } = useContext(ChatContext);

    const person = persons.find(p => p.id === chatId);

    if (!person) return null;

    return (
        <div className="header">
            <button className="back-button" onClick={() => window.history.back()}>
                <ArrowBackIosIcon className={"white"}>arrow_back_ios</ArrowBackIosIcon>
            </button>
            <div className="receiver">
                <span className="receiver-name">{person.name}</span>
                <div className={'receiver-photo'}>
                <img src={person.photo} alt={person.name} className="receiver-photo__image" />
                </div>
            </div>
        </div>
    );
};
