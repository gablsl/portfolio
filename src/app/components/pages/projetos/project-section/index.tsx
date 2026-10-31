'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeUpAnimation } from '@/app/lib/animations';
import { ProjectMeta } from '@/app/lib/schemas';

type ProjectSectionsProps = {
  sections?: ProjectMeta['sections'];
};

export function ProjectSections({ sections }: ProjectSectionsProps) {
  return (
    <section className='container my-12 md:my-32 flex flex-col gap-8 md:gap-32'>
      {(sections ?? []).map((section) => (
        <motion.div
          key={section.title}
          className='flex flex-col items-center gap-6 md:gap-12'
          {...fadeUpAnimation}
          transition={{ duration: 0.5 }}
        >
          <h2 className='text-2xl md:text-3xl font-medium text-zinc-300'>
            {section.title}
          </h2>
          <Image
            src={section.image}
            width={1080}
            height={672}
            alt={`${section.title} section image`}
            className='w-full aspect-auto rounded-lg object-cover'
            loading='lazy'
          />
        </motion.div>
      ))}
    </section>
  );
}
