'use client';

import Link from 'next/link';
import { ProjectCard } from './project-card';
import { Projeto } from '@/app/types/projects';
import { motion } from 'framer-motion';
import { fadeUpAnimation } from '@/app/lib/animations';

type ProjectsListProps = {
  projetos: Projeto[];
};

export function ProjectList({ projetos }: ProjectsListProps) {
  return (
    <section className='container py-32 grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-x-4 gap-y-6'>
      {projetos.map((project, i) => (
        <motion.div
          key={project.titulo}
          {...fadeUpAnimation}
          transition={{ duration: 0.5, delay: i * 0.2 }}
        >
          <Link href={`/projetos/${project.slug}`}>
            <ProjectCard project={project} />
          </Link>
        </motion.div>
      ))}
    </section>
  );
}
