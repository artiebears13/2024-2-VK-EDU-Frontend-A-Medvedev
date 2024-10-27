import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {ChatListPage} from './pages/ChatList/index.js';
import {PageChat} from './pages/PageChat/index.js';
import {ChatProvider} from "./context/ChatContext.jsx";
import {AlertMessage} from "./components/Modals/AlertMessage";

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
