// src/api/users.ts

import API from './API';
import { ICurrentUser, IUser, IPaginatedResponse, IApiError } from '../types/api';

// Получение текущего пользователя
export const getCurrentUser = async (): Promise<ICurrentUser> => {
    return API.get<ICurrentUser>('/api/user/current/');
};

// Получение информации о пользователе по UUID
export const getUserInfo = async (uuid: string): Promise<IUser> => {
    return API.get<IUser>(`/api/user/${uuid}/`);
};

// Обновление информации о пользователе
export const updateUserInfo = async (updateData: Partial<Pick<IUser, 'bio' | 'avatar'>>): Promise<IUser> => {
    const formData = new FormData();
    if (updateData.bio !== undefined) formData.append('bio', updateData.bio);
    if (updateData.avatar !== undefined) formData.append('avatar', updateData.avatar as Blob); // Приведение к Blob для File

    const currentUser = await getCurrentUser();
    const uuid = currentUser.id;

    const url = `/api/user/${uuid}/`;

    const response = await fetch(`${API.baseUrl}${url}`, {
        method: 'PATCH',
        body: formData,
        headers: {
            'Authorization': `Bearer ${API['accessToken']}`, // Доступ к приватному свойству через индекс
        },
    });

    if (!response.ok) {
        const errorData: IApiError = await response.json();
        throw new Error(errorData.detail || 'Не удалось обновить данные пользователя');
    }

    return response.json();
};

// Удаление информации о пользователе
export const deleteUserInfo = async (): Promise<void> => {
    const currentUser = await getCurrentUser();
    const uuid = currentUser.id;

    const url = `/api/user/${uuid}/`;

    await API.delete<void>(url);
};

// Получение списка пользователей с пагинацией и поиском
export const getUsers = async (page = 1, pageSize = 10, searchQuery: string | null = null): Promise<IPaginatedResponse<IUser>> => {
    const params: Record<string, string> = {
        page: `${page}`,
        page_size: `${pageSize}`,
    };
    if (searchQuery) {
        params.search = searchQuery;
    }
    return API.get<IPaginatedResponse<IUser>>('/api/users/', params);
};
