import { SectionTitle } from '@/app/components/section-title';
import { ExperienceItem } from './experience-item';
import { MDXContent } from '@/app/lib/mdx';
import { Dictionary } from '@/app/i18n/dictionaries';

type WorkExperienceProps = {
  experiences: Awaited<ReturnType<typeof import('@/app/lib/content').getExperiences>>;
  dict: Dictionary;
};

export function WorkExperience({ experiences, dict }: WorkExperienceProps) {
  return (
    <section className='container py-20'>
      <div className='max-w-[640px] mx-auto text-center mb-16'>
        <SectionTitle
          subtitle={dict.workExperience.subtitle}
          title={dict.workExperience.title}
          className='items-center'
        />

        <p className='text-zinc-400 mt-6'>{dict.workExperience.cta}</p>
      </div>

      <div className='relative max-w-4xl mx-auto'>
        {experiences?.map((experience, index) => (
          <div key={experience.slug} className='mb-16 last:mb-0'>
            <ExperienceItem
              experience={experience}
              dict={dict}
              side={index % 2 === 0 ? 'left' : 'right'}
            >
              <MDXContent source={experience.source} />
            </ExperienceItem>
          </div>
        ))}
      </div>
    </section>
  );
}
