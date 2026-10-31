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
      className='relative grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-6 md:gap-12'
      initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Timeline line */}
      <div className='absolute left-[19px] md:left-1/2 top-0 bottom-0 w-px bg-zinc-800 md:-translate-x-1/2' />

      {/* Desktop left column */}
      <div
        className={`hidden md:flex flex-col ${
          isLeft
            ? 'md:col-start-1 md:items-end md:text-right'
            : 'md:col-start-1 md:items-end'
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
            align='right'
          >
            {children}
          </Content>
        ) : (
          <Logo company={company} companyLogo={companyLogo} />
        )}
      </div>

      {/* Desktop center column */}
      <div className='hidden md:flex md:col-start-2 items-start justify-center pt-1'>
        {isLeft ? <Logo company={company} companyLogo={companyLogo} /> : null}
      </div>

      {/* Desktop right column */}
      <div
        className={`hidden md:flex flex-col ${
          isLeft
            ? 'md:col-start-3 md:items-start'
            : 'md:col-start-3 md:items-start md:text-left'
        }`}
      >
        {isLeft ? null : (
          <Content
            role={role}
            company={company}
            companyUrl={companyUrl}
            start={start}
            end={end}
            technologies={technologies}
            align='left'
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
          align='left'
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
  align: 'left' | 'right';
  children: React.ReactNode;
};

function Content({
  role,
  company,
  companyUrl,
  start,
  end,
  technologies,
  align,
  children,
}: ContentProps) {
  return (
    <div className='w-full max-w-full md:max-w-md'>
      <div className='flex flex-col gap-1'>
        <h4 className='text-lg font-medium text-zinc-100'>{role}</h4>
        <a
          href={companyUrl}
          target='_blank'
          rel='noopener noreferrer'
          className='text-sm text-emerald-500 hover:text-emerald-400 transition-colors inline-block'
        >
          @ {company}
        </a>
        <p className='text-xs font-mono text-zinc-500'>
          {start} — {end}
        </p>
      </div>

      <div className='text-zinc-400 prose prose-invert prose-sm max-w-none mt-3 [&_ul]:list-none [&_ul]:pl-0 [&_li]:relative [&_li]:pl-0'>
        {children}
      </div>

      <div
        className={`flex gap-x-2 gap-y-2 flex-wrap mt-5 ${
          align === 'right' ? 'md:justify-end' : 'md:justify-start'
        }`}
      >
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
