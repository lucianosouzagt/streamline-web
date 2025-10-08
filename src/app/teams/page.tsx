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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Plus,
  Search,
  Filter,
  Users,
  Mail,
  Phone,
  MapPin,
  MoreHorizontal,
  Edit,
  Trash2,
  UserPlus,
  Crown,
  Shield,
  User,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Mock data
const teams = [
  {
    id: 1,
    name: 'Desenvolvimento Frontend',
    description: 'Equipe responsável pela interface e experiência do usuário',
    memberCount: 5,
    projectCount: 3,
    lead: {
      name: 'João Silva',
      avatar: '/avatars/joao.jpg',
      initials: 'JS',
    },
    members: [
      {
        id: 1,
        name: 'João Silva',
        role: 'Tech Lead',
        email: 'joao.silva@company.com',
        phone: '+55 11 99999-0001',
        location: 'São Paulo, SP',
        avatar: '/avatars/joao.jpg',
        initials: 'JS',
        status: 'Ativo',
        isLead: true,
      },
      {
        id: 2,
        name: 'Maria Santos',
        role: 'Frontend Developer',
        email: 'maria.santos@company.com',
        phone: '+55 11 99999-0002',
        location: 'Rio de Janeiro, RJ',
        avatar: '/avatars/maria.jpg',
        initials: 'MS',
        status: 'Ativo',
        isLead: false,
      },
      {
        id: 3,
        name: 'Pedro Costa',
        role: 'UI/UX Designer',
        email: 'pedro.costa@company.com',
        phone: '+55 11 99999-0003',
        location: 'Belo Horizonte, MG',
        avatar: '/avatars/pedro.jpg',
        initials: 'PC',
        status: 'Ativo',
        isLead: false,
      },
      {
        id: 4,
        name: 'Ana Oliveira',
        role: 'Frontend Developer',
        email: 'ana.oliveira@company.com',
        phone: '+55 11 99999-0004',
        location: 'Porto Alegre, RS',
        avatar: '/avatars/ana.jpg',
        initials: 'AO',
        status: 'Férias',
        isLead: false,
      },
      {
        id: 5,
        name: 'Carlos Mendes',
        role: 'Junior Developer',
        email: 'carlos.mendes@company.com',
        phone: '+55 11 99999-0005',
        location: 'Salvador, BA',
        avatar: '/avatars/carlos.jpg',
        initials: 'CM',
        status: 'Ativo',
        isLead: false,
      },
    ],
  },
  {
    id: 2,
    name: 'Desenvolvimento Backend',
    description: 'Equipe responsável pela API e infraestrutura',
    memberCount: 4,
    projectCount: 5,
    lead: {
      name: 'Lucia Ferreira',
      avatar: '/avatars/lucia.jpg',
      initials: 'LF',
    },
    members: [
      {
        id: 6,
        name: 'Lucia Ferreira',
        role: 'Backend Lead',
        email: 'lucia.ferreira@company.com',
        phone: '+55 11 99999-0006',
        location: 'São Paulo, SP',
        avatar: '/avatars/lucia.jpg',
        initials: 'LF',
        status: 'Ativo',
        isLead: true,
      },
      {
        id: 7,
        name: 'Roberto Silva',
        role: 'Backend Developer',
        email: 'roberto.silva@company.com',
        phone: '+55 11 99999-0007',
        location: 'Brasília, DF',
        avatar: '/avatars/roberto.jpg',
        initials: 'RS',
        status: 'Ativo',
        isLead: false,
      },
      {
        id: 8,
        name: 'Fernanda Lima',
        role: 'DevOps Engineer',
        email: 'fernanda.lima@company.com',
        phone: '+55 11 99999-0008',
        location: 'Curitiba, PR',
        avatar: '/avatars/fernanda.jpg',
        initials: 'FL',
        status: 'Ativo',
        isLead: false,
      },
      {
        id: 9,
        name: 'Marcos Pereira',
        role: 'Database Admin',
        email: 'marcos.pereira@company.com',
        phone: '+55 11 99999-0009',
        location: 'Recife, PE',
        avatar: '/avatars/marcos.jpg',
        initials: 'MP',
        status: 'Ativo',
        isLead: false,
      },
    ],
  },
  {
    id: 3,
    name: 'Quality Assurance',
    description: 'Equipe de testes e garantia de qualidade',
    memberCount: 3,
    projectCount: 6,
    lead: {
      name: 'Juliana Rocha',
      avatar: '/avatars/juliana.jpg',
      initials: 'JR',
    },
    members: [
      {
        id: 10,
        name: 'Juliana Rocha',
        role: 'QA Lead',
        email: 'juliana.rocha@company.com',
        phone: '+55 11 99999-0010',
        location: 'São Paulo, SP',
        avatar: '/avatars/juliana.jpg',
        initials: 'JR',
        status: 'Ativo',
        isLead: true,
      },
      {
        id: 11,
        name: 'Diego Santos',
        role: 'QA Tester',
        email: 'diego.santos@company.com',
        phone: '+55 11 99999-0011',
        location: 'Fortaleza, CE',
        avatar: '/avatars/diego.jpg',
        initials: 'DS',
        status: 'Ativo',
        isLead: false,
      },
      {
        id: 12,
        name: 'Camila Alves',
        role: 'Automation Tester',
        email: 'camila.alves@company.com',
        phone: '+55 11 99999-0012',
        location: 'Manaus, AM',
        avatar: '/avatars/camila.jpg',
        initials: 'CA',
        status: 'Ativo',
        isLead: false,
      },
    ],
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Ativo':
      return 'default';
    case 'Férias':
      return 'secondary';
    case 'Inativo':
      return 'outline';
    default:
      return 'outline';
  }
};

