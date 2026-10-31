import { Metadata } from 'next';
import { Suspense } from 'react';
import { PageIntroduction } from '../../components/pages/projetos/page-introduction';
import { ProjectList } from '../../components/pages/projetos/projects-list';
import { getCurrentLang, Lang } from '../../lib/schemas';
import { getProjects } from '../../lib/content';
import { getDictionary } from '../../i18n/dictionaries';
import { createMetadata } from '../../lib/metadata';

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang = params.lang as Lang;
  const dict = getDictionary(lang);
  return createMetadata({
    lang,
    title: `${dict.projects.title} | Gabriel Leitão`,
    description: dict.projects.intro,
    path: '/projects',
  });
}

export default async function Projects({
  params,
}: {
  params: { lang: string };
}) {
  const lang = getCurrentLang(params.lang);
  const dict = getDictionary(lang);
  const projects = await getProjects(lang);

  return (
    <>
      <PageIntroduction dict={dict} />
      <Suspense>
        <ProjectList projects={projects} dict={dict} />
      </Suspense>
    </>
  );
}
