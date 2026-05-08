import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#000000',
          950: '#050505',
          900: '#0A0A0A',
          800: '#141414',
          700: '#1F1F1F',
          600: '#2A2A2A',
          500: '#383838',
        },
        bone: {
          DEFAULT: '#FAFAFA',
          50: '#FFFFFF',
          100: '#FAFAFA',
          200: '#F5F5F5',
          300: '#E5E5E5',
          400: '#D4D4D4',
        },
        ember: {
          DEFAULT: '#D97706',
          50: '#FFF7ED',
          400: '#FB923C',
          500: '#F97316',
          600: '#EA580C',
          700: '#C2410C',
        },
        smoke: {
          DEFAULT: '#737373',
          300: '#D4D4D4',
          400: '#A3A3A3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
        },
        whatsapp: {
          DEFAULT: '#25D366',
          dark: '#1ebe57',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.06em',
        tighter: '-0.04em',
        tight: '-0.02em',
        wide: '0.02em',
        wider: '0.05em',
        widest: '0.18em',
      },
      fontSize: {
        'display-xl': [
          'clamp(3rem, 12vw, 9rem)',
          { lineHeight: '0.92', letterSpacing: '-0.045em' },
        ],
        'display-lg': [
          'clamp(2.5rem, 9vw, 7rem)',
          { lineHeight: '0.95', letterSpacing: '-0.04em' },
        ],
        'display-md': [
          'clamp(2rem, 6vw, 4.5rem)',
          { lineHeight: '1', letterSpacing: '-0.03em' },
        ],
        'display-sm': [
          'clamp(1.5rem, 4vw, 3rem)',
          { lineHeight: '1.05', letterSpacing: '-0.02em' },
        ],
      },
      animation: {
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'fade-in': 'fadeIn 1s ease-out forwards',
        'reveal': 'reveal 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        reveal: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      typography: ({ theme }: { theme: (key: string) => string }) => ({
        // Tema customizado pro blog Lensmind — prose-lensmind
        lensmind: {
          css: {
            '--tw-prose-body': theme('colors.bone.300'),
            '--tw-prose-headings': theme('colors.bone.DEFAULT'),
            '--tw-prose-lead': theme('colors.bone.200'),
            '--tw-prose-links': theme('colors.ember.DEFAULT'),
            '--tw-prose-bold': theme('colors.bone.DEFAULT'),
            '--tw-prose-counters': theme('colors.smoke.400'),
            '--tw-prose-bullets': theme('colors.ember.DEFAULT'),
            '--tw-prose-hr': theme('colors.ink.700'),
            '--tw-prose-quotes': theme('colors.bone.200'),
            '--tw-prose-quote-borders': theme('colors.ember.DEFAULT'),
            '--tw-prose-captions': theme('colors.smoke.500'),
            '--tw-prose-code': theme('colors.bone.DEFAULT'),
            '--tw-prose-pre-code': theme('colors.bone.200'),
            '--tw-prose-pre-bg': theme('colors.ink.900'),
            '--tw-prose-th-borders': theme('colors.ink.700'),
            '--tw-prose-td-borders': theme('colors.ink.800'),

            // Headings — display style do site
            'h2, h3, h4': {
              fontWeight: '700',
              letterSpacing: '-0.02em',
              scrollMarginTop: '6rem',
            },
            h2: {
              fontSize: '1.875rem',
              marginTop: '2.5em',
              marginBottom: '0.8em',
              lineHeight: '1.15',
            },
            h3: {
              fontSize: '1.375rem',
              marginTop: '2em',
              marginBottom: '0.6em',
              lineHeight: '1.25',
            },
            // Links sem underline default — fica leve
            a: {
              fontWeight: '500',
              textDecoration: 'underline',
              textDecorationThickness: '1px',
              textUnderlineOffset: '3px',
              transition: 'color 0.2s',
              '&:hover': {
                color: theme('colors.ember.400'),
              },
            },
            // Blockquote elegante
            blockquote: {
              borderLeftWidth: '3px',
              fontStyle: 'normal',
              fontWeight: '400',
              quotes: 'none',
              padding: '0.5em 1.5em',
              marginLeft: '0',
              marginRight: '0',
            },
            'blockquote p:first-of-type::before': { content: 'none' },
            'blockquote p:last-of-type::after': { content: 'none' },
            // Anchor headings (rehype-autolink)
            'a.anchor-heading': {
              textDecoration: 'none',
              color: 'inherit',
              '&:hover': {
                color: theme('colors.ember.DEFAULT'),
              },
            },
          },
        },
      }),
    },
  },
  plugins: [typography],
};

export default config;
