'use client';

import { useState, useEffect } from 'react';
import { profileService } from '@/lib/profileService';
import type { 
  ProfileData, 
  UserProfile, 
  UserStats, 
  ChangePasswordData, 
  UpdateProfileData 
} from '@/types';

export interface UseProfileReturn {
  // Estados
  profile: ProfileData | null;
  userInfo: UserProfile | null;
  stats: UserStats | null;
  isLoading: boolean;
  error: string | null;

  // Ações
  fetchProfile: () => Promise<void>;
  fetchUserInfo: () => Promise<void>;
  fetchStats: () => Promise<void>;
  updateProfile: (data: UpdateProfileData) => Promise<void>;
  changePassword: (data: ChangePasswordData) => Promise<void>;
  uploadAvatar: (file: File) => Promise<void>;
  clearError: () => void;
}

export function useProfile(): UseProfileReturn {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [userInfo, setUserInfo] = useState<UserProfile | null>(null);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Buscar dados completos do perfil
  const fetchProfile = async () => {
    console.log('🔄 useProfile: Buscando dados do perfil');
    setIsLoading(true);
    setError(null);

    try {
      const data = await profileService.getProfile();
      setProfile(data);
      setUserInfo(data.user);
      setStats(data.stats);
      console.log('✅ useProfile: Dados do perfil carregados');
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Erro ao carregar perfil';
      setError(errorMessage);
      console.error('❌ useProfile: Erro ao carregar perfil:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Buscar apenas informações do usuário
  const fetchUserInfo = async () => {
    console.log('🔄 useProfile: Carregando informações do usuário');
    setIsLoading(true);
    setError(null);

    try {
      const data = await profileService.getUserInfo();
      setUserInfo(data);
      console.log('✅ useProfile: Informações do usuário carregadas');
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Erro ao carregar informações do usuário';
      setError(errorMessage);
      console.error('❌ useProfile: Erro ao buscar informações do usuário:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Buscar apenas estatísticas
  const fetchStats = async () => {
    console.log('🔄 useProfile: Carregando estatísticas');
    setIsLoading(true);
    setError(null);

    try {
      const data = await profileService.getStats();
      setStats(data);
      console.log('✅ useProfile: Estatísticas carregadas');
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Erro ao carregar estatísticas';
      setError(errorMessage);
      console.error('❌ useProfile: Erro ao buscar estatísticas:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Atualizar perfil
  const updateProfile = async (data: UpdateProfileData) => {
    console.log('🔄 useProfile: Atualizando perfil');
    setIsLoading(true);
    setError(null);

    try {
      const updatedUser = await profileService.updateProfile(data);
      setUserInfo(updatedUser);
      
      // Atualizar também no profile completo se existir
      if (profile) {
        setProfile({
          ...profile,
          user: updatedUser,
        });
      }
      
      console.log('✅ useProfile: Perfil atualizado');
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Erro ao atualizar perfil';
      setError(errorMessage);
      console.error('❌ useProfile: Erro ao atualizar perfil:', err);
      throw err; // Re-throw para permitir tratamento no componente
    } finally {
      setIsLoading(false);
    }
  };

  // Alterar senha
  const changePassword = async (data: ChangePasswordData) => {
    console.log('🔄 useProfile: Alterando senha');
    setIsLoading(true);
    setError(null);

    try {
      await profileService.changePassword(data);
      console.log('✅ useProfile: Senha alterada');
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Erro ao alterar senha';
      setError(errorMessage);
      console.error('❌ useProfile: Erro ao alterar senha:', err);
      throw err; // Re-throw para permitir tratamento no componente
    } finally {
      setIsLoading(false);
    }
  };

  // Upload de avatar
  const uploadAvatar = async (file: File) => {
    console.log('🔄 useProfile: Fazendo upload do avatar');
    setIsLoading(true);
    setError(null);

    try {
      const updatedUser = await profileService.uploadAvatar(file);
      setUserInfo(updatedUser);
      
      // Atualizar também no profile completo se existir
      if (profile) {
        setProfile({
          ...profile,
          user: updatedUser,
        });
      }
      
      console.log('✅ useProfile: Avatar atualizado');
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Erro ao fazer upload do avatar';
      setError(errorMessage);
      console.error('❌ useProfile: Erro no upload do avatar:', err);
      throw err; // Re-throw para permitir tratamento no componente
    } finally {
      setIsLoading(false);
    }
  };

  // Limpar erro
  const clearError = () => {
    setError(null);
  };

  // Carregar dados do perfil ao montar o componente
  useEffect(() => {
    fetchProfile();
  }, []);

  return {
    // Estados
    profile,
    userInfo,
    stats,
    isLoading,
    error,

    // Ações
    fetchProfile,
    fetchUserInfo,
    fetchStats,
    updateProfile,
    changePassword,
    uploadAvatar,
    clearError,
  };
}