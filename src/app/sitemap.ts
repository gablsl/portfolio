import { MetadataRoute } from 'next';
import { getProjectSlugs, getBlogSlugs } from './lib/content';
import { langs } from './lib/schemas';

const BASE_URL = 'https://portfolio-gablsl1s-projects.vercel.app';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projectSlugs = await getProjectSlugs();
  const blogSlugs = await getBlogSlugs();

  const routes = ['', '/projects', '/blog', '/about'];

  const entries: MetadataRoute.Sitemap = [];

  for (const lang of langs) {
    for (const route of routes) {
      entries.push({
        url: `${BASE_URL}/${lang}${route}`,
        lastModified: new Date(),
        alternates: {
          languages: Object.fromEntries(
            langs.map((l) => [l, `${BASE_URL}/${l}${route}`]),
          ),
        },
      });
    }

    for (const slug of projectSlugs) {
      entries.push({
        url: `${BASE_URL}/${lang}/projects/${slug}`,
        lastModified: new Date(),
        alternates: {
          languages: Object.fromEntries(
            langs.map((l) => [l, `${BASE_URL}/${l}/projects/${slug}`]),
          ),
        },
      });
    }

    for (const { slug } of blogSlugs) {
      entries.push({
        url: `${BASE_URL}/${lang}/blog/${slug}`,
        lastModified: new Date(),
        alternates: {
          languages: Object.fromEntries(
            langs.map((l) => [l, `${BASE_URL}/${l}/blog/${slug}`]),
          ),
        },
      });
    }
  }

  return entries;
}
