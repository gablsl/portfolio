import { GET_PROJECT_DETAILS, GET_PROJECTS_SLUG } from '@/app/apollo/queries';
import { ProjectDetails } from '@/app/components/pages/projetos/project-details';
import { ProjectSections } from '@/app/components/pages/projetos/project-section';
import { Metadata } from 'next';
import { ProjectProps } from '@/app/apollo/types';
import client from '@/app/apollo/client';

export default async function Projeto({ params: { slug } }: ProjectProps) {
  const { data } = await client.query({
    query: GET_PROJECT_DETAILS,
    variables: { slug },
  });

  console.log(data);

  return (
    <>
      <ProjectDetails projeto={data.projeto} />
      <ProjectSections sessoes={data.projeto.sessoes} />
    </>
  );
}

export async function generateStaticParams() {
  const { data } = await client.query({
    query: GET_PROJECTS_SLUG,
  });

  return data.projetos.map((projeto: { slug: string }) => ({
    slug: projeto.slug,
  }));
}

export async function generateMetadata({
  params: { slug },
}: ProjectProps): Promise<Metadata> {
  const { data } = await client.query({
    query: GET_PROJECT_DETAILS,
    variables: { slug },
  });

  return {
    title: data.projeto.titulo,
    description: data.projeto.descricao.text,
    openGraph: {
      images: [
        {
          url: data.projeto.thumbnail.url,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}
