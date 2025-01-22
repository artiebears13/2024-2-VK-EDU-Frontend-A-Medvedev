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
    last_online_at: string | null;
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

export interface IAttachment {
    item: string;
}

export interface IMessage {
    id: string;
    chat: string;
    created_at: string;
    files?: IAttachment[];
    text?: string | null;
    updated_at?: string | null;
    voice?: string | null;
    was_read_by: IUser[];

}

export interface IApiError {
    detail?: string;
}
