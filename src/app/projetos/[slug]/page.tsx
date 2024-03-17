import { ProjectDetails } from '@/app/components/pages/projetos/project-details';
import { ProjectSections } from '@/app/components/pages/projetos/project-section';
import { ProjectPageData, ProjectsPageStaticData } from '@/app/types/pageInfo';
import { fetchHygraphQuery } from '@/app/utils/fetch-hygraph-query';
import { Metadata } from 'next';

type ProjectProps = {
  params: {
    slug: string;
  };
};

const getProjectDetails = async (slug: string): Promise<ProjectPageData> => {
  const query = `
    query ProjectQuery() {
      projeto(where: {slug: "${slug}"}) {
        thumbnailDaPagina {
          url
        }
        thumbnail {
          url
        }
        sessoes {
          titulo
          imagem {
            url
          }
        }
        titulo
        descricaoCurta
        descricao {
          raw
          text
        }
        tecnologias {
          nome
        }
        projetoUrl
        githubUrl
      }
    }
   `;

  return fetchHygraphQuery(query, 60 * 60 * 24);
};

export default async function Projeto({ params: { slug } }: ProjectProps) {
  const { projeto } = await getProjectDetails(slug);

  return (
    <>
      <ProjectDetails projeto={projeto} />
      <ProjectSections sessoes={projeto.sessoes} />
    </>
  );
}

export async function generateStaticParams() {
  const query = `
    query ProjectsSlugsQuery() {
      projetos(first: 100) {
        slug
      }
    }
  `;

  const { projetos } = await fetchHygraphQuery<ProjectsPageStaticData>(query);

  return projetos;
}

export async function generateMetadata({
  params: { slug },
}: ProjectProps): Promise<Metadata> {
  const data = await getProjectDetails(slug);
  const project = data.projeto;

  return {
    title: project.titulo,
    description: project.descricao.text,
    openGraph: {
      images: [
        {
          url: project.thumbnail.url,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}
