import React, {useContext, useState} from 'react';
import { ChatListHeader } from '../../components/Headers/ChatListHeader/ChatListHeader.jsx';
import { CreateChatButton } from '../../components/Buttons/CreateChatButton/CreateChatButton.jsx';
import { CreatePersonalChatModal } from '../../components/Modals/CreateChatModal/CreatePersonalChatModal.jsx';
import { Menu } from '../../components/Menu/Menu.jsx';
import {CreateGroupChatModal} from "../../components/Modals/CreateChatModal/CreateGroupChatModal.jsx";
import {ChatList} from "../../components/chatList/ChatList.jsx";
import {ChatContext} from "../../context/ChatContext.jsx";

export const ChatListPage = () => {
    const { searchChats } = useContext(ChatContext);
    const [searchQuery, setSearchQuery] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);
    const [chatModal, setChatModal] = useState('none');


    const onPersonalChat = () => {
        setChatModal('personal');
    };
    const onGroupChat = () => {
        setChatModal('group');
    };

    const onMenuShow = () => {
        setMenuOpen(true);
    };
    const onMenuHide = () => {
        setMenuOpen(false);
    };

    const handleSearch = (query) => {
        searchChats(query);
        setSearchQuery(query);
    }

    const ChooseChatModal = () => {
        switch (chatModal) {
            case 'personal':
                return <CreatePersonalChatModal
                    isOpen={chatModal === 'personal'}
                    onClose={() => setChatModal('none')}
                />
            case 'group':
                return <CreateGroupChatModal
                    isOpen={chatModal === 'group'}
                    onClose={() => setChatModal('none')}
                />
            default:
                return
        }
    }

    return (
        <main>
            <ChatListHeader handleSearch={handleSearch} onMenuShow={onMenuShow} />
            <ChatList searchQuery={searchQuery} />
            <CreateChatButton
                onGroupChat={onGroupChat}
                onPersonalChat={onPersonalChat}
            />
            {ChooseChatModal()}
            {menuOpen && <Menu onMenuHide={onMenuHide} />}
        </main>
    );
};
