/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        kbs: {
          royal: '#123B73',
          bright: '#3478F6',
          deep: '#0B2545',
          white: '#FFFFFF',
          mist: '#F1F5F9',
          pale: '#EFF6FF',
          ink: '#172033',
          slate: '#64748B',
          line: '#D9E2EF',
        },
      },
      fontFamily: {
        display: ['Manrope', 'Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(2.5rem, 6vw, 4rem)', { lineHeight: '1.08', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2rem, 4.5vw, 3rem)', { lineHeight: '1.14', letterSpacing: '-0.015em' }],
        'display-md': ['clamp(1.625rem, 3.2vw, 2.25rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'display-sm': ['clamp(1.25rem, 2.2vw, 1.5rem)', { lineHeight: '1.3' }],
      },
      borderRadius: {
        card: '16px',
        btn: '8px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(11, 37, 69, 0.04), 0 8px 24px -12px rgba(11, 37, 69, 0.16)',
        'card-hover': '0 2px 4px rgba(11, 37, 69, 0.06), 0 18px 40px -16px rgba(11, 37, 69, 0.28)',
        panel: '0 24px 60px -24px rgba(11, 37, 69, 0.45)',
        header: '0 1px 0 0 rgba(217, 226, 239, 1)',
      },
      transitionDuration: {
        DEFAULT: '180ms',
      },
      transitionTimingFunction: {
        kbs: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      maxWidth: {
        content: '1200px',
        prose: '68ch',
      },
    },
  },
  plugins: [],
}
