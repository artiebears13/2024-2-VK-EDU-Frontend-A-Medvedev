// src/api/centrifugo.ts

import { Centrifuge } from 'centrifuge';
import API from './api';

export function connectToCentrifugo(userId: string, onMessageReceived: (event: string, message: any) => void): Centrifuge {
    const centrifugoUrl = 'wss://vkedu-fullstack-div2.ru/connection/websocket/';
    const accessToken = API['accessToken'];

    const headers = {
        'Authorization': `Bearer ${accessToken}`,
    };

    const centrifuge = new Centrifuge(centrifugoUrl, {
        getToken: async (ctx: any) => {
            const response = await fetch(`${API['baseUrl']}/api/centrifugo/connect/`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(ctx),
            });

            if (!response.ok) {
                throw new Error('Не удалось получить токен подключения');
            }

            const data = await response.json();
            return data.token;
        },
    });

    const subscription = centrifuge.newSubscription(userId.toString(), {
        getToken: async (ctx: any) => {
            const response = await fetch(`${API['baseUrl']}/api/centrifugo/subscribe/`, { // Доступ к приватному свойству через индекс
                method: 'POST',
                headers: headers,
                body: JSON.stringify(ctx),
            });

            if (!response.ok) {
                throw new Error('Не удалось получить токен подписки');
            }

            const data = await response.json();
            return data.token;
        },
    });

    subscription.on('publication', (ctx) => {
        const { event, message } = ctx.data;
        onMessageReceived(event, message);
    });

    centrifuge.on('connect', () => {
        console.log('Connected to Centrifugo');
    });

    centrifuge.on('disconnect', () => {
        console.log('Disconnected from Centrifugo');
    });

    centrifuge.on('error', (ctx) => {
        console.error('Ошибка Centrifugo:', ctx);
    });

    subscription.subscribe();
    centrifuge.connect();

    return centrifuge;
}
