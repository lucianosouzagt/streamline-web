'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, 
  FolderOpen, 
  CheckSquare, 
  Clock,
  TrendingUp
} from 'lucide-react';
import type { UserStats } from '@/types';

interface ProfileStatsProps {
  stats: UserStats | null;
  isLoading: boolean;
}

export function ProfileStats({ stats, isLoading }: ProfileStatsProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 w-20 bg-muted animate-pulse rounded" />
              <div className="h-4 w-4 bg-muted animate-pulse rounded" />
            </CardHeader>
            <CardContent>
              <div className="h-8 w-16 bg-muted animate-pulse rounded mb-2" />
              <div className="h-3 w-24 bg-muted animate-pulse rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Não foi possível carregar as estatísticas</p>
      </div>
    );
  }

  const statsData = [
    {
      title: 'Equipes',
      value: stats.teams_count,
      icon: Users,
      description: 'Equipes participando',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      title: 'Projetos',
      value: stats.projects_count,
      icon: FolderOpen,
      description: 'Projetos ativos',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Tarefas',
      value: stats.tasks_count,
      icon: CheckSquare,
      description: 'Total de tarefas',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
  ];

  // Adicionar horas trabalhadas se disponível
  if (stats.hours_worked !== undefined) {
    statsData.push({
      title: 'Horas',
      value: stats.hours_worked,
      icon: Clock,
      description: 'Horas trabalhadas',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
    });
  }

  return (
    <div className="space-y-6">
      {/* Cards de estatísticas principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-full ${stat.bgColor}`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Card de resumo simplificado */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            Resumo de Atividades
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">
                {stats.projects_count + stats.teams_count}
              </div>
              <p className="text-sm text-muted-foreground">Projetos + Equipes</p>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-1">
                {stats.tasks_count}
              </div>
              <p className="text-sm text-muted-foreground">Total de Tarefas</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}