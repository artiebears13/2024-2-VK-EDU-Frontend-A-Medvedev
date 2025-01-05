// src/api/API.ts

import {
    IRegisterData,
    ILoginResponse,
    ICurrentUser,
    IApiError,
    IPaginatedResponse,
    IUser,
    IChat,
    IMessage
} from '../types/api';

class API {
    public baseUrl: string;
    private accessToken: string | null;
    private refreshToken: string | null;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
        this.accessToken = localStorage.getItem('accessToken');
        this.refreshToken = localStorage.getItem('refreshToken');
    }

    private async call<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
        const url = `${this.baseUrl}${endpoint}`;
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            ...options.headers,
        };

        if (this.accessToken) {
            headers['Authorization'] = `Bearer ${this.accessToken}`;
        }
        console.log({headers});

        const response = await fetch(url, { ...options, headers });

        if (response.status === 401) {
            await this.handleUnauthorized();
            if (this.accessToken) {
                headers['Authorization'] = `Bearer ${this.accessToken}`;
                const retryResponse = await fetch(url, { ...options, headers });
                return this.handleResponse<T>(retryResponse);
            }
        }

        return this.handleResponse<T>(response);
    }

    private async handleUnauthorized() {
        if (!this.refreshToken) {
            this.logout();
            throw new Error('Необходима авторизация');
        }

        try {
            const response = await fetch(`${this.baseUrl}/api/auth/refresh/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ refresh: this.refreshToken }),
            });

            if (!response.ok) {
                throw new Error('Не удалось обновить токен');
            }

            const data: ILoginResponse = await response.json();
            this.accessToken = data.access;
            this.refreshToken = data.refresh;
            localStorage.setItem('accessToken', data.access);
            localStorage.setItem('refreshToken', data.refresh);
        } catch (error) {
            this.logout();
            throw new Error('Сессия истекла, пожалуйста, войдите снова');
        }
    }

    private async handleResponse<T>(response: Response): Promise<T> {
        if (!response.ok) {
            const errorData: IApiError = await response.json();
            throw new Error(errorData.detail || 'Произошла ошибка');
        }
        return response.json();
    }

    private logout() {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    }

    public get<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
        let url = endpoint;
        if (params) {
            const query = new URLSearchParams(params).toString();
            url += `?${query}`;
        }
        return this.call<T>(url, { method: 'GET' });
    }

    public post<T>(endpoint: string, body: any): Promise<T> {
        return this.call<T>(endpoint, {
            method: 'POST',
            body: JSON.stringify(body),
        });
    }

    public put<T>(endpoint: string, body: any): Promise<T> {
        return this.call<T>(endpoint, {
            method: 'PUT',
            body: JSON.stringify(body),
        });
    }

    public patch<T>(endpoint: string, body: any): Promise<T> {
        return this.call<T>(endpoint, {
            method: 'PATCH',
            body: JSON.stringify(body),
        });
    }

    public delete<T>(endpoint: string): Promise<T> {
        return this.call<T>(endpoint, { method: 'DELETE' });
    }

    public async register(userData: IRegisterData): Promise<ICurrentUser> {
        const formData = new FormData();
        formData.append('username', userData.username);
        formData.append('password', userData.password);
        formData.append('first_name', userData.first_name);
        formData.append('last_name', userData.last_name);
        if (userData.bio) formData.append('bio', userData.bio);
        if (userData.avatar) formData.append('avatar', userData.avatar);

        const response = await fetch(`${this.baseUrl}/api/register/`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            const errorData: IApiError = await response.json();
            throw new Error(errorData.detail || 'Ошибка при регистрации');
        }

        return response.json();
    }

    public async login(username: string, password: string): Promise<ILoginResponse> {
        const response = await this.post<ILoginResponse>('/api/auth/', { username, password });
        this.accessToken = response.access;
        this.refreshToken = response.refresh;
        localStorage.setItem('accessToken', response.access);
        localStorage.setItem('refreshToken', response.refresh);
        return response;
    }

}

export default new API('https://vkedu-fullstack-div2.ru');
