import { Sora, JetBrains_Mono } from 'next/font/google';
import { Header } from '../components/header';
import { ContactForm } from '../components/contact-form';
import { Footer } from '../components/footer';
import { BackToTop } from '../components/back-to-top';
import { getCurrentLang, Lang, langs } from '../lib/schemas';
import { getDictionary } from '../i18n/dictionaries';
import '../globals.css';

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
});

export function generateStaticParams() {
  return langs.map((lang) => ({ lang }));
}

type LangLayoutProps = {
  children: React.ReactNode;
  params: { lang: string };
};

export default function LangLayout({ children, params }: LangLayoutProps) {
  const lang = getCurrentLang(params.lang);
  const dict = getDictionary(lang);

  return (
    <html
      lang={lang}
      className={`${sora.variable} ${jetbrainsMono.variable}`}
    >
      <body className='bg-zinc-950 text-zinc-100 antialiased font-sans'>
        <BackToTop />
        <Header lang={lang} dict={dict} />
        {children}
        <ContactForm dict={dict} />
        <Footer dict={dict} lang={lang} />
      </body>
    </html>
  );
}
