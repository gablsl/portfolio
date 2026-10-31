import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      sans: ['var(--font-sora)', 'sans-serif'],
      mono: ['var(--font-mono)', 'monospace'],
    },
    extend: {
      backgroundImage: {
        'hero-image': "url('/images/hero-bg.png')",
      },
      boxShadow: {
        button: '0px 0px 68px 7px rgba(5, 150, 105, 0.25)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
export default config;
