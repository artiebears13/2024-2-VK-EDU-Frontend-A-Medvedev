// src/types/api.ts

export interface IPaginatedResponse<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
}

export interface IUser {
    id: string;
    username: string;
    first_name: string;
    last_name: string;
    bio: string | null;
    avatar: string | null;
}

export interface ICurrentUser extends IUser {}

export interface IRegisterData {
    username: string;
    password: string;
    first_name: string;
    last_name: string;
    bio?: string;
    avatar?: File;
}

export interface ILoginResponse {
    access: string;
    refresh: string;
}

export interface IChat {
    id: string;
    is_private: boolean;
    creator: IUser;
    members: IUser[];
    title?: string;
    avatar?: string;
}

export interface IMessage {
    id: string;
    text?: string;
    voice?: string;
    chatId: string;
    files?: { item: string }[];
    created_at: string;
    updated_at: string;
}

export interface IApiError {
    detail?: string;
}
