/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cosmos: {
          950: '#030508',
          900: '#060a12',
          850: '#0a0f1d',
          800: '#0f172a',
          700: '#1e293b',
          600: '#334155',
        },
        cyan: {
          DEFAULT: '#00f0ff',
          glow: '#00f0ff',
          dim: '#0891b2',
          dark: '#0e7490',
        },
        violet: {
          DEFAULT: '#818cf8',
          glow: '#a855f7',
          dim: '#6366f1',
          dark: '#4f46e5',
        },
        electric: {
          blue: '#38bdf8',
          emerald: '#34d399',
          amber: '#fbbf24',
          rose: '#f43f5e',
        }
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 10s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
        'spin-slow': 'spin 30s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { opacity: '0.4', filter: 'drop-shadow(0 0 8px rgba(0, 240, 255, 0.4))' },
          '100%': { opacity: '0.9', filter: 'drop-shadow(0 0 20px rgba(0, 240, 255, 0.8))' },
        }
      },
      backdropBlur: {
        xs: '2px',
        md: '12px',
        xl: '24px',
      }
    },
  },
  plugins: [],
}
