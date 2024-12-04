// src/store/store.js

import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import chatReducer from './chatSlice';
import messageReducer from './messageSlice';
import { centrifugoMiddleware } from './centrifugo'; // Импортируем Centrifugo middleware
import { notificationMiddleware } from './notification'; // Импортируем middleware для уведомлений

const store = configureStore({
    reducer: {
        user: userReducer,
        chats: chatReducer,
        messages: messageReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(centrifugoMiddleware, notificationMiddleware),
});

export default store;
