import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PrivateRoute({ children }) {
    const user = useSelector((state) => state.user.user); // Доступ к пользователю из Redux
    const accessToken = localStorage.getItem('accessToken'); // Дополнительная проверка токена
    console.log('text',{accessToken}, !user || !accessToken);

    if (!user || !accessToken) {
        console.log("redirecting");
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default PrivateRoute;
