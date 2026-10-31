'use client';

import React from 'react';
import { TechBadge } from '@/app/components/tech-badge';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { techBadgeAnimation } from '@/app/lib/animations';
import { Dictionary } from '@/app/i18n/dictionaries';

type ExperienceItemProps = {
  experience: Awaited<ReturnType<typeof import('@/app/lib/content').getExperiences>>[number];
  dict: Dictionary;
  side: 'left' | 'right';
  children: React.ReactNode;
};

export function ExperienceItem({
  experience,
  dict,
  side,
  children,
}: ExperienceItemProps) {
  const { role, company, companyUrl, companyLogo, startDate, endDate, technologies } =
    experience.data;

  const start = new Date(startDate).toLocaleDateString('pt-BR', {
    month: 'short',
    year: 'numeric',
  });
  const end = endDate
    ? new Date(endDate).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' })
    : dict.workExperience.present;

  const isLeft = side === 'left';

  return (
    <motion.div
      className='relative grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-6 md:gap-12 items-start'
      initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Mobile line */}
      <div className='md:hidden absolute left-[19px] top-0 bottom-0 w-px bg-zinc-800' />

      {/* Desktop center line + dot */}
      <div className='hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-zinc-800 -translate-x-1/2' />
      <div className='hidden md:flex absolute left-1/2 top-1 w-4 h-4 rounded-full bg-zinc-950 border-2 border-emerald-500 -translate-x-1/2 items-center justify-center'>
        <span className='w-1.5 h-1.5 rounded-full bg-emerald-500' />
      </div>

      {/* Left side (desktop) */}
      <div
        className={`hidden md:flex flex-col ${
          isLeft ? 'md:col-start-1 md:text-right md:items-end' : 'md:col-start-1 md:items-end md:justify-center'
        }`}
      >
        {isLeft ? (
          <Content
            role={role}
            company={company}
            companyUrl={companyUrl}
            start={start}
            end={end}
            technologies={technologies}
            dict={dict}
          >
            {children}
          </Content>
        ) : (
          <Logo company={company} companyLogo={companyLogo} />
        )}
      </div>

      {/* Center spacer */}
      <div className='hidden md:block md:col-start-2' />

      {/* Right side (desktop) */}
      <div
        className={`hidden md:flex flex-col ${
          isLeft ? 'md:col-start-3 md:items-start md:justify-center' : 'md:col-start-3 md:items-start'
        }`}
      >
        {isLeft ? (
          <Logo company={company} companyLogo={companyLogo} />
        ) : (
          <Content
            role={role}
            company={company}
            companyUrl={companyUrl}
            start={start}
            end={end}
            technologies={technologies}
            dict={dict}
          >
            {children}
          </Content>
        )}
      </div>

      {/* Mobile layout */}
      <div className='md:hidden flex items-start gap-5 col-span-full'>
        <div className='relative z-10 flex-shrink-0'>
          <Logo company={company} companyLogo={companyLogo} size='sm' />
        </div>
        <Content
          role={role}
          company={company}
          companyUrl={companyUrl}
          start={start}
          end={end}
          technologies={technologies}
          dict={dict}
        >
          {children}
        </Content>
      </div>
    </motion.div>
  );
}

type LogoProps = {
  company: string;
  companyLogo: string;
  size?: 'sm' | 'md';
};

function Logo({ company, companyLogo, size = 'md' }: LogoProps) {
  const dimensions = size === 'sm' ? 40 : 56;

  return (
    <div className='rounded-full border border-zinc-700 bg-zinc-900/50 p-1'>
      <Image
        width={dimensions}
        height={dimensions}
        src={companyLogo}
        alt={`${company} logo`}
        loading='lazy'
        className='rounded-full object-cover'
      />
    </div>
  );
}

type ContentProps = {
  role: string;
  company: string;
  companyUrl: string;
  start: string;
  end: string;
  technologies: string[];
  dict: Dictionary;
  children: React.ReactNode;
};

function Content({
  role,
  company,
  companyUrl,
  start,
  end,
  technologies,
  dict,
  children,
}: ContentProps) {
  return (
    <div className='max-w-md'>
      <div className='flex flex-col gap-1'>
        <h4 className='text-lg font-medium text-zinc-100'>{role}</h4>
        <a
          href={companyUrl}
          target='_blank'
          rel='noopener noreferrer'
          className='text-sm text-emerald-500 hover:text-emerald-400 transition-colors w-fit'
        >
          @ {company}
        </a>
        <p className='text-xs font-mono text-zinc-500'>
          {start} — {end}
        </p>
      </div>

      <div className='text-zinc-400 prose prose-invert prose-sm max-w-none mt-3'>
        {children}
      </div>

      <p className='text-zinc-500 text-xs font-medium uppercase tracking-wider mb-2 mt-5'>
        {dict.workExperience.skills}
      </p>

      <div className='flex gap-x-2 gap-y-2 flex-wrap'>
        {technologies.map((tech, i) => (
          <TechBadge
            name={tech}
            key={`${company}-tech-${tech}`}
            {...techBadgeAnimation}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          />
        ))}
      </div>
    </div>
  );
}
