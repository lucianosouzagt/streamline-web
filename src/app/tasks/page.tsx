'use client';

import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Plus,
  Search,
  Filter,
  Calendar,
  Clock,
  CheckCircle2,
  Circle,
  MoreHorizontal,
  Edit,
  Trash2,
  User,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Mock data
const tasks = [
  {
    id: 1,
    title: 'Implementar autenticação JWT',
    description:
      'Configurar sistema de autenticação com tokens JWT para segurança da API',
    status: 'Em Progresso',
    priority: 'Alta',
    project: 'Sistema de E-commerce',
    assignee: {
      name: 'João Silva',
      avatar: '/avatars/joao.jpg',
      initials: 'JS',
    },
    dueDate: '2024-02-10',
    createdAt: '2024-02-05',
    estimatedHours: 8,
    completedHours: 5,
  },
  {
    id: 2,
    title: 'Design da tela de checkout',
    description:
      'Criar interface de usuário para processo de finalização de compra',
    status: 'Pendente',
    priority: 'Média',
    project: 'Sistema de E-commerce',
    assignee: {
      name: 'Maria Santos',
      avatar: '/avatars/maria.jpg',
      initials: 'MS',
    },
    dueDate: '2024-02-12',
    createdAt: '2024-02-06',
    estimatedHours: 6,
    completedHours: 0,
  },
  {
    id: 3,
    title: 'Configurar CI/CD pipeline',
    description: 'Implementar pipeline de integração e deploy contínuo',
    status: 'Concluída',
    priority: 'Alta',
    project: 'App Mobile Delivery',
    assignee: {
      name: 'Pedro Costa',
      avatar: '/avatars/pedro.jpg',
      initials: 'PC',
    },
    dueDate: '2024-02-08',
    createdAt: '2024-02-01',
    estimatedHours: 12,
    completedHours: 12,
  },
  {
    id: 4,
    title: 'Otimizar consultas do banco',
    description: 'Melhorar performance das queries mais utilizadas',
    status: 'Em Progresso',
    priority: 'Média',
    project: 'Dashboard Analytics',
    assignee: {
      name: 'Ana Oliveira',
      avatar: '/avatars/ana.jpg',
      initials: 'AO',
    },
    dueDate: '2024-02-15',
    createdAt: '2024-02-03',
    estimatedHours: 10,
    completedHours: 3,
  },
  {
    id: 5,
    title: 'Implementar notificações push',
    description: 'Sistema de notificações em tempo real para usuários',
    status: 'Pendente',
    priority: 'Baixa',
    project: 'App Mobile Delivery',
    assignee: {
      name: 'Carlos Mendes',
      avatar: '/avatars/carlos.jpg',
      initials: 'CM',
    },
    dueDate: '2024-02-20',
    createdAt: '2024-02-07',
    estimatedHours: 15,
    completedHours: 0,
  },
  {
    id: 6,
    title: 'Testes unitários da API',
    description: 'Criar cobertura de testes para endpoints principais',
    status: 'Em Progresso',
    priority: 'Alta',
    project: 'Sistema CRM',
    assignee: {
      name: 'Lucia Ferreira',
      avatar: '/avatars/lucia.jpg',
      initials: 'LF',
    },
    dueDate: '2024-02-11',
    createdAt: '2024-02-04',
    estimatedHours: 20,
    completedHours: 8,
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Concluída':
      return 'default';
    case 'Em Progresso':
      return 'secondary';
    case 'Pendente':
      return 'outline';
    default:
      return 'outline';
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'Alta':
      return 'destructive';
    case 'Média':
      return 'secondary';
    case 'Baixa':
      return 'outline';
    default:
      return 'outline';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'Concluída':
      return <CheckCircle2 className="h-4 w-4 text-green-600" />;
    case 'Em Progresso':
      return <Clock className="h-4 w-4 text-blue-600" />;
    case 'Pendente':
      return <Circle className="h-4 w-4 text-gray-400" />;
    default:
      return <Circle className="h-4 w-4 text-gray-400" />;
  }
};

export default function TasksPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Tarefas</h1>
            <p className="text-muted-foreground">
              Gerencie suas tarefas e acompanhe o progresso
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nova Tarefa
          </Button>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-4">
          <div className="relative max-w-sm flex-1">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input placeholder="Buscar tarefas..." className="pl-10" />
          </div>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filtros
          </Button>
        </div>

        {/* Tasks List */}
        <div className="space-y-4">
          {tasks.map((task) => (
            <Card key={task.id} className="transition-shadow hover:shadow-md">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  {/* Status Icon */}
                  <div className="mt-1">{getStatusIcon(task.status)}</div>

                  {/* Task Content */}
                  <div className="flex-1 space-y-3">
                    {/* Title and Actions */}
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <h3 className="text-lg font-semibold">{task.title}</h3>
                        <p className="text-muted-foreground text-sm">
                          {task.description}
                        </p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    {/* Badges */}
                    <div className="flex items-center space-x-2">
                      <Badge variant={getStatusColor(task.status)}>
                        {task.status}
                      </Badge>
                      <Badge variant={getPriorityColor(task.priority)}>
                        {task.priority}
                      </Badge>
                      <Badge variant="outline">{task.project}</Badge>
                    </div>

                    {/* Task Details */}
                    <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-4">
                      {/* Assignee */}
                      <div className="flex items-center space-x-2">
                        <User className="text-muted-foreground h-4 w-4" />
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={task.assignee.avatar} />
                          <AvatarFallback className="text-xs">
                            {task.assignee.initials}
                          </AvatarFallback>
                        </Avatar>
                        <span>{task.assignee.name}</span>
                      </div>

                      {/* Due Date */}
                      <div className="flex items-center space-x-2">
                        <Calendar className="text-muted-foreground h-4 w-4" />
                        <span>Prazo: {task.dueDate}</span>
                      </div>

                      {/* Progress */}
                      <div className="flex items-center space-x-2">
                        <Clock className="text-muted-foreground h-4 w-4" />
                        <span>
                          {task.completedHours}h / {task.estimatedHours}h
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Progresso</span>
                          <span>
                            {Math.round(
                              (task.completedHours / task.estimatedHours) * 100
                            )}
                            %
                          </span>
                        </div>
                        <div className="bg-secondary h-2 w-full rounded-full">
                          <div
                            className="bg-primary h-2 rounded-full transition-all"
                            style={{
                              width: `${(task.completedHours / task.estimatedHours) * 100}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
