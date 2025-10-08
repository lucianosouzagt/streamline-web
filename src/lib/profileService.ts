import { api } from './api';
import type { 
  ProfileData, 
  UserProfile, 
  UserStats, 
  ChangePasswordData, 
  UpdateProfileData,
  ApiResponse 
} from '@/types';

export const profileService = {
  // Buscar dados completos do perfil
  async getProfile(): Promise<ProfileData> {
    console.log('👤 Buscando dados do perfil do usuário');
    
    try {
      // Como não existe endpoint /profile, vamos buscar dados do usuário e criar mock para stats
      const userResponse = await api.get('/user');
      const userData = userResponse.data;
      
      // Criar estrutura ProfileData com dados reais do usuário e stats mock
       const profileData: ProfileData = {
         user: {
           id: userData.id,
           name: userData.name,
           email: userData.email,
           avatar: userData.avatar || undefined,
           role: userData.role || 'Desenvolvedor',
           department: userData.department || 'Tecnologia',
           join_date: userData.created_at,
           phone: userData.phone || undefined,
           location: userData.location || undefined,
           bio: userData.bio || undefined,
           skills: userData.skills || [],
           created_at: userData.created_at,
           updated_at: userData.updated_at
         },
         stats: {
           projects_count: 0, // Mock - backend não tem esses dados ainda
           tasks_count: 0,
           teams_count: 0,
           hours_worked: 0,
           completed_tasks_count: 0
         },
         recent_activities: [] // Mock - backend não tem esses dados ainda
       };
      
      console.log('✅ Dados do perfil carregados com sucesso');
      return profileData;
    } catch (error) {
      console.error('❌ Erro ao buscar dados do perfil:', error);
      throw error;
    }
  },

  // Buscar apenas informações do usuário
  async getUserInfo(): Promise<UserProfile> {
    console.log('👤 Buscando informações do usuário');
    
    try {
      const response = await api.get('/user');
      const userData = response.data;
      
      // Mapear dados da API para UserProfile
       const userProfile: UserProfile = {
         id: userData.id,
         name: userData.name,
         email: userData.email,
         avatar: userData.avatar || undefined,
         role: userData.role || 'Desenvolvedor',
         department: userData.department || 'Tecnologia',
         join_date: userData.created_at,
         phone: userData.phone || undefined,
         location: userData.location || undefined,
         bio: userData.bio || undefined,
         skills: userData.skills || [],
         created_at: userData.created_at,
         updated_at: userData.updated_at
       };
      
      console.log('✅ Informações do usuário carregadas');
      return userProfile;
    } catch (error) {
      console.error('❌ Erro ao buscar informações do usuário:', error);
      throw error;
    }
  },

  // Buscar apenas estatísticas
  async getStats(): Promise<UserStats> {
    console.log('📊 Buscando estatísticas do usuário');
    
    try {
      // Como não existe endpoint de stats, retornar dados mock por enquanto
       // TODO: Implementar endpoints de stats no backend
       const stats: UserStats = {
         projects_count: 0,
         tasks_count: 0,
         teams_count: 0,
         hours_worked: 0,
         completed_tasks_count: 0
       };
      
      console.log('✅ Estatísticas carregadas (dados mock)');
      return stats;
    } catch (error) {
      console.error('❌ Erro ao buscar estatísticas:', error);
      throw error;
    }
  },

  // Atualizar informações do perfil
  async updateProfile(data: UpdateProfileData): Promise<UserProfile> {
    console.log('📝 Atualizando perfil do usuário');
    
    try {
      const response = await api.put<ApiResponse<UserProfile>>('/profile', data);
      console.log('✅ Perfil atualizado com sucesso');
      return response.data.data;
    } catch (error) {
      console.error('❌ Erro ao atualizar perfil:', error);
      throw error;
    }
  },

  // Alterar senha
  async changePassword(data: ChangePasswordData): Promise<void> {
    console.log('🔒 Alterando senha do usuário');
    
    try {
      await api.put<ApiResponse<null>>('/profile/password', data);
      console.log('✅ Senha alterada com sucesso');
    } catch (error) {
      console.error('❌ Erro ao alterar senha:', error);
      throw error;
    }
  },

  // Upload de avatar
  async uploadAvatar(file: File): Promise<UserProfile> {
    console.log('📷 Fazendo upload do avatar');
    
    const formData = new FormData();
    formData.append('avatar', file);
    
    try {
      const response = await api.post<ApiResponse<UserProfile>>('/profile/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('✅ Avatar atualizado com sucesso');
      return response.data.data;
    } catch (error) {
      console.error('❌ Erro ao fazer upload do avatar:', error);
      throw error;
    }
  },
};