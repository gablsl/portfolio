'use client';

import { cn } from '@/app/lib/utils';

type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  return (
    <svg
      viewBox='0 0 40 40'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={cn('text-emerald-500', className)}
      aria-label='Gabriel Leitão'
    >
      <rect
        x='1'
        y='1'
        width='38'
        height='38'
        rx='9'
        className='fill-emerald-500/10 stroke-current'
        strokeWidth='1.5'
      />
      <text
        x='50%'
        y='54%'
        dominantBaseline='middle'
        textAnchor='middle'
        className='fill-zinc-50'
        style={{
          fontSize: 15,
          fontWeight: 700,
          fontFamily: 'var(--font-mono), monospace',
          letterSpacing: '-0.04em',
        }}
      >
        GL
      </text>
    </svg>
  );
}
