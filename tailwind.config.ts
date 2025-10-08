import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        // Streamline Brand Colors
        primary: {
          DEFAULT: '#2563EB', // Azul Elétrico
          foreground: '#FFFFFF',
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6', // Azul-Céu Claro (secundária)
          600: '#2563EB', // Azul Elétrico (primária)
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
          950: '#172554',
        },
        secondary: {
          DEFAULT: '#3B82F6', // Azul-Céu Claro
          foreground: '#FFFFFF',
        },
        accent: {
          DEFAULT: '#22C55E', // Verde Limão Suave
          foreground: '#FFFFFF',
        },
        warning: {
          DEFAULT: '#FACC15', // Amarelo Dourado
          foreground: '#1E293B',
        },
        destructive: {
          DEFAULT: '#EF4444', // Vermelho Coral
          foreground: '#FFFFFF',
        },
        muted: {
          DEFAULT: '#E2E8F0', // Cinza-Claro
          foreground: '#475569', // Cinza-Ardósia
        },
        border: '#CBD5E1', // Cinza-Azulado
        input: '#CBD5E1',
        ring: '#2563EB',
        background: '#F8FAFC', // Fundo Claro
        foreground: '#1E293B', // Grafite
        card: {
          DEFAULT: '#FFFFFF',
          foreground: '#1E293B',
        },
        popover: {
          DEFAULT: '#FFFFFF',
          foreground: '#1E293B',
        },
        // Dark mode colors
        dark: {
          background: '#0F172A', // Azul-Noite
          foreground: '#F1F5F9', // Texto Principal Dark
          card: '#1E293B', // Cartões / Containers
          border: '#334155', // Borda / Divisores
          muted: '#475569',
          'muted-foreground': '#94A3B8',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: [
          'var(--font-inter)',
          'var(--font-dm-sans)',
          'system-ui',
          'sans-serif',
        ],
        display: [
          'var(--font-poppins)',
          'var(--font-inter)',
          'system-ui',
          'sans-serif',
        ],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
