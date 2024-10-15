import { HeroSection } from './components/pages/home/hero-section';
import { HighlightedProjects } from './components/pages/home/highlighted-projects';
import { KnowsTechs } from './components/pages/home/knows-techs';
import { WorkExperience } from './components/pages/home/work-experience';
import { HomePageData } from './types/pageInfo';
import { fetchHygraphQuery } from './utils/fetch-hygraph-query';

const getPageData = async (): Promise<HomePageData> => {
    const query = `
  query pageInfoQuery {
    page(where: {slug: "home"}) {
      introducao {
        raw
      }
      tecnologiasConhecidas {
         iconeSvg
         nome
         dataDeInicio
      }
      tecnologias {
         nome
      }
      imagemDePerfil {
         url
      }
      redeSocials {
        url
        iconeSvg
      }
      projetosEmDestaque {
        slug
        thumbnail {
          url
        }
        titulo
        descricaoCurta
        tecnologias {
          nome
        }
      }
    }
      experienciaDeTrabalhos {
      logoDaEmpresa {
        url
      }
      cargo
      empresa
      empresaUrl
      dataDeInicio
      dataFinal
      descricao {
        raw
      }
      tecnologias {
        nome
      }
    }
  }
  `;

    return fetchHygraphQuery(query, 60 * 60 * 24);
};

export default async function Home() {
    const { page: pageData, experienciaDeTrabalhos } = await getPageData();

    return (
        <>
            <HeroSection homeInfo={pageData} />
            <KnowsTechs techs={pageData.tecnologiasConhecidas} />
            <HighlightedProjects projetos={pageData.projetosEmDestaque} />
            <WorkExperience experiences={experienciaDeTrabalhos} />
        </>
    );
}
