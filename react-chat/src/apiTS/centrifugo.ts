// src/api/centrifugo.ts

import {Centrifuge, ConnectionTokenContext, SubscriptionTokenContext} from 'centrifuge';
import API from './api';

export function connectToCentrifugo(userId: string, onMessageReceived: (event: string, message: any) => void): Centrifuge {
    const centrifugoUrl = 'wss://vkedu-fullstack-div2.ru/connection/websocket/';

    const centrifuge = new Centrifuge(centrifugoUrl, {
        getToken: async (ctx: ConnectionTokenContext): Promise<string> => {
            const data = await API.post<{ token: string }>('/api/centrifugo/connect/', ctx);
            return data.token;
        },
    });

    const subscription = centrifuge.newSubscription(userId.toString(), {
        getToken: async (ctx: SubscriptionTokenContext): Promise<string> => {
            const data = await API.post<{ token: string }>('/api/centrifugo/subscribe/', ctx);
            return data.token;
        },
    });

    subscription.on('publication', (ctx) => {
        const {event, message} = ctx.data;
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
