'use client';

import Link from 'next/link';
import { ProjectCard } from './project-card';
import { motion } from 'framer-motion';
import { fadeUpAnimation } from '@/app/lib/animations';
import { useSearchParams, usePathname } from 'next/navigation';
import { Dictionary } from '@/app/i18n/dictionaries';
import { cn } from '@/app/lib/utils';
import { ProjectMeta } from '@/app/lib/schemas';

type ProjectsListProps = {
  projects: { slug: string; data: ProjectMeta; source: string }[];
  dict: Dictionary;
};

const categories = ['all', 'frontend', 'backend', 'fullstack'] as const;

export function ProjectList({ projects, dict }: ProjectsListProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const activeCategory = searchParams.get('category') || 'all';

  const filteredProjects =
    activeCategory === 'all'
      ? projects
      : projects.filter((p) => p.data.category === activeCategory);

  const createCategoryHref = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category === 'all') {
      params.delete('category');
    } else {
      params.set('category', category);
    }
    const query = params.toString();
    return `${pathname}${query ? `?${query}` : ''}`;
  };

  return (
    <section className='container py-16 md:py-32'>
      <div className='flex flex-wrap items-center justify-center gap-3 mb-12'>
        {categories.map((category) => (
          <Link
            key={category}
            href={createCategoryHref(category)}
            scroll={false}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-mono border transition-all',
              activeCategory === category
                ? 'bg-emerald-600/20 border-emerald-500 text-emerald-400'
                : 'bg-zinc-900/50 border-white/5 text-zinc-400 hover:border-zinc-600 hover:text-zinc-100',
            )}
          >
            {dict.projects.filter[category]}
          </Link>
        ))}
      </div>

      <motion.div
        layout
        className='grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-x-4 gap-y-6'
      >
        {filteredProjects.map((project, i) => (
          <motion.div
            layout
            key={project.slug}
            {...fadeUpAnimation}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <Link href={`${pathname.replace(/\/$/, '')}/${project.slug}`}>
              <ProjectCard project={project} />
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
