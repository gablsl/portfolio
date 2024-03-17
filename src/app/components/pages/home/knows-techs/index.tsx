'use client';

import { SectionTitle } from '@/app/components/section-title';
import { KnowTech } from './know-tech';
import { TecnologiasConhecidas } from '@/app/types/projects';
import { motion } from 'framer-motion';

type KnowTechsProps = {
  techs: TecnologiasConhecidas[];
};

export function KnowsTechs({ techs }: KnowTechsProps) {
  return (
    <section className='container py-16'>
      <SectionTitle subtitle='competências' title='Conhecimentos' />

      <div className='grid grid-cols-[repeat(auto-fit,minmax(264px,1fr))] gap-3 mt-[60px]'>
        {techs?.map((tech, i) => (
          <motion.div
            key={tech.nome}
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.2, delay: i * 0.3 }}
          >
            <KnowTech tech={tech} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
