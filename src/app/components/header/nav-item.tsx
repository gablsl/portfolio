'use client';

import { cn } from '@/app/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavItemProps = {
  href: string;
  label: string;
};

export function NavItem({ href, label }: NavItemProps) {
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        'text-gray-400 flex items-center gap-2 font-medium font-mono hover:text-gray-50 transition duration-500',
        isActive && 'text-gray-50'
      )}
    >
      <span className='text-emerald-400'>#</span>
      {label}
    </Link>
  );
}
