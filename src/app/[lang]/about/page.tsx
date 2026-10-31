import { Metadata } from 'next';
import { AboutContent } from '../../components/pages/about';
import { getCurrentLang, Lang } from '../../lib/schemas';
import { getAbout, getHome } from '../../lib/content';
import { getDictionary } from '../../i18n/dictionaries';
import { MDXContent } from '../../lib/mdx';
import { createMetadata } from '../../lib/metadata';

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang = params.lang as Lang;
  const dict = getDictionary(lang);
  return createMetadata({
    lang,
    title: `${dict.about.title} | Gabriel Sousa`,
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

  return (
    <AboutContent
      about={about}
      techs={home.knownTechs}
      profileImage={home.profileImage}
      dict={dict}
    >
      <MDXContent source={about.source} />
    </AboutContent>
  );
}
