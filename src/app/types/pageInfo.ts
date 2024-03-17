import type { RichTextContent } from '@graphcms/rich-text-types';
import { Projeto, TecnologiasConhecidas } from './projects';
import { WorkExperience } from './work-experience';

export type RedesSocials = {
  url: string;
  iconeSvg: string;
};

export type HomePageInfo = {
  introducao: {
    raw: RichTextContent;
  };
  tecnologias: TecnologiasConhecidas[];
  imagemDePerfil: {
    url: string;
  };
  redeSocials: RedesSocials[];
  tecnologiasConhecidas: TecnologiasConhecidas[];
  projetosEmDestaque: Projeto[];
};

export type ProjectPageData = {
  projeto: Projeto;
};

export type ProjectsPagedata = {
  projetos: Projeto[];
};

export type ProjectsPageStaticData = {
  projetos: {
    slug: string;
  }[];
};

export type HomePageData = {
  page: HomePageInfo;
  experienciaDeTrabalhos: WorkExperience[];
};
