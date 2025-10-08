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
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  Edit,
  Save,
  Camera,
  Shield,
  Bell,
  Lock,
  Activity,
  Clock,
  CheckCircle2,
} from 'lucide-react';

// Mock user data
const userData = {
  id: 1,
  name: 'João Silva',
  email: 'joao.silva@company.com',
  phone: '+55 11 99999-0001',
  location: 'São Paulo, SP',
  avatar: '/avatars/joao.jpg',
  initials: 'JS',
  role: 'Tech Lead Frontend',
  department: 'Desenvolvimento',
  joinDate: '2022-03-15',
  bio: 'Desenvolvedor frontend especializado em React e TypeScript com mais de 5 anos de experiência. Apaixonado por criar interfaces intuitivas e performáticas.',
  skills: [
    'React',
    'TypeScript',
    'Next.js',
    'Tailwind CSS',
    'Node.js',
    'GraphQL',
  ],
  stats: {
    projectsCompleted: 12,
    tasksCompleted: 156,
    hoursWorked: 1240,
    teamMembers: 5,
  },
  recentActivity: [
    {
      id: 1,
      type: 'task_completed',
      description: 'Concluiu a tarefa "Implementar autenticação JWT"',
      date: '2024-02-08',
      project: 'Sistema de E-commerce',
    },
    {
      id: 2,
      type: 'project_created',
      description: 'Criou o projeto "Dashboard Analytics"',
      date: '2024-02-07',
      project: 'Dashboard Analytics',
    },
    {
      id: 3,
      type: 'team_joined',
      description: 'Entrou no time de Desenvolvimento Frontend',
      date: '2024-02-05',
      project: null,
    },
    {
      id: 4,
      type: 'task_assigned',
      description: 'Foi atribuído à tarefa "Design da tela de checkout"',
      date: '2024-02-04',
      project: 'Sistema de E-commerce',
    },
  ],
};

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'task_completed':
      return <CheckCircle2 className="h-4 w-4 text-green-600" />;
    case 'project_created':
      return <Briefcase className="h-4 w-4 text-blue-600" />;
    case 'team_joined':
      return <User className="h-4 w-4 text-purple-600" />;
    case 'task_assigned':
      return <Clock className="h-4 w-4 text-orange-600" />;
    default:
      return <Activity className="h-4 w-4 text-gray-500" />;
  }
};

export default function ProfilePage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Meu Perfil</h1>
            <p className="text-muted-foreground">
              Gerencie suas informações pessoais e configurações
            </p>
          </div>
          <Button>
            <Edit className="mr-2 h-4 w-4" />
            Editar Perfil
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Profile Card */}
          <div className="md:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <div className="relative mx-auto">
                  <Avatar className="mx-auto h-24 w-24">
                    <AvatarImage src={userData.avatar} />
                    <AvatarFallback className="text-2xl">
                      {userData.initials}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="icon"
                    variant="outline"
                    className="absolute -right-2 -bottom-2 h-8 w-8 rounded-full"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  <CardTitle className="text-xl">{userData.name}</CardTitle>
                  <CardDescription>{userData.role}</CardDescription>
                  <Badge variant="secondary">{userData.department}</Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <Mail className="text-muted-foreground h-4 w-4" />
                    <span>{userData.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="text-muted-foreground h-4 w-4" />
                    <span>{userData.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="text-muted-foreground h-4 w-4" />
                    <span>{userData.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="text-muted-foreground h-4 w-4" />
                    <span>Desde {userData.joinDate}</span>
                  </div>
                </div>

                {/* Bio */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Sobre</Label>
                  <p className="text-muted-foreground text-sm">
                    {userData.bio}
                  </p>
                </div>

                {/* Skills */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Habilidades</Label>
                  <div className="flex flex-wrap gap-1">
                    {userData.skills.map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="space-y-6 md:col-span-2">
            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Briefcase className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-2xl font-bold">
                        {userData.stats.projectsCompleted}
                      </p>
                      <p className="text-muted-foreground text-xs">Projetos</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="text-2xl font-bold">
                        {userData.stats.tasksCompleted}
                      </p>
                      <p className="text-muted-foreground text-xs">Tarefas</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-orange-600" />
                    <div>
                      <p className="text-2xl font-bold">
                        {userData.stats.hoursWorked}
                      </p>
                      <p className="text-muted-foreground text-xs">Horas</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <User className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="text-2xl font-bold">
                        {userData.stats.teamMembers}
                      </p>
                      <p className="text-muted-foreground text-xs">Equipe</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle>Informações Pessoais</CardTitle>
                <CardDescription>
                  Atualize suas informações de contato e perfil
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome Completo</Label>
                    <Input id="name" defaultValue={userData.name} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue={userData.email}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input id="phone" defaultValue={userData.phone} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Localização</Label>
                    <Input id="location" defaultValue={userData.location} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Sobre você</Label>
                  <textarea
                    id="bio"
                    className="border-input bg-background focus:ring-ring min-h-[100px] w-full resize-none rounded-md border px-3 py-2 text-sm focus:ring-2 focus:ring-offset-2 focus:outline-none"
                    defaultValue={userData.bio}
                  />
                </div>
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Salvar Alterações
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Atividade Recente</CardTitle>
                <CardDescription>Suas últimas ações no sistema</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userData.recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start space-x-3"
                    >
                      <div className="mt-1">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm">{activity.description}</p>
                        <div className="text-muted-foreground flex items-center space-x-2 text-xs">
                          <span>{activity.date}</span>
                          {activity.project && (
                            <>
                              <span>•</span>
                              <span>{activity.project}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid gap-4 md:grid-cols-3">
              <Card className="cursor-pointer transition-shadow hover:shadow-md">
                <CardContent className="p-4 text-center">
                  <Shield className="mx-auto mb-2 h-8 w-8 text-blue-600" />
                  <h3 className="font-medium">Segurança</h3>
                  <p className="text-muted-foreground text-xs">Alterar senha</p>
                </CardContent>
              </Card>

              <Card className="cursor-pointer transition-shadow hover:shadow-md">
                <CardContent className="p-4 text-center">
                  <Bell className="mx-auto mb-2 h-8 w-8 text-green-600" />
                  <h3 className="font-medium">Notificações</h3>
                  <p className="text-muted-foreground text-xs">
                    Configurar alertas
                  </p>
                </CardContent>
              </Card>

              <Card className="cursor-pointer transition-shadow hover:shadow-md">
                <CardContent className="p-4 text-center">
                  <Lock className="mx-auto mb-2 h-8 w-8 text-orange-600" />
                  <h3 className="font-medium">Privacidade</h3>
                  <p className="text-muted-foreground text-xs">
                    Gerenciar dados
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
