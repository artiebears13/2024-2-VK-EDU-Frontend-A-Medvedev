// src/api/api.ts

import {
    IRegisterData,
    ILoginResponse,
    ICurrentUser,
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

    private authHeader(): string {
        return this.accessToken ? `Bearer ${this.accessToken}` : '';
    }

    private getUrl(endpoint: string): string {
        return `${this.baseUrl}${endpoint}`;
    }

    private isBody(body: any): boolean {
        return body && typeof body === 'object' && !(body instanceof FormData);
    }

    private async call<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
        const url = endpoint.startsWith('http') ? endpoint : this.getUrl(endpoint);
        const headers: HeadersInit = {
            ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
            ...options.headers,
        };

        if (this.accessToken) {
            headers['Authorization'] = this.authHeader();
        }

        const fetchOptions: RequestInit = {
            ...options,
            headers,
        };

        if (options.body && !(options.body instanceof FormData) && typeof options.body !== 'string') {
            fetchOptions.body = JSON.stringify(options.body);
        }

        let response = await fetch(url, fetchOptions);

        if (response.status === 401) {
            await this.handleUnauthorized();
            if (this.accessToken) {
                headers['Authorization'] = this.authHeader();
                fetchOptions.headers = headers;
                response = await fetch(url, fetchOptions);
            }
        }
        if (response.status === 204) {
            return {} as T;
        }

        return response.json();
    }

    private async handleUnauthorized() {
        if (!this.refreshToken) {
            this.logout();
            throw new Error('Необходима авторизация');
        }

        try {
            const data = await this.post<ILoginResponse>('/api/auth/refresh/',  JSON.stringify({ refresh: this.refreshToken }));

            this.accessToken = data.access;
            this.refreshToken = data.refresh;
            localStorage.setItem('accessToken', data.access);
            localStorage.setItem('refreshToken', data.refresh);
        } catch (error) {
            this.logout();
        }
    }

    private logout() {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    }

    public get<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
        const url = new URL(this.getUrl(endpoint));
        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                url.searchParams.append(key, value);
            });
        }
        return this.call<T>(url.toString(), { method: 'GET' });
    }

    public post<T>(endpoint: string, body: any): Promise<T> {
        if (body && !(body instanceof FormData) && !this.isBody(body)) {
            throw new Error('Invalid body: Body should be a non-array object or FormData');
        }
        return this.call<T>(this.getUrl(endpoint), {
            method: 'POST',
            body,
        });
    }

    public put<T>(endpoint: string, body: any): Promise<T> {
        if (!this.isBody(body)) {
            throw new Error('Invalid body: Body should be a non-array object');
        }
        return this.call<T>(this.getUrl(endpoint), {
            method: 'PUT',
            body: JSON.stringify(body),
        });
    }

    public patch<T>(endpoint: string, body: any): Promise<T> {
        if (body && !(body instanceof FormData) && !this.isBody(body)) {
            throw new Error('Invalid body: Body should be a non-array object or FormData');
        }
        return this.call<T>(this.getUrl(endpoint), {
            method: 'PATCH',
            body,
        });
    }

    public delete<T>(endpoint: string): Promise<T> {
        return this.call<T>(this.getUrl(endpoint), { method: 'DELETE' });
    }

    public async register(userData: IRegisterData): Promise<ICurrentUser> {
        const formData = new FormData();
        formData.append('username', userData.username);
        formData.append('password', userData.password);
        formData.append('first_name', userData.first_name);
        formData.append('last_name', userData.last_name);
        if (userData.bio) formData.append('bio', userData.bio);
        if (userData.avatar) formData.append('avatar', userData.avatar);

        return this.post<ICurrentUser>('/api/register/', formData);
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
