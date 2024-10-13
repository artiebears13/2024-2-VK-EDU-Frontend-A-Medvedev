import {markReceivedMessagesAsRead} from "../../../utils/storage";
import {openChat} from "../../../index";
import {createStatusBadge} from "./statusBadge";
import {chatStatus} from "./chatStatus";
import {chatPhoto} from "./chatPhoto";
import {chatInfo} from "./chatInfo";
import {chatTime} from "./chatTime";
import './chatItem.scss'

export function chatItem({person, message}) {
    const chatItem = document.createElement('div');
    chatItem.classList.add('chat-item');

    const statusBadge = createStatusBadge(message);
    const chatItemPhotoDiv = chatPhoto(person);
    const chatItemInfoDiv = chatInfo(person, message);
    const chatItemStatusDiv = chatStatus(statusBadge);
    const chatItemTimeDiv = chatTime(message);

    chatItem.appendChild(chatItemPhotoDiv);
    chatItem.appendChild(chatItemInfoDiv);
    chatItem.appendChild(chatItemStatusDiv);
    chatItem.appendChild(chatItemTimeDiv);

    chatItem.addEventListener('click', () => {
        markReceivedMessagesAsRead(person.id);
        openChat(person.id, message);
    });

    return chatItem;
}