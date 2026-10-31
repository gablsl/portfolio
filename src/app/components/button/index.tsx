import { cn } from '@/app/lib/utils';
import { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'py-3 px-5 rounded-lg text-zinc-300 flex items-center justify-center gap-2 border border-zinc-700/50 bg-zinc-900/30 hover:border-emerald-500/50 hover:text-emerald-400 hover:bg-emerald-500/5 transition duration-300 disabled:opacity-50',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
