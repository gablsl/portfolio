import { Metadata } from 'next';
import { HeroSection } from '../components/pages/home/hero-section';
import { HighlightedProjects } from '../components/pages/home/highlighted-projects';
import { KnowsTechs } from '../components/pages/home/knows-techs';
import { WorkExperience } from '../components/pages/home/work-experience';
import { getCurrentLang, Lang } from '../lib/schemas';
import { getHome, getFeaturedProjects, getExperiences } from '../lib/content';
import { getDictionary } from '../i18n/dictionaries';
import { MDXContent } from '../lib/mdx';
import { BASE_URL, createMetadata, DEFAULT_DESCRIPTION } from '../lib/metadata';

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang = params.lang as Lang;
  const dict = getDictionary(lang);
  return createMetadata({
    lang,
    title: `Gabriel Leitão | ${dict.nav.home}`,
    description: DEFAULT_DESCRIPTION[lang],
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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: home.name,
    jobTitle: home.role,
    url: `${BASE_URL}/${lang}`,
    image: `${BASE_URL}${home.profileImage}`,
    sameAs: home.socials.map((s) => s.url),
    knowsAbout: home.knownTechs.map((t) => t.name),
    description: DEFAULT_DESCRIPTION[lang],
  };

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection home={home} dict={dict}>
        <MDXContent source={homeContent} />
      </HeroSection>
      <KnowsTechs techs={home.knownTechs} dict={dict} />
      <HighlightedProjects projects={projects} dict={dict} lang={lang} />
      <WorkExperience experiences={experiences} dict={dict} />
    </>
  );
}
