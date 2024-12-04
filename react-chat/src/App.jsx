import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import { AlertMessage } from './components/Modals/AlertMessage/AlertMessage.jsx';
import { ChatListPage } from './pages/ChatList/ChatListPage.jsx';
import { PageChat } from './pages/PageChat/PageChat.jsx';
import { ProfilePage } from './pages/ProfilePage/ProfilePage.jsx';
import LoginPage from './pages/LoginPage/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage/RegisterPage.jsx';
import PrivateRoute from './components/PrivateRoute/PrivateRoute.jsx';

function App() {
    const theme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', theme);

    return (
        <React.StrictMode>
            <Provider store={store}>
                <Router>
                    <AlertMessage />
                    <Routes>
                        {/* Используем маршруты */}
                        <Route
                            path="/"
                            element={
                                <PrivateRoute>
                                    <ChatListPage />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/chat/:chatId"
                            element={
                                <PrivateRoute>
                                    <PageChat />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/profile"
                            element={
                                <PrivateRoute>
                                    <ProfilePage />
                                </PrivateRoute>
                            }
                        />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </Router>
            </Provider>
        </React.StrictMode>
    );
}

export default App;
