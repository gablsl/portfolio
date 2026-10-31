'use client';

import { SVGIcon } from '@/app/components/svg-icon';
import { TechIcon } from '@/app/components/tech-icon';
import { HomeData } from '@/app/lib/schemas';

type KnowTechProps = {
  tech: HomeData['knownTechs'][number];
};

export function KnowTech({ tech }: KnowTechProps) {
  return (
    <div className='group flex items-center gap-4 p-4 rounded-xl bg-zinc-900/40 border border-white/5 hover:border-emerald-500/30 hover:bg-zinc-900/70 transition-all'>
      <div className='flex items-center justify-center w-12 h-12 rounded-lg bg-zinc-800/50 text-zinc-300 group-hover:text-emerald-400 group-hover:bg-emerald-500/10 transition-colors'>
        {tech.icon ? (
          <SVGIcon icon={tech.icon} />
        ) : (
          <TechIcon name={tech.name} className='w-6 h-6' />
        )}
      </div>

      <div className='flex-1 min-w-0'>
        <p className='font-medium text-zinc-200 group-hover:text-zinc-50 transition-colors'>
          {tech.name}
        </p>
      </div>
    </div>
  );
}
