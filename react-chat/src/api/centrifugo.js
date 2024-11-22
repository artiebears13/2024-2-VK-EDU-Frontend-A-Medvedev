// src/api/centrifugo.js

import { Centrifuge } from 'centrifuge';

export function connectToCentrifugo(userId, onMessageReceived) {
    const accessToken = localStorage.getItem('accessToken');
    const centrifugoUrl = //'wss://vkedu-fullstack-div2.ru/connection/websocket/';
        import.meta.env.MODE === 'development'
            ? 'ws://localhost:8080/connection/websocket/'
            : 'wss://vkedu-fullstack-div2.ru/connection/websocket/';

    const headers = {
        'Authorization': `Bearer ${accessToken}`,
    };

    const centrifuge = new Centrifuge(centrifugoUrl, {
        getToken: (ctx) =>
            fetch(`${import.meta.env.MODE === 'development' ? 'http://localhost:8080' : 'https://vkedu-fullstack-div2.ru'}/api/centrifugo/connect/`, {
            // fetch(`https://vkedu-fullstack-div2.ru/api/centrifugo/connect/`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(ctx),
            })
                .then((res) => {
                    if (!res.ok) {
                        throw new Error('Не удалось получить токен подключения');
                    }
                    return res.json();
                })
                .then((data) => data.token),
    });

    const subscription = centrifuge.newSubscription(userId.toString(), {
        getToken: (ctx) =>
            fetch(`${import.meta.env.MODE === 'development' ? 'http://localhost:8080' : 'https://vkedu-fullstack-div2.ru'}/api/centrifugo/subscribe/`, {
            // fetch(`https://vkedu-fullstack-div2.ru/api/centrifugo/subscribe/`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(ctx),
            })
                .then((res) => {
                    if (!res.ok) {
                        throw new Error('Не удалось получить токен подписки');
                    }
                    return res.json();
                })
                .then((data) => data.token),
    });

    subscription.on('publication', function (ctx) {
        if (onMessageReceived) {
            const { event, message } = ctx.data;
            onMessageReceived(event, message);
        }
    });

    centrifuge.on('connect', function (ctx) {
    });

    centrifuge.on('disconnect', function (ctx) {
    });

    centrifuge.on('error', function (ctx) {
        console.error('Ошибка Centrifugo:', ctx);
    });

    subscription.subscribe();
    centrifuge.connect();

    // return centrifuge;
}
