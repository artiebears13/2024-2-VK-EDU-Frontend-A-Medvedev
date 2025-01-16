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

    return API.post<IMessage>('/api/messages/', formData);
};

export const getMessages = async (
    chatId: string,
    params: { search?: string; page_size?: number; page?: number }
): Promise<IPaginatedResponse<IMessage>> => {
    const queryParams: Record<string, string> = {
        chat: chatId,
    };
    if (params.search) queryParams.search = params.search;
    if (params.page_size) queryParams.page_size = `${params.page_size}`;
    if (params.page) queryParams.page = `${params.page}`;

    return API.get<IPaginatedResponse<IMessage>>('/api/messages/', queryParams);
};

export const getMessage = async (messageId: string): Promise<IMessage> => {
    return API.get<IMessage>(`/api/message/${messageId}/`);
};

export const editMessageApi = async (messageId: string, text: string): Promise<IMessage> => {
    const url = `/api/message/${messageId}/`;
    const body = { text };

    return API.patch<IMessage>(url, body);
};

export const deleteMessageApi = async (messageId: string): Promise<void> => {
    const url = `/api/message/${messageId}/`;

    return API.delete<void>(url);
};

export const readMessage = async (messageId: string): Promise<void> => {
    const url = `/api/message/${messageId}/read/`;

    return API.post<void>(url, {});
};
