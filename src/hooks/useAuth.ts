import { useState, useEffect } from 'react';
import { User, LoginCredentials, RegisterData, AuthResponse } from '@/types';
import { authService } from '@/lib/auth';

export interface UseAuthReturn {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<AuthResponse>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Verificar autenticação ao carregar
  useEffect(() => {
    const checkAuth = async () => {
      if (authService.isAuthenticated()) {
        try {
          const userData = await authService.me();
          setUser(userData);
        } catch {
          // If token is invalid, clear it
          authService.logout();
          setUser(null);
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (
    credentials: LoginCredentials
  ): Promise<AuthResponse> => {
    console.log('🎯 useAuth: Iniciando processo de login');
    setIsLoading(true);
    try {
      const response = await authService.login(credentials);
      console.log('🎯 useAuth: Login bem-sucedido, atualizando estado');
      setUser(response.user);
      return response;
    } catch (error) {
      console.error('🎯 useAuth: Erro no login:', error);
      // Error handling can be added here
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    setIsLoading(true);
    try {
      const response = await authService.register(data);
      setUser(response.user);
    } catch (error) {
      // Error handling can be added here
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    console.log('🎯 useAuth: Iniciando logout');
    setIsLoading(true);
    try {
      await authService.logout();
      console.log('🎯 useAuth: Logout concluído, limpando estado');
      setUser(null);
    } catch (error) {
      console.error('🎯 useAuth: Erro no logout:', error);
      // Mesmo com erro, limpar estado local
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshUser = async () => {
    try {
      const userData = await authService.me();
      setUser(userData);
    } catch {
      // Error handling can be added here
      setUser(null);
    }
  };

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    refreshUser,
  };
}
