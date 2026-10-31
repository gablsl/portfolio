'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavItem } from './nav-item';
import { Saira_Stencil_One } from 'next/font/google';
import { motion } from 'framer-motion';
import { Dictionary } from '@/app/i18n/dictionaries';
import { Lang, langs } from '@/app/lib/schemas';
import { cn } from '@/app/lib/utils';

const sairaStencilOne = Saira_Stencil_One({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--saira',
});

type HeaderProps = {
  lang: Lang;
  dict: Dictionary;
};

export function Header({ lang, dict }: HeaderProps) {
  const pathname = usePathname();

  const navItems = [
    { label: dict.nav.home, href: `/${lang}` },
    { label: dict.nav.projects, href: `/${lang}/projects` },
    { label: dict.nav.blog, href: `/${lang}/blog` },
    { label: dict.nav.about, href: `/${lang}/about` },
  ];

  const otherLang = lang === 'en' ? 'pt' : 'en';
  const switchHref = pathname.replace(`/${lang}`, `/${otherLang}`) || `/${otherLang}`;

  return (
    <motion.header
      className='fixed top-0 left-0 right-0 z-50 h-20 border-b border-white/5 bg-zinc-950/80 backdrop-blur-md'
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className='container h-full flex items-center justify-between'>
        <Link href={`/${lang}`} className='flex items-center gap-3'>
          <span
            style={sairaStencilOne.style}
            className='uppercase text-2xl text-zinc-50'
          >
            Gabriel
          </span>
        </Link>

        <nav className='flex items-center gap-1 sm:gap-2'>
          {navItems.map((item) => (
            <NavItem {...item} key={item.label} />
          ))}

          <div className='h-6 w-px bg-zinc-800 mx-2 sm:mx-4' />

          <div className='flex items-center gap-1 font-mono text-xs sm:text-sm'>
            {langs.map((l) => (
              <Link
                key={l}
                href={l === lang ? pathname : switchHref}
                className={cn(
                  'px-2 py-1 rounded transition-colors',
                  l === lang
                    ? 'text-emerald-400 bg-emerald-500/10'
                    : 'text-zinc-500 hover:text-zinc-100',
                )}
              >
                {l.toUpperCase()}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </motion.header>
  );
}
