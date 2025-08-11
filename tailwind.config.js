
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
        'surface': 'hsl(240 5% 15%)'
      },
      borderRadius: {
        'lg': '12px',
        'md': '8px',
        'sm': '4px',
        'xl': '16px'
      },
      boxShadow: {
        'card': '0 4px 16px hsla(0, 0%, 0%, 0.1)',
        'hover': '0 6px 20px hsla(0, 0%, 0%, 0.15)'
      }
    }
  },
  plugins: []
};
  