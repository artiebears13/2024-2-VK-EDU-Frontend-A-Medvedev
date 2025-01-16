// src/api/chats.ts

import API from './api';
import { IChat, IPaginatedResponse, IApiError, ICurrentUser } from '../types/api';

export const getChats = async (
    page = 1,
    pageSize = 10,
    searchQuery: string | null = null
): Promise<IPaginatedResponse<IChat>> => {
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

    return API.post<IChat>('/api/chats/', formData);
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

    return API.patch<IChat>(`/api/chat/${uuid}/`, formData);
};

export const deleteChat = async (chat: IChat): Promise<void> => {
    const currentUser = await API.get<ICurrentUser>('/api/user/current/');
    const uuid = chat.id;

    if (currentUser.id !== chat.creator.id) {
        return
    }

    const url = `/api/chat/${uuid}/`;

    await API.delete<void>(url);
};
