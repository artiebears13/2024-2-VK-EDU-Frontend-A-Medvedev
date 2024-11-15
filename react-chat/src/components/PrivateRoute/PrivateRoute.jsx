import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { ChatContext } from '../../context/ChatContext.jsx';

function PrivateRoute({ children }) {
    const { user } = useContext(ChatContext);
    if (!localStorage.getItem('accessToken')) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default PrivateRoute;
