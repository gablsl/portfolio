import { Metadata } from 'next';
import { PageIntroduction } from '../components/pages/projetos/page-introduction';
import { ProjectList } from '../components/pages/projetos/projects-list';
import { GET_PROJECTS } from '../apollo/queries';
import client from '../apollo/client';

export const metadata: Metadata = {
  title: 'Projetos',
};

export default async function Projects() {
  const { data } = await client.query({
    query: GET_PROJECTS,
  });

  return (
    <>
      <PageIntroduction />
      <ProjectList projetos={data.projetos} />
    </>
  );
}
