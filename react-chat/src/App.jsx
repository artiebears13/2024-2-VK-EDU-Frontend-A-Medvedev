import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {ChatProvider} from "./context/ChatContext.jsx";
import {AlertMessage} from "./components/Modals/AlertMessage/AlertMessage.jsx";
import {ChatListPage} from "./pages/ChatList/ChatListPage.jsx";
import {PageChat} from "./pages/PageChat/PageChat.jsx";

function App() {
    const theme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', theme);

    return (
        <ChatProvider>

            <AlertMessage></AlertMessage>
            <Router basename={"/2024-2-VK-EDU-Frontend-A-Medvedev"}>
                <Routes>
                    <Route path="/" element={<ChatListPage/>}/>
                    <Route path="/chat/:chatId" element={<PageChat/>}/>
                </Routes>
            </Router>
        </ChatProvider>
    );
}

export default App;
