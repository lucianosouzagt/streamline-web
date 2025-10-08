import axios, { AxiosError, AxiosResponse } from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

console.log('🔧 Configuração da API:', { API_URL });

// Criar instância do axios
export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest', // Importante para Laravel identificar como AJAX
  },
  withCredentials: false, // Sem necessidade de cookies CSRF
});

// Interceptor para adicionar token nas requisições
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('🔑 Token adicionado à requisição');
    }
    console.log(
      '📤 Fazendo requisição para:',
      `${config.baseURL || ''}${config.url || ''}`
    );
    return config;
  },
  (error) => {
    console.error('❌ Erro no interceptor de requisição:', error);
    return Promise.reject(error);
  }
);

// Interceptor para tratar respostas e erros
api.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log('📥 Resposta recebida:', response.status, response.statusText);
    return response;
  },
  (error: AxiosError) => {
    console.error(
      '❌ Erro na resposta:',
      error.response?.status,
      error.response?.data
    );

    // Se receber 401, redirecionar para página inicial (login)
    if (error.response?.status === 401) {
      console.log('🚪 Token inválido, limpando dados e redirecionando...');
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');

      // Só redireciona se não estiver já na página inicial
      if (
        typeof window !== 'undefined' &&
        window.location.pathname !== '/'
      ) {
        window.location.href = '/';
      }
    }

    return Promise.reject(error);
  }
);

export default api;
