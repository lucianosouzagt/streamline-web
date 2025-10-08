import api from './api';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await api.post('/auth/login', credentials);
      const { user, token } = response.data;

      // Store token and user data
      localStorage.setItem('auth_token', token);
      localStorage.setItem('user_data', JSON.stringify(user));

      return { user, token };
    } catch (error) {
      throw error;
    }
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await api.post('/auth/register', data);
      const { user, token } = response.data;

      // Store token and user data
      localStorage.setItem('auth_token', token);
      localStorage.setItem('user_data', JSON.stringify(user));

      return { user, token };
    } catch (error) {
      throw error;
    }
  },

  async me(): Promise<User> {
    try {
      const response = await api.get('/user');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
  },

  isAuthenticated(): boolean {
    const token = localStorage.getItem('auth_token');
    return !!token;
  },

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  },

  getUser(): User | null {
    const userData = localStorage.getItem('user_data');
    if (userData) {
      try {
        return JSON.parse(userData);
      } catch {
        return null;
      }
    }
    return null;
  },
};

export default authService;
