'use client';

import { SectionTitle } from '@/app/components/section-title';
import { SVGIcon } from '@/app/components/svg-icon';
import { MDXContent } from '@/app/lib/mdx';
import { HomeData } from '@/app/lib/schemas';
import { Dictionary } from '@/app/i18n/dictionaries';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeUpAnimation } from '@/app/lib/animations';

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
        <div className='grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3'>
          {techs.map((tech) => (
            <div
              key={tech.name}
              className='p-4 rounded-lg bg-zinc-900/50 border border-white/5 flex items-center justify-between hover:text-emerald-500 transition-colors'
            >
              <span>{tech.name}</span>
              <SVGIcon icon={tech.icon || ''} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
