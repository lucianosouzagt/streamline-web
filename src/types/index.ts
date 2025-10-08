// Tipos de usuário
export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  created_at: string;
  updated_at: string;
}

// Tipos de time
export interface Team {
  id: number;
  name: string;
  description?: string;
  created_at: string;
  updated_at: string;
  members?: User[];
  projects_count?: number;
}

// Tipos de projeto
export interface Project {
  id: number;
  name: string;
  description?: string;
  status: 'active' | 'completed' | 'on_hold' | 'cancelled';
  team_id: number;
  team?: Team;
  created_at: string;
  updated_at: string;
  tasks_count?: number;
  completed_tasks_count?: number;
  progress?: number;
}

// Tipos de tarefa
export interface Task {
  id: number;
  title: string;
  description?: string;
  status: 'todo' | 'in_progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  project_id: number;
  project?: Project;
  assigned_to?: number;
  assignee?: User;
  due_date?: string;
  created_at: string;
  updated_at: string;
}

// Tipos de autenticação
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// Tipos de API Response
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number;
  to: number;
}

// Tipos de filtros
export interface ProjectFilters {
  status?: Project['status'];
  team_id?: number;
  search?: string;
}

export interface TaskFilters {
  status?: Task['status'];
  priority?: Task['priority'];
  project_id?: number;
  assigned_to?: number;
  search?: string;
}

// Tipos de dashboard
export interface DashboardStats {
  total_projects: number;
  active_projects: number;
  total_tasks: number;
  completed_tasks: number;
  total_teams: number;
  recent_activities: Activity[];
}

export interface Activity {
  id: number;
  type: 'project_created' | 'task_completed' | 'team_joined' | 'task_assigned';
  description: string;
  user: User;
  created_at: string;
}

// Tipos de tema
export type Theme = 'light' | 'dark' | 'system';

// Tipos de notificação
export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
}

// Tipos para perfil do usuário
export interface UserProfile extends User {
  phone?: string;
  location?: string;
  bio?: string;
  role?: string;
  department?: string;
  join_date?: string;
  skills?: string[];
}

export interface UserStats {
  projects_count: number;
  tasks_count: number;
  completed_tasks_count: number;
  teams_count: number;
  hours_worked?: number;
}

export interface ProfileData {
  user: UserProfile;
  stats: UserStats;
  recent_activities: Activity[];
}

export interface ChangePasswordData {
  current_password: string;
  new_password: string;
  new_password_confirmation: string;
}

export interface UpdateProfileData {
  name?: string;
  email?: string;
  phone?: string;
  location?: string;
  bio?: string;
  skills?: string[];
}
