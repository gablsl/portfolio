import { Metadata } from 'next';
import { HeroSection } from '../components/pages/home/hero-section';
import { HighlightedProjects } from '../components/pages/home/highlighted-projects';
import { KnowsTechs } from '../components/pages/home/knows-techs';
import { WorkExperience } from '../components/pages/home/work-experience';
import { getCurrentLang, Lang } from '../lib/schemas';
import { getHome, getFeaturedProjects, getExperiences } from '../lib/content';
import { getDictionary } from '../i18n/dictionaries';
import { MDXContent } from '../lib/mdx';
import { createMetadata } from '../lib/metadata';

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang = params.lang as Lang;
  const dict = getDictionary(lang);
  return createMetadata({
    lang,
    title: `${dict.nav.home} | Gabriel Sousa`,
    description: dict.workExperience.cta,
    path: '',
  });
}

export default async function Home({
  params,
}: {
  params: { lang: string };
}) {
  const lang = getCurrentLang(params.lang);
  const dict = getDictionary(lang);
  const { data: home, source: homeContent } = await getHome(lang);
  const projects = await getFeaturedProjects(lang);
  const experiences = await getExperiences(lang);

  return (
    <>
      <HeroSection home={home} dict={dict}>
        <MDXContent source={homeContent} />
      </HeroSection>
      <KnowsTechs techs={home.knownTechs} dict={dict} />
      <HighlightedProjects projects={projects} dict={dict} lang={lang} />
      <WorkExperience experiences={experiences} dict={dict} />
    </>
  );
}
