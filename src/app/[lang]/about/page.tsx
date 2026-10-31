import { Metadata } from 'next';
import { AboutContent } from '../../components/pages/about';
import { getCurrentLang, Lang } from '../../lib/schemas';
import { getAbout, getHome } from '../../lib/content';
import { getDictionary } from '../../i18n/dictionaries';
import { MDXContent } from '../../lib/mdx';
import { BASE_URL, createMetadata, DEFAULT_DESCRIPTION } from '../../lib/metadata';

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang = params.lang as Lang;
  const dict = getDictionary(lang);
  return createMetadata({
    lang,
    title: `${dict.about.title} | Gabriel Leitão`,
    description: DEFAULT_DESCRIPTION[lang],
    path: '/about',
  });
}

export default async function About({
  params,
}: {
  params: { lang: string };
}) {
  const lang = getCurrentLang(params.lang);
  const dict = getDictionary(lang);
  const about = await getAbout(lang);
  const { data: home } = await getHome(lang);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: dict.about.title,
    description: DEFAULT_DESCRIPTION[lang],
    url: `${BASE_URL}/${lang}/about`,
    mainEntity: {
      '@type': 'Person',
      name: home.name,
      jobTitle: home.role,
      image: `${BASE_URL}${home.profileImage}`,
      url: `${BASE_URL}/${lang}`,
      knowsAbout: home.knownTechs.map((t) => t.name),
    },
  };

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AboutContent
        about={about}
        techs={home.knownTechs}
        profileImage={home.profileImage}
        dict={dict}
      >
        <MDXContent source={about.source} />
      </AboutContent>
    </>
  );
}
