import './Menu.scss'
import {ChatPhoto} from "../messageList/ChatItem/ChatPhoto.jsx";
import {readUserData} from "../../../utils/storage.js";
import ContrastIcon from '@mui/icons-material/Contrast';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupIcon from '@mui/icons-material/Group';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import {ThemeSwitcher} from "../../../utils/themeSwitcher";
import {useContext} from "react";
import {ChatContext} from "../../../context/ChatContext.jsx";


export const Menu = ({onMenuHide}) => {
    const {selfPerson} = useContext(ChatContext);
    const user = selfPerson;

    return (
        <div className="menu-background slide-in-left" onClick={onMenuHide}>
            <div className="dropdown-menu">
                <div className="user-data">
                <ChatPhoto person={user} />
                    <h2 className="userName">{user.name}</h2>
                </div>
                <div className="menu-item" onClick={ThemeSwitcher}>Сменить тему<ContrastIcon className="white"/></div>
                <div className="menu-item disabled" onClick={() => {}}>Настройки<SettingsIcon className="white"/></div>
                <div className="menu-item disabled" onClick={() => {}}>Друзья<GroupIcon className="white"/></div>
                <div className="menu-item disabled" onClick={() => {}}>Премиум<WorkspacePremiumIcon className="white"/></div>
            </div>
        </div>
    )
}