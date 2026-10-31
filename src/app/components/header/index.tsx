'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavItem } from './nav-item';
import { Logo } from './logo';
import { Dictionary } from '@/app/i18n/dictionaries';
import { Lang, langs } from '@/app/lib/schemas';
import { cn } from '@/app/lib/utils';
import { HiMenu, HiX } from 'react-icons/hi';

type HeaderProps = {
  lang: Lang;
  dict: Dictionary;
};

export function Header({ lang, dict }: HeaderProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

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
          <Logo className='w-9 h-9 sm:w-10 sm:h-10' />
        </Link>

        <nav className='hidden md:flex items-center gap-1'>
          {navItems.map((item) => (
            <NavItem {...item} key={item.label} />
          ))}

          <div className='h-6 w-px bg-zinc-800 mx-2' />

          <div className='flex items-center gap-1 font-mono text-sm'>
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

        <button
          type='button'
          onClick={() => setMenuOpen((prev) => !prev)}
          className='md:hidden p-2 -mr-2 text-zinc-400 hover:text-zinc-100 transition-colors'
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className='md:hidden absolute top-20 left-0 right-0 border-b border-white/5 bg-zinc-950/95 backdrop-blur-md'
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className='container py-4 flex flex-col gap-1'>
              {navItems.map((item) => (
                <NavItem
                  {...item}
                  key={item.label}
                  onClick={() => setMenuOpen(false)}
                />
              ))}

              <div className='h-px bg-zinc-800 my-3' />

              <div className='flex items-center gap-2 font-mono text-sm px-3'>
                <span className='text-zinc-500'>{dict.languageSwitcher.label}</span>
                {langs.map((l) => (
                  <Link
                    key={l}
                    href={l === lang ? pathname : switchHref}
                    onClick={() => setMenuOpen(false)}
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
