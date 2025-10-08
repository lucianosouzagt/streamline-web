'use client';

import { useState } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { cn } from '@/lib/utils';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="bg-background min-h-screen">
      <Header onMenuToggle={toggleSidebar} />

      <div className="flex">
        <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />

        <main
          className={cn(
            'flex-1 pt-4 transition-all duration-300 ease-in-out',
            sidebarOpen ? 'ml-64' : 'ml-16'
          )}
        >
          <div className="container mx-auto px-4 pb-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
