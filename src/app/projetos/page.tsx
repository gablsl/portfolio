import { Metadata } from 'next';
import { PageIntroduction } from '../components/pages/projetos/page-introduction';
import { ProjectList } from '../components/pages/projetos/projects-list';
import { ProjectsPagedata } from '../types/pageInfo';
import { fetchHygraphQuery } from '../utils/fetch-hygraph-query';

export const metadata: Metadata = {
  title: 'Projetos',
};

const getPageData = async (): Promise<ProjectsPagedata> => {
  const query = `
  query ProjectQuery {
    projetos {
      descricaoCurta
      slug
      titulo
      thumbnail {
        url
      }
      tecnologias {
        nome
      }
    }
  }
  `;

  return fetchHygraphQuery(query, 60 * 60 * 24);
};

export default async function Projects() {
  const { projetos } = await getPageData();

  return (
    <>
      <PageIntroduction />
      <ProjectList projetos={projetos} />
    </>
  );
}
