'use client';

import { MainLayout } from '@/components/layout/MainLayout';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Users,
  FolderOpen,
  Clock,
  Plus,
  CheckCircle,
  TrendingUp,
} from 'lucide-react';

// Mock data - em produção viria da API
const dashboardStats = {
  totalProjects: 12,
  activeTasks: 28,
  completedTasks: 156,
  teamMembers: 8,
  projectsThisMonth: 3,
  tasksCompletedThisWeek: 24,
};

const recentProjects = [
  {
    id: 1,
    name: 'Sistema de E-commerce',
    status: 'Em Progresso',
    progress: 75,
    dueDate: '2024-02-15',
    team: 5,
  },
  {
    id: 2,
    name: 'App Mobile Delivery',
    status: 'Planejamento',
    progress: 25,
    dueDate: '2024-03-01',
    team: 3,
  },
  {
    id: 3,
    name: 'Dashboard Analytics',
    status: 'Concluído',
    progress: 100,
    dueDate: '2024-01-30',
    team: 4,
  },
];

const recentTasks = [
  {
    id: 1,
    title: 'Implementar autenticação JWT',
    project: 'Sistema de E-commerce',
    priority: 'Alta',
    dueDate: '2024-02-10',
    assignee: 'João Silva',
  },
  {
    id: 2,
    title: 'Design da tela de checkout',
    project: 'Sistema de E-commerce',
    priority: 'Média',
    dueDate: '2024-02-12',
    assignee: 'Maria Santos',
  },
  {
    id: 3,
    title: 'Configurar CI/CD pipeline',
    project: 'App Mobile Delivery',
    priority: 'Alta',
    dueDate: '2024-02-08',
    assignee: 'Pedro Costa',
  },
];

export default function DashboardPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Visão geral dos seus projetos e tarefas
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Novo Projeto
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Projetos Ativos
              </CardTitle>
              <FolderOpen className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {dashboardStats.totalProjects}
              </div>
              <p className="text-muted-foreground text-xs">
                +{dashboardStats.projectsThisMonth} este mês
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Tarefas Pendentes
              </CardTitle>
              <Clock className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {dashboardStats.activeTasks}
              </div>
              <p className="text-muted-foreground text-xs">
                {dashboardStats.tasksCompletedThisWeek} concluídas esta semana
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Tarefas Concluídas
              </CardTitle>
              <CheckCircle className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {dashboardStats.completedTasks}
              </div>
              <p className="text-muted-foreground text-xs">
                <TrendingUp className="mr-1 inline h-3 w-3" />
                +12% vs mês anterior
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Membros da Equipe
              </CardTitle>
              <Users className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {dashboardStats.teamMembers}
              </div>
              <p className="text-muted-foreground text-xs">Ativos no sistema</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Projects and Tasks */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Recent Projects */}
          <Card>
            <CardHeader>
              <CardTitle>Projetos Recentes</CardTitle>
              <CardDescription>Seus projetos mais atualizados</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentProjects.map((project) => (
                <div key={project.id} className="flex items-center space-x-4">
                  <div className="flex-1 space-y-1">
                    <p className="text-sm leading-none font-medium">
                      {project.name}
                    </p>
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant={
                          project.status === 'Concluído'
                            ? 'default'
                            : project.status === 'Em Progresso'
                              ? 'secondary'
                              : 'outline'
                        }
                      >
                        {project.status}
                      </Badge>
                      <span className="text-muted-foreground text-xs">
                        {project.team} membros
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{project.progress}%</p>
                    <p className="text-muted-foreground text-xs">
                      {project.dueDate}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Tasks */}
          <Card>
            <CardHeader>
              <CardTitle>Tarefas Recentes</CardTitle>
              <CardDescription>Últimas tarefas atribuídas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentTasks.map((task) => (
                <div key={task.id} className="flex items-center space-x-4">
                  <div className="flex-1 space-y-1">
                    <p className="text-sm leading-none font-medium">
                      {task.title}
                    </p>
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant={
                          task.priority === 'Alta'
                            ? 'destructive'
                            : task.priority === 'Média'
                              ? 'secondary'
                              : 'outline'
                        }
                      >
                        {task.priority}
                      </Badge>
                      <span className="text-muted-foreground text-xs">
                        {task.project}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium">{task.assignee}</p>
                    <p className="text-muted-foreground text-xs">
                      {task.dueDate}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
