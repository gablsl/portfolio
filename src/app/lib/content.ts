import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { z } from 'zod';
import {
  aboutSchema,
  blogPostSchema,
  DEFAULT_LANG,
  experienceSchema,
  homeDataSchema,
  isLang,
  Lang,
  langs,
  projectSchema,
} from './schemas';

const CONTENT_DIR = path.join(process.cwd(), 'content');

function contentDir(lang: Lang, segment: string) {
  return path.join(CONTENT_DIR, lang, segment);
}

async function readMdxFile<T>(
  lang: Lang,
  segment: string,
  slug: string,
  schema: z.ZodSchema<T>,
  fallback = true,
): Promise<{ data: T; source: string; slug: string }> {
  const tryRead = async (l: Lang) => {
    const filePath = path.join(contentDir(l, segment), `${slug}.mdx`);
    const raw = await fs.readFile(filePath, 'utf-8');
    const { data, content } = matter(raw);
    return { data: schema.parse(data), source: content, slug };
  };

  try {
    return await tryRead(lang);
  } catch (error) {
    if (fallback && lang !== DEFAULT_LANG) {
      return tryRead(DEFAULT_LANG);
    }
    throw error;
  }
}

async function listMdxFiles<T>(
  lang: Lang,
  segment: string,
  schema: z.ZodSchema<T>,
) {
  const dir = contentDir(lang, segment);
  const files = await fs.readdir(dir).catch(() => [] as string[]);

  const entries = await Promise.all(
    files
      .filter((file) => file.endsWith('.mdx'))
      .map(async (file) => {
        const slug = file.replace(/\.mdx$/, '');
        const { data, source } = await readMdxFile(
          lang,
          segment,
          slug,
          schema,
          false,
        );
        return { data, source, slug };
      }),
  );

  return entries;
}

export function getCurrentLang(param: string): Lang {
  return isLang(param) ? param : DEFAULT_LANG;
}

export async function getHome(lang: Lang) {
  return readMdxFile(lang, '', 'home', homeDataSchema);
}

export async function getAbout(lang: Lang) {
  return readMdxFile(lang, '', 'about', aboutSchema);
}

export async function getProjects(lang: Lang) {
  const projects = await listMdxFiles(lang, 'projects', projectSchema);
  return projects.sort((a, b) => a.data.order - b.data.order);
}

export async function getFeaturedProjects(lang: Lang) {
  const projects = await getProjects(lang);
  return projects.filter((p) => p.data.featured);
}

export async function getProject(lang: Lang, slug: string) {
  return readMdxFile(lang, 'projects', slug, projectSchema);
}

export async function getProjectSlugs() {
  const slugs = new Set<string>();
  await Promise.all(
    langs.map(async (lang) => {
      const dir = contentDir(lang, 'projects');
      const files = await fs.readdir(dir).catch(() => [] as string[]);
      files
        .filter((f) => f.endsWith('.mdx'))
        .forEach((f) => slugs.add(f.replace(/\.mdx$/, '')));
    }),
  );
  return Array.from(slugs);
}

async function getExistingSlugs(segment: string) {
  const entries: { lang: Lang; slug: string }[] = [];
  await Promise.all(
    langs.map(async (lang) => {
      const dir = contentDir(lang, segment);
      const files = await fs.readdir(dir).catch(() => [] as string[]);
      files
        .filter((f) => f.endsWith('.mdx'))
        .forEach((f) => entries.push({ lang, slug: f.replace(/\.mdx$/, '') }));
    }),
  );
  return entries;
}

export async function getExperiences(lang: Lang) {
  const experiences = await listMdxFiles(lang, 'experiences', experienceSchema);
  return experiences.sort(
    (a, b) =>
      new Date(b.data.startDate).getTime() -
      new Date(a.data.startDate).getTime(),
  );
}

export async function getBlogPosts(lang: Lang) {
  const posts = await listMdxFiles(lang, 'blog', blogPostSchema);
  return posts.sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime(),
  );
}

export async function getBlogPost(lang: Lang, slug: string) {
  return readMdxFile(lang, 'blog', slug, blogPostSchema);
}

export async function getBlogSlugs() {
  return getExistingSlugs('blog');
}
