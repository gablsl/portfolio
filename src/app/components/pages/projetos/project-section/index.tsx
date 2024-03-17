'use client';

import { sessaoDoProjeto } from '@/app/types/projects';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeUpAnimation } from '@/app/lib/animations';

type ProjectSectionsProps = {
  sessoes: sessaoDoProjeto[];
};

export function ProjectSections({ sessoes }: ProjectSectionsProps) {
  return (
    <section className='container my-12 md:my-32 flex flex-col gap-8 md:gap-32'>
      {sessoes.map((section) => (
        <motion.div
          key={section.titulo}
          className='flex flex-col items-center gap-6 md:gap-12'
          {...fadeUpAnimation}
          transition={{ duration: 0.5 }}
        >
          <h2 className='text-2xl md:text-3xl font-medium text-gray-300'>
            {section.titulo}
          </h2>
          <Image
            src={section.imagem.url}
            width={1080}
            height={672}
            alt={`Imagem da sessão ${section.titulo}`}
            className='w-full aspect-auto rounded-lg object-cover'
            unoptimized
          />
        </motion.div>
      ))}
    </section>
  );
}
