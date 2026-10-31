'use client';

import { SectionTitle } from '@/app/components/section-title';
import { motion } from 'framer-motion';
import { Dictionary } from '@/app/i18n/dictionaries';

type PageIntroductionProps = {
  dict: Dictionary;
};

export function PageIntroduction({ dict }: PageIntroductionProps) {
  return (
    <section className='w-full min-h-[40vh] lg:min-h-[50vh] flex flex-col items-center justify-center pt-32 pb-20 px-6'>
      <SectionTitle
        subtitle={dict.projects.subtitle}
        title={dict.projects.title}
        className='text-center items-center [&>h3]:text-4xl'
      />

      <motion.p
        className='text-zinc-400 text-center max-w-[640px] mt-6 text-sm sm:text-base'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {dict.projects.intro}
      </motion.p>
    </section>
  );
}
