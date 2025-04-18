import { gql } from '@apollo/client';

export const GET_PAGE_INFO = gql`
  query pageInfoQuery {
    page(where: { slug: "home" }) {
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

export const GET_PROJECTS = gql`
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

export const GET_PROJECT_DETAILS = gql`
  query ProjectQuery($slug: String!) {
    projeto(where: { slug: $slug }) {
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

export const GET_PROJECTS_SLUG = gql`
  query ProjectsSlugsQuery {
    projetos(first: 100) {
      slug
    }
  }
`;
