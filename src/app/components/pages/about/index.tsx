'use client';

import { SectionTitle } from '@/app/components/section-title';
import { SVGIcon } from '@/app/components/svg-icon';
import { TechIcon } from '@/app/components/tech-icon';
import { MDXContent } from '@/app/lib/mdx';
import { HomeData } from '@/app/lib/schemas';
import { Dictionary } from '@/app/i18n/dictionaries';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeUpAnimation } from '@/app/lib/animations';
import { KnowTech } from '../home/knows-techs/know-tech';

type AboutContentProps = {
  about: Awaited<ReturnType<typeof import('@/app/lib/content').getAbout>>;
  techs: HomeData['knownTechs'];
  profileImage: string;
  dict: Dictionary;
  children: React.ReactNode;
};

export function AboutContent({ about, techs, profileImage, dict, children }: AboutContentProps) {
  return (
    <section className='container py-32'>
      <SectionTitle
        subtitle={dict.about.subtitle}
        title={about.data.title}
        className='text-center items-center mb-16'
      />

      <div className='grid grid-cols-1 lg:grid-cols-[1fr,1.5fr] gap-12 items-start'>
        <motion.div
          className='relative aspect-square max-w-[420px] mx-auto lg:mx-0 rounded-lg overflow-hidden'
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src={profileImage}
            alt={about.data.title}
            fill
            sizes='(max-width: 1024px) 100vw, 420px'
            className='object-cover'
            loading='lazy'
          />
        </motion.div>

        <motion.div
          className='prose prose-invert prose-zinc max-w-none'
          {...fadeUpAnimation}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      </div>

      <div className='mt-20'>
        <h3 className='text-xl font-medium mb-6 text-center'>
          Tech stack
        </h3>
        {/* Mudança aqui: de grid para flex com flex-wrap */}
        <div className='flex flex-wrap gap-3 justify-center'>
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
      </div>
    </section>
  );
}
