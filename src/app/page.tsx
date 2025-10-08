'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LoginForm } from '@/components/forms/LoginForm';
import { useAuth } from '@/hooks/useAuth';

export default function HomePage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  // Redireciona usuários autenticados para o dashboard
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, isLoading, router]);

  // Mostra loading enquanto verifica autenticação
  if (isLoading) {
    return (
      <div className="from-background via-background to-primary/5 flex min-h-screen items-center justify-center bg-gradient-to-br">
        <div className="animate-pulse">
          <div className="bg-primary h-8 w-8 animate-bounce rounded-full"></div>
        </div>
      </div>
    );
  }

  // Se não estiver autenticado, mostra a página de login
  if (!isAuthenticated) {
    return (
      <div className="from-background via-background/95 to-primary/10 relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br p-4 sm:p-6 lg:p-8">
        {/* Background Pattern */}
        <div className="bg-grid-pattern absolute inset-0 opacity-5"></div>
        <div className="bg-primary/10 absolute top-1/4 left-1/4 h-64 w-64 rounded-full blur-3xl sm:h-96 sm:w-96"></div>
        <div className="bg-secondary/10 absolute right-1/4 bottom-1/4 h-64 w-64 rounded-full blur-3xl sm:h-96 sm:w-96"></div>

        <div className="relative z-10 w-full max-w-sm sm:max-w-md">
          {/* Logo/Brand */}
          <div className="mb-6 text-center sm:mb-8">
            <div className="from-primary to-secondary shadow-primary/20 mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br shadow-xl sm:mb-6 sm:h-20 sm:w-20 sm:rounded-3xl">
              <svg
                className="text-primary-foreground h-8 w-8 sm:h-10 sm:w-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h2 className="font-poppins from-primary via-secondary to-accent mb-2 bg-gradient-to-r bg-clip-text text-2xl font-bold text-transparent sm:text-3xl">
              Streamline
            </h2>
            <p className="text-muted-foreground font-dm-sans px-2 text-sm leading-relaxed">
              Gerenciamento de Projetos Inteligente
            </p>
          </div>

          {/* Formulário de Login */}
          <div className="bg-card/80 border-border/50 shadow-primary/10 rounded-2xl border p-6 shadow-2xl backdrop-blur-sm sm:p-8">
            <LoginForm />
          </div>

          {/* Footer */}
          <div className="mt-6 text-center sm:mt-8">
            <p className="text-muted-foreground font-dm-sans text-xs sm:text-sm">
              © 2024 Streamline. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Fallback (não deveria chegar aqui)
  return null;
}
