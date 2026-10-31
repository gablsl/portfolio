'use client';

import { cn } from '@/app/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavItemProps = {
  href: string;
  label: string;
  onClick?: () => void;
};

export function NavItem({ href, label, onClick }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        'relative px-3 py-2 text-sm font-medium transition-colors rounded-lg',
        isActive
          ? 'text-zinc-50 bg-white/5'
          : 'text-zinc-400 hover:text-zinc-100 hover:bg-white/5',
      )}
    >
      {label}
      {isActive && (
        <span className='absolute bottom-1 left-3 right-3 h-px bg-emerald-500/60' />
      )}
    </Link>
  );
}
