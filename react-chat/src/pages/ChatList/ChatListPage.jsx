import React, {useState} from "react";
import {ChatListHeader} from "../../components/Headers/ChatListHeader/ChatListHeader.jsx";
import {CreateChatButton} from "../../components/Buttons/CreateChatButton/CreateChatButton.jsx";
import {CreateChatModal} from "../../components/Modals/CreateChatModal/CreateChatModal.jsx";
import {ChatList} from "../../components/chatList/ChatList.jsx";
import {Menu} from "../../components/Menu/Menu.jsx";

export const ChatListPage = () => {

    const [searchQuery, setSearchQuery] = useState("");
    const [createChatModalOpen, setCreateChatModalOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const openCreateChatModal = () => {
        setCreateChatModalOpen(true)
    };
    const closeCreateChatModal = () => {
        console.log("here");
        setCreateChatModalOpen(false);
    };

    const onMenuShow = () => {
        setMenuOpen(true)
    }
    const onMenuHide = () => {
        setMenuOpen(false)
    }

    return (
        <main>
            <ChatListHeader handleSearch={setSearchQuery} onMenuShow={onMenuShow}/>
            <ChatList searchQuery={searchQuery}/>
            <CreateChatButton openCreateChatModal={openCreateChatModal}/>
            {createChatModalOpen && (<CreateChatModal
                isOpen={createChatModalOpen}
                onClose={closeCreateChatModal}
            />)}
            {menuOpen && (<Menu onMenuHide={onMenuHide}/>)}
        </main>
    )
}
