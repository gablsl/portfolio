import { Inter, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import { Header } from './components/header';
import { ContactForm } from './components/contact-form';
import { Footer } from './components/footer';
import { BackToTop } from './components/back-to-top';
import { Metadata } from 'next';

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