const getRoleIcon = (role: string, isLead: boolean) => {
  if (isLead) return <Crown className="h-4 w-4 text-yellow-600" />;
  if (role.includes('Lead'))
    return <Shield className="h-4 w-4 text-blue-600" />;
  return <User className="h-4 w-4 text-gray-500" />;
};

export default function TeamsPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Times</h1>
            <p className="text-muted-foreground">
              Gerencie suas equipes e colaboradores
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Novo Time
          </Button>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-4">
          <div className="relative max-w-sm flex-1">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input placeholder="Buscar times..." className="pl-10" />
          </div>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filtros
          </Button>
        </div>

        {/* Teams Grid */}
        <div className="space-y-6">
          {teams.map((team) => (
            <Card key={team.id} className="transition-shadow hover:shadow-md">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-xl">{team.name}</CardTitle>
                    <CardDescription>{team.description}</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <UserPlus className="mr-2 h-4 w-4" />
                      Adicionar Membro
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Editar Time
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Excluir Time
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {/* Team Stats */}
                <div className="text-muted-foreground flex items-center space-x-6 text-sm">
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{team.memberCount} membros</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span>{team.projectCount} projetos ativos</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>Líder:</span>
                    <Avatar className="h-5 w-5">
                      <AvatarImage src={team.lead.avatar} />
                      <AvatarFallback className="text-xs">
                        {team.lead.initials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{team.lead.name}</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                {/* Team Members */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium">Membros da Equipe</h4>
                  <div className="grid gap-3">
                    {team.members.map((member) => (
                      <div
                        key={member.id}
                        className="bg-card hover:bg-accent/50 flex items-center justify-between rounded-lg border p-3 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback>{member.initials}</AvatarFallback>
                          </Avatar>

                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <span className="font-medium">{member.name}</span>
                              {getRoleIcon(member.role, member.isLead)}
                            </div>
                            <div className="text-muted-foreground flex items-center space-x-4 text-sm">
                              <span>{member.role}</span>
                              <Badge
                                variant={getStatusColor(member.status)}
                                className="text-xs"
                              >
                                {member.status}
                              </Badge>
                            </div>
                          </div>
                        </div>

                        <div className="text-muted-foreground flex items-center space-x-4 text-sm">
                          <div className="hidden items-center space-x-1 md:flex">
                            <Mail className="h-4 w-4" />
                            <span>{member.email}</span>
                          </div>
                          <div className="hidden items-center space-x-1 lg:flex">
                            <Phone className="h-4 w-4" />
                            <span>{member.phone}</span>
                          </div>
                          <div className="hidden items-center space-x-1 xl:flex">
                            <MapPin className="h-4 w-4" />
                            <span>{member.location}</span>
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
                                Editar Membro
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Remover do Time
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))}
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
