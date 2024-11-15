// src/pages/LoginPage/LoginPage.jsx

import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as apiLogin } from '../../api/api';
import { ChatContext } from '../../context/ChatContext.jsx';
import classes from './LoginPage.module.scss';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(ChatContext);
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { access, refresh } = await apiLogin(username, password);
            await login(access, refresh);
            navigate('/');
        } catch (err) {
            setError('Неверное имя пользователя или пароль');
            console.error('Ошибка при входе:', err);
        }
    };

    return (
        <div className={classes.loginPage}>
            <h2>Вход в систему</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit} className={classes.loginForm}>
                <input
                    type="text"
                    placeholder="Логин"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={classes.loginFormInput}
                    required
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={classes.loginFormInput}
                    required
                />
                <button type="submit" className={classes.loginFormButton}>Войти</button>
            </form>
            <p>
                Нет аккаунта? <a href="/register">Зарегистрироваться</a>
            </p>
        </div>
    );
}

export default LoginPage;
