import { GET_PAGE_INFO } from './apollo/queries';
import { HeroSection } from './components/pages/home/hero-section';
import { HighlightedProjects } from './components/pages/home/highlighted-projects';
import { KnowsTechs } from './components/pages/home/knows-techs';
import { WorkExperience } from './components/pages/home/work-experience';
import client from './apollo/client';

export default async function Home() {
  const { data } = await client.query({
    query: GET_PAGE_INFO,
    variables: { timestamp: Date.now() }, // Forces fresh fetch
  });

  console.log(data.page);

  return (
    <>
      <HeroSection homeInfo={data.page} />
      <KnowsTechs techs={data.page.tecnologiasConhecidas} />
      <HighlightedProjects projetos={data.page.projetosEmDestaque} />
      <WorkExperience experiences={data.experienciaDeTrabalhos} />
    </>
  );
}
