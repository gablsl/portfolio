import { ProjectMeta } from '@/app/lib/schemas';
import Image from 'next/image';
import { cn } from '@/app/lib/utils';

type ProjectCardProps = {
  project: { slug: string; data: ProjectMeta; source: string };
};

const categoryLabels: Record<ProjectMeta['category'], string> = {
  frontend: 'Front-end',
  backend: 'Back-end',
  fullstack: 'Full Stack',
};

const categoryStyles: Record<ProjectMeta['category'], string> = {
  frontend: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
  backend: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  fullstack: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
};

export function ProjectCard({ project }: ProjectCardProps) {
  const technologies = project.data.technologies.join(', ');

  return (
    <article className='rounded-lg h-[436px] flex flex-col bg-zinc-900/50 overflow-hidden border border-white/5 hover:border-emerald-500/50 opacity-80 hover:opacity-100 transition-all cursor-pointer group'>
      <div className='w-full h-48 overflow-hidden relative'>
        <Image
          width={380}
          height={200}
          src={project.data.thumbnail}
          alt={`${project.data.title} thumbnail`}
          className='w-full h-full object-cover group-hover:scale-110 duration-500 transition-all'
          loading='lazy'
        />
        <span
          className={cn(
            'absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-mono border',
            categoryStyles[project.data.category],
          )}
        >
          {categoryLabels[project.data.category]}
        </span>
      </div>

      <div className='flex-1 flex flex-col p-8'>
        <strong className='font-medium text-zinc-100/90 group-hover:text-emerald-500 transition-all'>
          {project.data.title}
        </strong>
        <p className='mt-2 text-zinc-400 line-clamp-4'>
          {project.data.shortDescription}
        </p>
        <span className='text-zinc-300 text-sm font-medium block mt-auto truncate'>
          {technologies}
        </span>
      </div>
    </article>
  );
}
