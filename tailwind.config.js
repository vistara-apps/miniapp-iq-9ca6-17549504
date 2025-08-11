/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        'bg': 'hsl(240 5% 10%)',
        'text': 'hsl(0 0% 95%)',
        'muted': 'hsl(0 0% 70%)',
        'accent': 'hsl(180 70% 50%)',
        'primary': 'hsl(240 80% 60%)',
        'surface': 'hsl(240 5% 15%)',
        'success': 'hsl(142 76% 36%)',
        'error': 'hsl(0 84% 60%)',
        'warning': 'hsl(38 92% 50%)',
        'border': 'hsl(240 5% 20%)',
        'card': 'hsl(240 5% 12%)'
      },
      borderRadius: {
        'lg': '12px',
        'md': '8px',
        'sm': '4px',
        'xl': '16px',
        '2xl': '20px'
      },
      boxShadow: {
        'card': '0 4px 16px hsla(0, 0%, 0%, 0.2)',
        'hover': '0 6px 20px hsla(0, 0%, 0%, 0.3)',
        'glow': '0 0 20px hsla(240, 80%, 60%, 0.3)',
        'inner': 'inset 0 2px 4px hsla(0, 0%, 0%, 0.1)'
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'bounce-subtle': 'bounceSubtle 0.6s ease-out'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px hsla(240, 80%, 60%, 0.3)' },
          '50%': { boxShadow: '0 0 30px hsla(240, 80%, 60%, 0.5)' }
        },
        bounceSubtle: {
          '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(-10px)' },
          '60%': { transform: 'translateY(-5px)' }
        }
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem'
      },
      fontSize: {
        '2xs': '0.625rem',
        '3xl': '1.875rem'
      }
    }
  },
  plugins: []
};
