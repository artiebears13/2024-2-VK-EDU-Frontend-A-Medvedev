// src/api/messages.ts

import API from './api';
import { IMessage, IPaginatedResponse, IApiError } from '../types/api';

export const sendMessage = async (messageData: {
    text?: string;
    voice?: File;
    chatId: string;
    files?: File[];
}): Promise<IMessage> => {
    const formData = new FormData();
    if (messageData.text) formData.append('text', messageData.text);
    if (messageData.voice) formData.append('voice', messageData.voice);
    formData.append('chat', messageData.chatId);

    if (messageData.files && messageData.files.length > 0) {
        messageData.files.forEach((file) => {
            formData.append('files', file);
        });
    }

    const response = await fetch(`${API['baseUrl']}/api/messages/`, {
        method: 'POST',
        body: formData,
        headers: {
            'Authorization': `Bearer ${API['accessToken']}`,
        },
    });

    if (!response.ok) {
        throw new Error('Не удалось отправить сообщение');
    }

    return response.json();
};

export const getMessages = async (chatId: string, params: { search?: string; page_size?: number; page?: number }): Promise<IPaginatedResponse<IMessage>> => {
    const queryParams: Record<string, string> = {
        chat: chatId,
    };
    if (params.search) queryParams.search = params.search;
    if (params.page_size) queryParams.page_size = `${params.page_size}`;
    if (params.page) queryParams.page = `${params.page}`;

    return API.get<IPaginatedResponse<IMessage>>('/api/messages/', queryParams);
};

export const getMessage = async (messageId: string): Promise<IMessage> => {
    return API.get<IMessage>(`/api/message/${messageId}`);
};

export const editMessageApi = async (messageId: string, text: string): Promise<IMessage> => {
    const url = `/api/message/${messageId}`;
    const body = { text };

    const response = await API.patch<IMessage>(url, body);

    if (!response.ok) {
        let errorMessage = 'Не удалось обновить сообщение';
        try {
            const errorData: IApiError = await response.json();
            errorMessage = errorData.detail || errorMessage;
        } catch (e) {
            throw new Error('Не удалось обработать ошибку');
        }
        throw new Error(errorMessage);
    }

    return response.json();
};

export const deleteMessageApi = async (messageId: string): Promise<void> => {
    const url = `/api/message/${messageId}`;

    const response = await API.delete<void>(url);

    if (!response.ok) {
        let errorMessage = 'Не удалось удалить сообщение';
        try {
            const errorData: IApiError = await response.json();
            errorMessage = errorData.detail || errorMessage;
        } catch (e) {
            throw new Error('Не удалось обработать ошибку');
        }
        throw new Error(errorMessage);
    }
};

export const readMessage = async (messageId: string): Promise<void> => {
    const url = `/api/message/${messageId}/read/`;

    const response = await API.post<void>(url, {});

    if (!response.ok) {
        let errorMessage = 'Не удалось отметить сообщение как прочитанное';
        try {
            const errorData: IApiError = await response.json();
            errorMessage = errorData.detail || errorMessage;
        } catch (e) {
            throw new Error('Не удалось обработать ошибку');
        }
        throw new Error(errorMessage);
    }
};
