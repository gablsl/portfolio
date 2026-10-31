'use client';

import React from 'react';
import { Button } from '@/app/components/button';
import { TechBadge } from '@/app/components/tech-badge';
import { HiArrowNarrowRight, HiDownload } from 'react-icons/hi';
import { SVGIcon } from '@/app/components/svg-icon';
import { motion } from 'framer-motion';
import { techBadgeAnimation } from '@/app/lib/animations';
import { HomeData } from '@/app/lib/schemas';
import { Dictionary } from '@/app/i18n/dictionaries';

type HeroSectionProps = {
  home: HomeData;
  dict: Dictionary;
  children: React.ReactNode;
};

export function HeroSection({ home, dict, children }: HeroSectionProps) {
  const handleContact = () => {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className='relative w-full min-h-[80vh] lg:min-h-[90vh] flex items-center pt-32 pb-20 overflow-hidden'>
      <div className='container'>
        <div className='max-w-3xl'>
          <motion.p
            className='font-mono text-emerald-400 mb-4'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {dict.hero.greeting}
          </motion.p>

          <motion.h1
            className='text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-zinc-50 mb-6'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {home.name}
          </motion.h1>

          <motion.p
            className='text-xl md:text-2xl text-zinc-400 font-light mb-8'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {home.role}
          </motion.p>

          <motion.div
            className='text-zinc-400 text-base md:text-lg leading-relaxed mb-10 max-w-2xl'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {children}
          </motion.div>

          <motion.div
            className='flex flex-wrap gap-x-2 gap-y-3 mb-10'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {home.heroTechs.map((tech, i) => (
              <TechBadge
                name={tech}
                key={`intro-tech-${tech}`}
                {...techBadgeAnimation}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              />
            ))}
          </motion.div>

          <motion.div
            className='flex flex-col sm:flex-row items-start sm:items-center gap-6'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className='flex flex-col sm:flex-row gap-4'>
              <Button className='w-max shadow-button' onClick={handleContact}>
                {dict.hero.cta}
                <HiArrowNarrowRight size={18} />
              </Button>
              <a
                href='/pdf/gabriel-sousa.pdf'
                download='gabriel-sousa-curriculum.pdf'
              >
                <Button className='w-max shadow-button'>
                  {dict.hero.resume}
                  <HiDownload size={18} />
                </Button>
              </a>
            </div>

            <div className='text-zinc-500 text-2xl flex items-center gap-4'>
              {home.socials.map((contact, index) => (
                <a
                  href={contact.url}
                  key={`contact-${index}`}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='hover:text-emerald-500 transition-colors'
                >
                  <SVGIcon icon={contact.icon || ''} />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
