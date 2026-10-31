import Link from 'next/link';
import { Logo } from '@/app/components/header/logo';
import { Dictionary } from '@/app/i18n/dictionaries';
import { Lang } from '@/app/lib/schemas';

type FooterProps = {
  dict: Dictionary;
  lang: Lang;
};

export function Footer({ dict, lang }: FooterProps) {
  const navItems = [
    { label: dict.nav.home, href: `/${lang}` },
    { label: dict.nav.projects, href: `/${lang}/projects` },
    { label: dict.nav.blog, href: `/${lang}/blog` },
    { label: dict.nav.about, href: `/${lang}/about` },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className='w-full border-t border-white/5 bg-zinc-950'>
      <div className='container py-12'>
        <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-8'>
          <div>
            <Link href={`/${lang}`} className='inline-flex'>
              <Logo className='w-9 h-9' />
            </Link>
            <p className='mt-2 text-sm text-zinc-500 max-w-xs'>
              {dict.workExperience.cta}
            </p>
          </div>

          <nav className='flex flex-wrap gap-6'>
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className='text-sm text-zinc-400 hover:text-emerald-500 transition-colors'
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className='mt-10 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-zinc-500'>
          <span>
            {currentYear} Gabriel Leitão. {dict.footer.developedBy}{' '}
            {dict.footer.by} Gabriel Leitão.
          </span>
        </div>
      </div>
    </footer>
  );
}
