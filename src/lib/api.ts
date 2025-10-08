import axios, { AxiosError, AxiosResponse } from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

// Criar instância do axios
export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token nas requisições
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar respostas e erros
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    // Se receber 401, redirecionar para login
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');

      // Só redireciona se não estiver já na página de login
      if (
        typeof window !== 'undefined' &&
        !window.location.pathname.includes('/login')
      ) {
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default api;
