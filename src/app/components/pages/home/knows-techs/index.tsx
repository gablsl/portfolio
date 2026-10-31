'use client';

import { SectionTitle } from '@/app/components/section-title';
import { KnowTech } from './know-tech';
import { motion } from 'framer-motion';
import { HomeData } from '@/app/lib/schemas';
import { Dictionary } from '@/app/i18n/dictionaries';

type KnowTechsProps = {
  techs: HomeData['knownTechs'];
  dict: Dictionary;
};

export function KnowsTechs({ techs, dict }: KnowTechsProps) {
  return (
    <section className='container py-20'>
      <SectionTitle
        subtitle={dict.knowsTechs.subtitle}
        title={dict.knowsTechs.title}
      />

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-16'>
        {techs?.map((tech, i) => (
          <motion.div
            key={tech.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
          >
            <KnowTech tech={tech} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
