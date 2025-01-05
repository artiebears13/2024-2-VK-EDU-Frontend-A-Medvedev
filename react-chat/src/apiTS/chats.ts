// src/api/chats.ts

import API from './api';
import { IChat, IPaginatedResponse, IApiError } from '../types/api';

export const getChats = async (page = 1, pageSize = 10, searchQuery: string | null = null): Promise<IPaginatedResponse<IChat>> => {
    const params: Record<string, string> = {
        page: `${page}`,
        page_size: `${pageSize}`,
    };
    if (searchQuery) {
        params.search = searchQuery;
    }
    return API.get<IPaginatedResponse<IChat>>('/api/chats/', params);
};

export const createChat = async (chatData: Partial<IChat>): Promise<IChat> => {
    const formData = new FormData();
    if (chatData.is_private !== undefined) formData.append('is_private', `${chatData.is_private}`);
    if (chatData.creator) formData.append('creator', chatData.creator.id);
    if (chatData.members) {
        chatData.members.forEach(member => formData.append('members', member.id));
    }
    if (chatData.title) formData.append('title', chatData.title);
    if (chatData.avatar) formData.append('avatar', chatData.avatar as Blob);

    const response = await fetch(`${API['baseUrl']}/api/chats/`, {
        method: 'POST',
        body: formData,
        headers: {
            'Authorization': `Bearer ${API['accessToken']}`,
        },
    });

    if (!response.ok) {
        const errorData: IApiError = await response.json();
        if (errorData.detail?.includes('members')) {
            throw new Error('Чат с этим пользователем уже существует');
        }
        throw new Error('Не удалось создать чат');
    }

    return response.json();
};

export const getChat = async (uuid: string): Promise<IChat> => {
    return API.get<IChat>(`/api/chat/${uuid}/`);
};

export const updateChatInfo = async (uuid: string, newData: Partial<IChat>): Promise<IChat> => {
    const formData = new FormData();
    if (newData.title !== undefined) formData.append('title', newData.title);
    if (newData.members !== undefined && newData.members.length > 0) {
        newData.members.forEach(member => formData.append('members', member.id));
    }

    const response = await fetch(`${API['baseUrl']}/api/chat/${uuid}/`, {
        method: 'PATCH',
        body: formData,
        headers: {
            'Authorization': `Bearer ${API['accessToken']}`,
        },
    });

    if (!response.ok) {
        let errorMessage = 'Не удалось обновить данные чата';
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

export const deleteChat = async (chat: IChat): Promise<void> => {
    const currentUser = await API.get<ICurrentUser>('/api/user/current/');
    const uuid = chat.id;

    if (currentUser.id !== chat.creator.id) {
        throw new Error('Недостаточно прав для удаления этого чата');
    }

    const url = `/api/chat/${uuid}/`;

    const response = await API.delete<void>(url);

    if (!response.ok) {
        let errorMessage = 'Не удалось удалить чат';
        try {
            const errorData: IApiError = await response.json();
            errorMessage = errorData.detail || errorMessage;
        } catch (e) {
            throw new Error('Не удалось обработать ошибку');
        }
        throw new Error(errorMessage);
    }
};
