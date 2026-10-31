'use client';

import { motion } from 'framer-motion';
import { ComponentProps } from 'react';

type TechBadgeProps = ComponentProps<typeof motion.span> & {
  name: string;
};

export function TechBadge({ name, ...props }: TechBadgeProps) {
  return (
    <motion.span
      className='text-zinc-400 bg-zinc-900/50 border border-white/5 text-sm py-1 px-3 rounded-full hover:border-emerald-500/30 hover:text-emerald-400 transition-colors'
      {...props}
    >
      {name}
    </motion.span>
  );
}
