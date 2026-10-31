import { Metadata, Viewport } from 'next';
import { Lang, langs } from './schemas';

export const BASE_URL = 'https://portfolio-gablsl1s-projects.vercel.app';

function normalizeImages(
  images: NonNullable<Metadata['openGraph']>['images'],
): NonNullable<Metadata['openGraph']>['images'] {
  if (!images) return images;

  const list = Array.isArray(images) ? images : [images];

  return list.map((img) => {
    if (typeof img === 'string') {
      return img.startsWith('http') ? img : `${BASE_URL}${img}`;
    }

    if (img instanceof URL) {
      return img.toString().startsWith('http') ? img.toString() : `${BASE_URL}${img.toString()}`;
    }

    return {
      ...img,
      url: img.url?.toString().startsWith('http') ? img.url : `${BASE_URL}${img.url}`,
    };
  });
}
export const SITE_NAME = 'Gabriel Leitão';
export const DEFAULT_DESCRIPTION = {
  en: 'Software Engineer with 3 years of experience building scalable web applications and distributed systems.',
  pt: 'Engenheiro de Software com 3 anos de experiência construindo aplicações web escaláveis e sistemas distribuídos.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#09090b',
};

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
  const desc = description || DEFAULT_DESCRIPTION[lang];
  const defaultImage = {
    url: '/images/hero-bg.png',
    width: 1200,
    height: 630,
    alt: title,
  };
  const ogImage = images ? normalizeImages(images) : normalizeImages(defaultImage);

  return {
    title,
    description: desc,
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: url,
      languages: Object.fromEntries(
        langs.map((l) => [l, `${BASE_URL}/${l}${path}`]),
      ),
    },
    openGraph: {
      title,
      description: desc,
      url,
      siteName: SITE_NAME,
      locale: lang,
      type: 'website',
      images: ogImage,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: desc,
      images: ogImage,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}
