import api from './api';

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  created_at: string;
  updated_at: string;
  stats: UserStats;
  recent_activities: Activity[];
}

export interface UserStats {
  projects_count: number;
  tasks_count: number;
  teams_count: number;
  hours_logged: number;
  completed_tasks_count: number;
}

export interface Activity {
  id: number;
  type: 'task' | 'project' | 'team';
  title: string;
  description: string;
  timestamp: string;
}

export const profileService = {
  async getProfile(): Promise<UserProfile> {
    try {
      const response = await api.get('/user');
      const userData = response.data;
      
      // Mock stats and activities since they're not available in the API yet
      const mockStats: UserStats = {
        projects_count: 5,
        tasks_count: 23,
        teams_count: 3,
        hours_logged: 142,
        completed_tasks_count: 18,
      };

      const mockActivities: Activity[] = [
        {
          id: 1,
          type: 'task',
          title: 'Concluiu tarefa',
          description: 'Implementação do sistema de autenticação',
          timestamp: new Date().toISOString(),
        },
        {
          id: 2,
          type: 'project',
          title: 'Criou projeto',
          description: 'Sistema de Gestão de Tarefas',
          timestamp: new Date(Date.now() - 86400000).toISOString(),
        },
      ];

      return {
        ...userData,
        created_at: userData.created_at || new Date().toISOString(),
        updated_at: userData.updated_at || new Date().toISOString(),
        stats: mockStats,
        recent_activities: mockActivities,
      };
    } catch (error) {
      throw error;
    }
  },

  async getUserInfo(): Promise<UserProfile> {
    try {
      const response = await api.get('/user');
      const userData = response.data;
      
      return {
        ...userData,
        created_at: userData.created_at || new Date().toISOString(),
        updated_at: userData.updated_at || new Date().toISOString(),
        stats: {
          projects_count: 0,
          tasks_count: 0,
          teams_count: 0,
          hours_logged: 0,
          completed_tasks_count: 0,
        },
        recent_activities: [],
      };
    } catch (error) {
      throw error;
    }
  },

  async getStats(): Promise<UserStats> {
    try {
      // Mock stats since the API doesn't have this endpoint yet
      return {
        projects_count: 5,
        tasks_count: 23,
        teams_count: 3,
        hours_logged: 142,
        completed_tasks_count: 18,
      };
    } catch (error) {
      throw error;
    }
  },

  async getActivities(): Promise<Activity[]> {
    try {
      // Mock activities since the API doesn't have this endpoint yet
      return [
        {
          id: 1,
          type: 'task',
          title: 'Concluiu tarefa',
          description: 'Implementação do sistema de autenticação',
          timestamp: new Date().toISOString(),
        },
        {
          id: 2,
          type: 'project',
          title: 'Criou projeto',
          description: 'Sistema de Gestão de Tarefas',
          timestamp: new Date(Date.now() - 86400000).toISOString(),
        },
        {
          id: 3,
          type: 'team',
          title: 'Entrou na equipe',
          description: 'Equipe de Desenvolvimento Frontend',
          timestamp: new Date(Date.now() - 172800000).toISOString(),
        },
      ];
    } catch (error) {
      throw error;
    }
  },

};