'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FolderOpen,
  CheckSquare,
  Users,
  User,
  Settings,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface SidebarProps {
  isOpen?: boolean;
  onToggle?: () => void;
}

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string | number;
  description?: string;
}

const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    description: 'Visão geral dos projetos',
  },
  {
    title: 'Projetos',
    href: '/projects',
    icon: FolderOpen,
    description: 'Gerenciar projetos',
  },
  {
    title: 'Tarefas',
    href: '/tasks',
    icon: CheckSquare,
    badge: 5,
    description: 'Minhas tarefas pendentes',
  },
  {
    title: 'Times',
    href: '/teams',
    icon: Users,
    description: 'Equipes e colaboradores',
  },
  {
    title: 'Perfil',
    href: '/profile',
    icon: User,
    description: 'Meus dados pessoais',
  },
  {
    title: 'Configurações',
    href: '/settings',
    icon: Settings,
    description: 'Preferências do sistema',
  },
];

export function Sidebar({ isOpen = true, onToggle }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        'bg-background fixed top-16 left-0 z-40 h-[calc(100vh-4rem)] border-r transition-all duration-300 ease-in-out',
        isOpen ? 'w-64' : 'w-16'
      )}
    >
      <div className="flex h-full flex-col">
        {/* Toggle button */}
        <div className="flex justify-end p-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="h-8 w-8"
          >
            {isOpen ? (
              <ChevronLeft className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== '/dashboard' && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'hover:bg-accent hover:text-accent-foreground flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-accent text-accent-foreground'
                    : 'text-muted-foreground',
                  !isOpen && 'justify-center px-2'
                )}
                title={!isOpen ? item.title : undefined}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />

                {isOpen && (
                  <>
                    <span className="flex-1">{item.title}</span>
                    {item.badge && (
                      <Badge variant="secondary" className="ml-auto">
                        {item.badge}
                      </Badge>
                    )}
                  </>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer info */}
        {isOpen && (
          <div className="border-t p-4">
            <div className="text-muted-foreground text-xs">
              <p className="font-medium">Streamline v1.0</p>
              <p>Gerenciamento de Projetos</p>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
