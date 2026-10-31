import { Horizontal } from '@/app/components/divider/horizontal';
import { SectionTitle } from '@/app/components/section-title';
import { ProjectCard } from './project-card';
import { Link } from '@/app/components/link';
import { HiArrowNarrowRight } from 'react-icons/hi';
import { Dictionary } from '@/app/i18n/dictionaries';
import { Lang } from '@/app/lib/schemas';

type HighlightedProjectsProps = {
  projects: Awaited<ReturnType<typeof import('@/app/lib/content').getFeaturedProjects>>;
  dict: Dictionary;
  lang: Lang;
};

export function HighlightedProjects({ projects, dict, lang }: HighlightedProjectsProps) {
  return (
    <section className='container py-16'>
      <SectionTitle
        subtitle={dict.highlightedProjects.subtitle}
        title={dict.highlightedProjects.title}
      />
      <Horizontal className='mb-16' />
      <div>
        {projects?.map((project) => (
          <div key={project.slug}>
            <ProjectCard project={project} dict={dict} lang={lang} />
            <Horizontal className='my-16' />
          </div>
        ))}

        <p className='flex items-center gap-1.5'>
          <span className='text-zinc-400'>{dict.highlightedProjects.cta}?</span>
          <Link href={`/${lang}/projects`} className='inline-flex'>
            {dict.highlightedProjects.cta}
            <HiArrowNarrowRight />
          </Link>
        </p>
      </div>
    </section>
  );
}
