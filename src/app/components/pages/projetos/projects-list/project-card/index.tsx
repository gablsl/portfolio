import { Projeto } from '@/app/types/projects';
import Image from 'next/image';

type ProjectCardProps = {
  project: Projeto;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const technologies = project.tecnologias.map((x) => x.nome).join(', ');

  return (
    <div className='rounded-lg h-[436px] flex flex-col bg-gray-800 overflow-hidden border-2 border-gray-800 hover:border-emerald-500 opacity-70 hover:opacity-100 transition-all cursor-pointer group'>
      <div className='w-full h-48 overflow-hidden'>
        <Image
          width={380}
          height={200}
          src={project.thumbnail.url}
          alt={`Thumbnail do projeto ${project.titulo}`}
          className='w-full h-full object-cover group-hover:scale-110 duration-500 transition-all'
          loading='lazy'
          unoptimized
        />
      </div>

      <div className='flex-1 flex flex-col p-8'>
        <strong className='font-medium text-gray-50/90 group-hover:text-emerald-500 transition-all'>
          {project.titulo}
        </strong>
        <p className='mt-2 text-gray-400 line-clamp-4'>
          {project.descricaoCurta}
        </p>
        <span className='text-gray-300 text-sm font-medium block mt-auto truncate'>
          {technologies}
        </span>
      </div>
    </div>
  );
}
