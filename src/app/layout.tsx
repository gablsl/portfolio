import { Inter, IBM_Plex_Mono } from 'next/font/google';
import { Header } from './components/header';
import { ContactForm } from './components/contact-form';
import { Footer } from './components/footer';
import { BackToTop } from './components/back-to-top';
import { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Home',
    template: '%s | Gabriel Sousa',
  },
  icons: [
    {
      url: '/images/icons/project-title-icon.svg',
    },
  ],
  description:
    'Desenvolvedor Full Stack apaixonado por tecnologia e código limpo. Confira meus projetos construídos com Next.js, Tailwind CSS, TypeScript e mais!',
  openGraph: {
    title: {
      default: 'Home',
      template: '%s | Gabriel Sousa',
    },
    description:
      'Desenvolvedor Full Stack apaixonado por tecnologia e código limpo. Confira meus projetos construídos com Next.js, Tailwind CSS, TypeScript e mais!',
    url: 'https://portfolio-gablsl1s-projects.vercel.app/',
    type: 'website',
  },
};

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-plex-mono',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='pt-BR' className={`${inter.variable} ${plexMono.variable}`}>
      <body>
        <BackToTop />
        <Header />
        {children}
        <ContactForm />
        <Footer />
      </body>
    </html>
  );
}
