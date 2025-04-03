'use client';

import { RichText } from '@/app/components/rich-text';
import { TechBadge } from '@/app/components/tech-badge';
import { WorkExperience } from '@/app/types/work-experience';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeUpAnimation, techBadgeAnimation } from '@/app/lib/animations';

type ExperienceItemProps = {
  experience: WorkExperience;
};

export function ExperienceItem({ experience }: ExperienceItemProps) {
  const {
    cargo,
    dataDeInicio,
    dataFinal,
    descricao,
    empresa,
    empresaUrl,
    logoDaEmpresa,
    tecnologias,
  } = experience;

  return (
    <motion.div
      className='grid grid-cols-[40px,1fr] gap-4 md:gap-10'
      {...fadeUpAnimation}
      transition={{ duration: 0.5 }}
    >
      <div className='flex flex-col items-center gap-4'>
        <div className='rounded-full border border-gray-500 p-0.5'>
          <Image
            width={40}
            height={40}
            src={logoDaEmpresa.url}
            alt={`Logo da empresa ${empresa}`}
            loading='lazy'
            className='rounded-full '
          />
        </div>

        <div className='h-full w-[1px] bg-gray-800' />
      </div>

      <div>
        <div className='flex flex-col gap-2 text-sm sm:text-base'>
          <a
            href={empresaUrl}
            target='_blank'
            className='text-gray-500 hover:text-emerald-500 transition-colors'
          >
            @ {experience.empresa}
          </a>

          <h4 className='text-gray-300'>{cargo}</h4>
          <div className='text-gray-400'>
            <RichText content={descricao.raw} />
          </div>
        </div>

        <p className='text-gray-400 text-sm mb-3 mt-6 font-semibold'>
          Competências
        </p>

        <div className='flex gap-x-2 gap-y-3 flex-wrap lg:max-w-[350px] mb-8'>
          {tecnologias.map((tech, i) => (
            <TechBadge
              name={tech.nome}
              key={`${empresa}-tech-${tech.nome}`}
              {...techBadgeAnimation}
              transition={{ duration: 0.5, delay: i * 0.2 }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
