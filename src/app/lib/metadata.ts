import { Metadata } from 'next';
import { Lang, langs } from './schemas';

export const BASE_URL = 'https://portfolio-gablsl1s-projects.vercel.app';

export function createMetadata({
  lang,
  title,
  description,
  path,
  images,
}: {
  lang: Lang;
  title: string;
  description?: string;
  path: string;
  images?: NonNullable<Metadata['openGraph']>['images'];
}): Metadata {
  const url = `${BASE_URL}/${lang}${path}`;

  return {
    title,
    description,
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: url,
      languages: Object.fromEntries(
        langs.map((l) => [l, `${BASE_URL}/${l}${path}`]),
      ),
    },
    openGraph: {
      title,
      description,
      url,
      locale: lang,
      type: 'website',
      images,
    },
  };
}
