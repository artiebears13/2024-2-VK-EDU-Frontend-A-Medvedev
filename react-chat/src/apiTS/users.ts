// src/api/users.ts

import API from './api';
import { ICurrentUser, IUser, IPaginatedResponse, IApiError } from '../types/api';

export const getCurrentUser = async (): Promise<ICurrentUser> => {
    return API.get<ICurrentUser>('/api/user/current/');
};

export const getUserInfo = async (uuid: string): Promise<IUser> => {
    return API.get<IUser>(`/api/user/${uuid}/`);
};

export const updateUserInfo = async (updateData: Partial<Pick<IUser, 'bio' | 'avatar'>>): Promise<IUser> => {
    const formData = new FormData();
    if (updateData.bio !== undefined) formData.append('bio', updateData.bio);
    if (updateData.avatar !== undefined) formData.append('avatar', updateData.avatar as Blob);

    const currentUser = await getCurrentUser();
    const uuid = currentUser.id;

    const url = `/api/user/${uuid}/`;

    const response = await fetch(`${API.baseUrl}${url}`, {
        method: 'PATCH',
        body: formData,
        headers: {
            'Authorization': `Bearer ${API['accessToken']}`,
        },
    });

    if (!response.ok) {
        const errorData: IApiError = await response.json();
        throw new Error(errorData.detail || 'Не удалось обновить данные пользователя');
    }

    return response.json();
};

export const deleteUserInfo = async (): Promise<void> => {
    const currentUser = await getCurrentUser();
    const uuid = currentUser.id;

    const url = `/api/user/${uuid}/`;

    await API.delete<void>(url);
};

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
