import { Horizontal } from '@/app/components/divider/horizontal';
import { SectionTitle } from '@/app/components/section-title';
import { ProjectCard } from './project-card';
import { Link } from '@/app/components/link';
import { HiArrowNarrowRight } from 'react-icons/hi';
import { Projeto } from '@/app/types/projects';

type HighlightedProjectsProps = {
  projetos: Projeto[];
};

export function HighlightedProjects({ projetos }: HighlightedProjectsProps) {
  return (
    <section className='container py-16'>
      <SectionTitle subtitle='destaques' title='Projetos em destaque' />
      <Horizontal className='mb-16' />
      <div>
        {projetos?.map((project) => (
          <div key={project.slug}>
            <ProjectCard project={project} />
            <Horizontal className='my-16' />
          </div>
        ))}

        <p className='flex items-center gap-1.5'>
          <span className='text-gray-400'>Se interesssou?</span>
          <Link href='/projetos' className='inline-flex'>
            Ver todos
            <HiArrowNarrowRight />
          </Link>
        </p>
      </div>
    </section>
  );
}
