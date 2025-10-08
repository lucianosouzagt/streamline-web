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
import { Input } from '@/components/ui/input';
import {
  Plus,
  Search,
  Filter,
  Calendar,
  Users,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Mock data
const projects = [
  {
    id: 1,
    name: 'Sistema de E-commerce',
    description:
      'Plataforma completa de vendas online com painel administrativo',
    status: 'Em Progresso',
    priority: 'Alta',
    progress: 75,
    startDate: '2024-01-15',
    dueDate: '2024-02-15',
    teamSize: 5,
    budget: 'R$ 50.000',
    client: 'TechCorp Ltd.',
  },
  {
    id: 2,
    name: 'App Mobile Delivery',
    description: 'Aplicativo de delivery com geolocalização e pagamentos',
    status: 'Planejamento',
    priority: 'Média',
    progress: 25,
    startDate: '2024-02-01',
    dueDate: '2024-03-01',
    teamSize: 3,
    budget: 'R$ 35.000',
    client: 'FoodChain Inc.',
  },
  {
    id: 3,
    name: 'Dashboard Analytics',
    description: 'Painel de análise de dados com relatórios em tempo real',
    status: 'Concluído',
    priority: 'Alta',
    progress: 100,
    startDate: '2023-12-01',
    dueDate: '2024-01-30',
    teamSize: 4,
    budget: 'R$ 40.000',
    client: 'DataViz Solutions',
  },
  {
    id: 4,
    name: 'Sistema CRM',
    description: 'Gestão de relacionamento com clientes e pipeline de vendas',
    status: 'Em Progresso',
    priority: 'Média',
    progress: 60,
    startDate: '2024-01-10',
    dueDate: '2024-02-28',
    teamSize: 6,
    budget: 'R$ 60.000',
    client: 'SalesPro Ltd.',
  },
  {
    id: 5,
    name: 'Portal Educacional',
    description: 'Plataforma de ensino online com videoaulas e exercícios',
    status: 'Pausado',
    priority: 'Baixa',
    progress: 40,
    startDate: '2023-11-15',
    dueDate: '2024-03-15',
    teamSize: 3,
    budget: 'R$ 30.000',
    client: 'EduTech Academy',
  },
  {
    id: 6,
    name: 'API Gateway',
    description: 'Microserviços com autenticação e rate limiting',
    status: 'Em Progresso',
    priority: 'Alta',
    progress: 85,
    startDate: '2024-01-05',
    dueDate: '2024-02-10',
    teamSize: 2,
    budget: 'R$ 25.000',
    client: 'MicroSoft Corp.',
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Concluído':
      return 'default';
    case 'Em Progresso':
      return 'secondary';
    case 'Planejamento':
      return 'outline';
    case 'Pausado':
      return 'destructive';
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

export default function ProjectsPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Projetos</h1>
            <p className="text-muted-foreground">
              Gerencie todos os seus projetos em um só lugar
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Novo Projeto
          </Button>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-4">
          <div className="relative max-w-sm flex-1">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input placeholder="Buscar projetos..." className="pl-10" />
          </div>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filtros
          </Button>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="transition-shadow hover:shadow-md"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{project.name}</CardTitle>
                    <CardDescription className="text-sm">
                      {project.description}
                    </CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        Visualizar
                      </DropdownMenuItem>
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
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Status and Priority */}
                <div className="flex items-center space-x-2">
                  <Badge variant={getStatusColor(project.status)}>
                    {project.status}
                  </Badge>
                  <Badge variant={getPriorityColor(project.priority)}>
                    {project.priority}
                  </Badge>
                </div>

                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progresso</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="bg-secondary h-2 w-full rounded-full">
                    <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>

                {/* Project Info */}
                <div className="text-muted-foreground space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4" />
                      <span>Prazo</span>
                    </div>
                    <span>{project.dueDate}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Users className="mr-2 h-4 w-4" />
                      <span>Equipe</span>
                    </div>
                    <span>{project.teamSize} membros</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span>Cliente</span>
                    <span className="font-medium">{project.client}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span>Orçamento</span>
                    <span className="font-medium">{project.budget}</span>
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
