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

    chatItem.append(
        chatPhoto(person),
        chatInfo(person, message),
        chatStatus(createStatusBadge(message)),
        chatTime(message)
    );

    chatItem.addEventListener('click', () => {
        markReceivedMessagesAsRead(person.id);
        openChat(person.id, message);
    });

    return chatItem;
}