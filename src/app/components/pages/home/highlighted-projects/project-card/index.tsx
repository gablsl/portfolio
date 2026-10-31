'use client';

import { Link } from '@/app/components/link';
import { TechBadge } from '@/app/components/tech-badge';
import Image from 'next/image';
import { HiArrowNarrowRight } from 'react-icons/hi';
import { motion } from 'framer-motion';
import { fadeUpAnimation, techBadgeAnimation } from '@/app/lib/animations';
import { Dictionary } from '@/app/i18n/dictionaries';
import { Lang } from '@/app/lib/schemas';

type ProjectCardProps = {
  project: Awaited<ReturnType<typeof import('@/app/lib/content').getFeaturedProjects>>[number];
  dict: Dictionary;
  lang: Lang;
};

export function ProjectCard({ project, dict, lang }: ProjectCardProps) {
  return (
    <motion.div
      className='flex gap-6 lg:gap-12 flex-col lg:flex-row'
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className='w-full h-[200px] sm:h-[300px] lg:w-[420px] lg:min-h-full'
        initial={{ opacity: 0, y: 100, scale: 0.5 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 100, scale: 0.5 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Image
          width={420}
          height={304}
          src={project.data.thumbnail}
          alt={`${project.data.title} thumbnail`}
          loading='lazy'
          className='w-full h-full object-cover rounded-lg'
        />
      </motion.div>

      <div className='flex-1 lg:py-[18px]'>
        <motion.h3
          className='flex items-center gap-3 font-medium text-lg text-zinc-100'
          {...fadeUpAnimation}
          transition={{ duration: 0.7 }}
        >
          <Image
            width={20}
            height={20}
            loading='lazy'
            alt=''
            src='/images/icons/project-title-icon.svg'
          />
          {project.data.title}
        </motion.h3>

        <motion.p
          className='text-zinc-400 my-6'
          {...fadeUpAnimation}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {project.data.shortDescription}
        </motion.p>

        <div className='flex gap-x-2 gap-y-3 flex-wrap mb-8 lg:max-w-[350px]'>
          {project.data.technologies.map((tech, i) => (
            <TechBadge
              name={tech}
              key={`${project.data.title}-tech-${tech}`}
              {...techBadgeAnimation}
              transition={{ duration: 0.5, delay: i * 0.2 }}
            />
          ))}
        </div>

        <Link href={`/${lang}/projects/${project.slug}`}>
          {dict.projects.viewProject}
          <HiArrowNarrowRight />
        </Link>
      </div>
    </motion.div>
  );
}
