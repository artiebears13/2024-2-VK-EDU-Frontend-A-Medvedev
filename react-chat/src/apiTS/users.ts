// src/api/users.ts

import API from './api';
import { ICurrentUser, IUser, IPaginatedResponse } from '../types/api';

export const getCurrentUser = async (): Promise<ICurrentUser> => {
    return API.get<ICurrentUser>('/api/user/current/');
};

export const getUserInfo = async (uuid: string): Promise<IUser> => {
    return API.get<IUser>(`/api/user/${uuid}/`);
};

export const updateUserInfo = async (
    updateData: Partial<Pick<IUser, 'bio' | 'avatar'>>
): Promise<IUser> => {
    const formData = new FormData();
    if (updateData.bio !== undefined) formData.append('bio', updateData.bio);
    if (updateData.avatar !== undefined) formData.append('avatar', updateData.avatar as Blob);

    const currentUser = await getCurrentUser();
    const uuid = currentUser.id;

    const url = `/api/user/${uuid}/`;

    return API.patch<IUser>(url, formData);
};

export const deleteUserInfo = async (): Promise<void> => {
    const currentUser = await getCurrentUser();
    const uuid = currentUser.id;

    const url = `/api/user/${uuid}/`;

    return API.delete<void>(url);
};

export const getUsers = async (
    page = 1,
    pageSize = 10,
    searchQuery: string | null = null
): Promise<IPaginatedResponse<IUser>> => {
    const params: Record<string, string> = {
        page: `${page}`,
        page_size: `${pageSize}`,
    };
    if (searchQuery) {
        params.search = searchQuery;
    }
    return API.get<IPaginatedResponse<IUser>>('/api/users/', params);
};
