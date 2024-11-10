import React from 'react';
import {HashRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import {ChatProvider} from "./context/ChatContext.jsx";
import {AlertMessage} from "./components/Modals/AlertMessage/AlertMessage.jsx";
import {ChatListPage} from "./pages/ChatList/ChatListPage.jsx";
import {PageChat} from "./pages/PageChat/PageChat.jsx";
import {ProfilePage} from "./pages/ProfilePage/ProfilePage.jsx";

function App() {
    const theme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', theme);

    return (
        <ChatProvider>

            <AlertMessage></AlertMessage>
            <Router>
                <Routes>
                    <Route path="/" element={<ChatListPage/>}/>
                    <Route path="/chat/:chatId" element={<PageChat/>}/>
                    <Route path="/profile" element={<ProfilePage/>}/>
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Router>
        </ChatProvider>
    );
}

export default App;
