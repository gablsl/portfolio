'use client';

import Link from 'next/link';
import { NavItem } from './nav-item';
import { Saira_Stencil_One } from 'next/font/google';
import { motion } from 'framer-motion';

const NAV_ITEMS = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Projetos',
    href: '/projetos',
  },
];

const sairaStencilOne = Saira_Stencil_One({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--saira',
});

export function Header() {
  return (
    <motion.header
      className='absolute top-0 w-full z-10 h-24 flex items-center justify-center'
      initial={{ top: -100 }}
      animate={{ top: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className='container flex items-center justify-between'>
        <Link href='/'>
          <h1 style={sairaStencilOne.style} className='uppercase text-2xl'>
            Gabriel
          </h1>
        </Link>

        <nav className='flex items-center gap-4 sm:gap-10'>
          {NAV_ITEMS.map((item) => (
            <NavItem {...item} key={item.label} />
          ))}
        </nav>
      </div>
    </motion.header>
  );
}
