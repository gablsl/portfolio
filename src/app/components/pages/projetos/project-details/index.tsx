'use client';

import { Button } from '@/app/components/button';
import { Link } from '@/app/components/link';
import { SectionTitle } from '@/app/components/section-title';
import { TechBadge } from '@/app/components/tech-badge';
import { FiGlobe } from 'react-icons/fi';
import { HiArrowNarrowLeft } from 'react-icons/hi';
import { TbBrandGithub } from 'react-icons/tb';
import React from 'react';
import { motion } from 'framer-motion';
import { techBadgeAnimation } from '@/app/lib/animations';
import { Dictionary } from '@/app/i18n/dictionaries';
import { cn } from '@/app/lib/utils';
import { Lang } from '@/app/lib/schemas';

type ProjectDetailsProps = {
  project: Awaited<ReturnType<typeof import('@/app/lib/content').getProject>>;
  dict: Dictionary;
  children: React.ReactNode;
  lang: Lang;
};

const categoryLabels = {
  frontend: 'Front-end',
  backend: 'Back-end',
  fullstack: 'Full Stack',
};

const categoryStyles = {
  frontend: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
  backend: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  fullstack: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
};

export function ProjectDetails({
  project,
  dict,
  children,
  lang,
}: ProjectDetailsProps) {
  const { data } = project;

  return (
    <section className='w-full min-h-[60vh] lg:min-h-[70vh] flex flex-col items-center justify-center pt-32 pb-16 sm:pb-24 px-6'>
      <motion.span
        className={cn(
          'mb-4 px-4 py-1.5 rounded-full text-sm font-mono border',
          categoryStyles[data.category],
        )}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {categoryLabels[data.category]}
      </motion.span>

      <SectionTitle
        subtitle={dict.projects.subtitle}
        title={data.title}
        className='text-center items-center sm:[&>h3]:text-4xl'
      />

      <motion.div
        className='text-zinc-400 text-center max-w-[640px] my-4 sm:my-6 text-sm sm:text-base prose prose-invert prose-sm'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {children}
      </motion.div>

      <motion.div
        className='w-full max-w-[420px] flex flex-wrap gap-2 items-center justify-center'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {data.technologies.map((tech, i) => (
          <TechBadge
            key={tech}
            name={tech}
            {...techBadgeAnimation}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          />
        ))}
      </motion.div>

      <motion.div
        className='my-6 sm:my-10 flex items-center gap-3 flex-col sm:flex-row'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {data.githubUrl && (
          <a href={data.githubUrl} target='_blank' rel='noopener noreferrer'>
            <Button className='min-w-[160px]'>
              <TbBrandGithub size={20} />
              {dict.projects.repository}
            </Button>
          </a>
        )}
        {data.projectUrl && (
          <a href={data.projectUrl} target='_blank' rel='noopener noreferrer'>
            <Button className='min-w-[160px]'>
              <FiGlobe size={20} />
              {dict.projects.liveProject}
            </Button>
          </a>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Link href={`/${lang}/projects`}>
          <HiArrowNarrowLeft size={20} />
          {dict.projects.back}
        </Link>
      </motion.div>
    </section>
  );
}
