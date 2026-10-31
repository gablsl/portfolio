import { Metadata } from 'next';
import { ProjectDetails } from '../../../components/pages/projetos/project-details';
import { ProjectSections } from '../../../components/pages/projetos/project-section';
import { getCurrentLang, Lang } from '../../../lib/schemas';
import { getProject, getProjectSlugs } from '../../../lib/content';
import { getDictionary } from '../../../i18n/dictionaries';
import { MDXContent } from '../../../lib/mdx';
import { createMetadata } from '../../../lib/metadata';

type ProjectPageProps = {
  params: { lang: string; slug: string };
};

export default async function Project({ params: { lang, slug } }: ProjectPageProps) {
  const currentLang = getCurrentLang(lang);
  const dict = getDictionary(currentLang);
  const project = await getProject(currentLang, slug);

  return (
    <>
      <ProjectDetails project={project} dict={dict} lang={currentLang}>
        <MDXContent source={project.source} />
      </ProjectDetails>
      <ProjectSections sections={project.data.sections} />
    </>
  );
}

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  const params: { lang: Lang; slug: string }[] = [];
  for (const lang of ['en', 'pt'] as Lang[]) {
    for (const slug of slugs) {
      params.push({ lang, slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params: { lang, slug },
}: ProjectPageProps): Promise<Metadata> {
  const currentLang = getCurrentLang(lang);
  const project = await getProject(currentLang, slug);

  return createMetadata({
    lang: currentLang,
    title: `${project.data.title} | Gabriel Leitão`,
    description: project.data.shortDescription,
    path: `/projects/${slug}`,
    images: [
      {
        url: project.data.thumbnail,
        width: 1200,
        height: 630,
      },
    ],
  });
}
