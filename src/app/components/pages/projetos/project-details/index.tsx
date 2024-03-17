'use client';

import { Button } from '@/app/components/button';
import { Link } from '@/app/components/link';
import { RichText } from '@/app/components/rich-text';
import { SectionTitle } from '@/app/components/section-title';
import { TechBadge } from '@/app/components/tech-badge';
import { Projeto } from '@/app/types/projects';
import { FiGlobe } from 'react-icons/fi';
import { HiArrowNarrowLeft } from 'react-icons/hi';
import { TbBrandGithub } from 'react-icons/tb';
import { motion } from 'framer-motion';
import { fadeUpAnimation, techBadgeAnimation } from '@/app/lib/animations';

type ProjectDetailsProps = {
  projeto: Projeto;
};

export function ProjectDetails({ projeto }: ProjectDetailsProps) {
  return (
    <section className='w-full sm:min-h-[750px] flex flex-col items-center justify-end relative pb-10 sm:pb-24 py-24 px-6 overflow-hidden'>
      <motion.div
        className='absolute inset-0 z-[-1]'
        style={{
          background: `url(/images/hero-bg.png) no-repeat center/cover, url(${projeto.thumbnailDaPagina.url}) no-repeat center/cover`,
        }}
        initial={{ opacity: 0, scale: 1.2 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      />

      <SectionTitle
        subtitle='projetos'
        title={projeto.titulo}
        className='text-center items-center sm:[&>h3]:text-4xl'
      />

      <motion.div
        className='text-gray-400 text-center max-w-[640px] my-4 sm:my-6 text-sm sm:text-base'
        {...fadeUpAnimation}
        transition={{ duration: 0.5 }}
      >
        <RichText content={projeto.descricao.raw} />
      </motion.div>

      <div className='w-full max-w-[330px] flex flex-wrap gap-2 items-center justify-center'>
        {projeto.tecnologias.map((tech, i) => (
          <TechBadge
            key={tech.nome}
            name={tech.nome}
            {...techBadgeAnimation}
            transition={{ duration: 0.5, delay: i * 0.2 }}
          />
        ))}
      </div>

      <motion.div
        className='my-6 sm:my-12 flex items-center gap-2 sm:gap-4 flex-col sm:flex-row'
        {...fadeUpAnimation}
        transition={{ duration: 0.5 }}
      >
        {projeto?.githubUrl && (
          <a href={projeto.githubUrl} target='_blank'>
            <Button className='min-w-[180px]'>
              <TbBrandGithub size={20} />
              Repositório
            </Button>
          </a>
        )}
        {projeto.projetoUrl && (
          <a href={projeto.projetoUrl} target='_blank'>
            <Button className='min-w-[180px]'>
              <FiGlobe size={20} />
              Projeto Online
            </Button>
          </a>
        )}
      </motion.div>

      <Link href='/projetos'>
        <HiArrowNarrowLeft size={20} />
        Voltar para projetos
      </Link>
    </section>
  );
}
