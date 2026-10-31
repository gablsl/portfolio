import { z } from 'zod';

export const langs = ['en', 'pt'] as const;
export type Lang = (typeof langs)[number];

export function isLang(value: string): value is Lang {
  return langs.includes(value as Lang);
}

export const DEFAULT_LANG: Lang = 'en';

export function getCurrentLang(param: string): Lang {
  return isLang(param) ? param : DEFAULT_LANG;
}

const technologySchema = z.object({
  name: z.string(),
  icon: z.string().nullable().optional(),
});

export const homeDataSchema = z.object({
  name: z.string(),
  role: z.string(),
  profileImage: z.string(),
  knownTechs: z.array(
    z.object({
      name: z.string(),
      icon: z.string().nullable().optional(),
      startDate: z.string(),
    }),
  ),
  heroTechs: z.array(z.string()),
  socials: z.array(
    z.object({
      name: z.string(),
      url: z.string(),
      icon: z.string().nullable().optional(),
    }),
  ),
});

export const projectSchema = z.object({
  title: z.string(),
  shortDescription: z.string(),
  category: z.enum(['frontend', 'backend', 'fullstack']),
  featured: z.boolean(),
  order: z.number(),
  technologies: z.array(z.string()),
  thumbnail: z.string(),
  pageThumbnail: z.string().optional(),
  sections: z.array(
    z.object({
      title: z.string(),
      image: z.string(),
    }),
  ),
  projectUrl: z.string().nullable().optional(),
  githubUrl: z.string().nullable().optional(),
});

export const experienceSchema = z.object({
  role: z.string(),
  company: z.string(),
  companyUrl: z.string(),
  companyLogo: z.string(),
  startDate: z.string(),
  endDate: z.string().nullable().optional(),
  technologies: z.array(z.string()),
});

export const aboutSchema = z.object({
  title: z.string(),
});

export const blogPostSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.string(),
  tags: z.array(z.string()),
  cover: z.string().optional(),
});

export type HomeData = z.infer<typeof homeDataSchema>;
export type ProjectMeta = z.infer<typeof projectSchema>;
export type ExperienceMeta = z.infer<typeof experienceSchema>;
export type AboutMeta = z.infer<typeof aboutSchema>;
export type BlogPostMeta = z.infer<typeof blogPostSchema>;
