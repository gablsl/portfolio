'use client';

import { Link } from '@/app/components/link';
import { TechBadge } from '@/app/components/tech-badge';
import { Projeto } from '@/app/types/projects';
import Image from 'next/image';
import { HiArrowNarrowRight } from 'react-icons/hi';
import { motion } from 'framer-motion';
import { fadeUpAnimation, techBadgeAnimation } from '@/app/lib/animations';

type ProjectCardProps = {
  project: Projeto;
};

export function ProjectCard({ project }: ProjectCardProps) {
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
          src={project.thumbnail.url}
          alt={`Thumbnail do projeto ${project.titulo}`}
          loading='lazy'
          className='w-full h-full object-cover rounded-lg'
        />
      </motion.div>

      <div className='flex-1 lg:py-[18px]'>
        <motion.h3
          className='flex items-center gap-3 font-medium text-lg text-gray-50'
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
          {project.titulo}
        </motion.h3>

        <motion.p
          className='text-gray-400 my-6'
          {...fadeUpAnimation}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {project.descricaoCurta}
        </motion.p>

        <div className='flex gap-x-2 gap-y-3 flex-wrap mb-8 lg:max-w-[350px]'>
          {project.tecnologias.map((tech, i) => (
            <TechBadge
              name={tech.nome}
              key={`${project.titulo}-tech-${tech.nome}`}
              {...techBadgeAnimation}
              transition={{ duration: 0.5, delay: i * 0.2 }}
            />
          ))}
        </div>

        <Link href={`/projetos/${project.slug}`}>
          Ver projeto
          <HiArrowNarrowRight />
        </Link>
      </div>
    </motion.div>
  );
}
