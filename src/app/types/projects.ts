import { RichTextContent } from '@graphcms/rich-text-types';

export type TecnologiasConhecidas = {
  iconeSvg: string;
  nome: string;
  dataDeInicio: string;
};

export type sessaoDoProjeto = {
  titulo: string;
  imagem: {
    url: string;
  };
};

export type Projeto = {
  slug: string;
  thumbnail: {
    url: string;
  };
  titulo: string;
  descricaoCurta: string;
  tecnologias: TecnologiasConhecidas[];
  thumbnailDaPagina: {
    url: string;
  };
  sessoes: sessaoDoProjeto[];
  descricao: {
    raw: RichTextContent;
    text: string;
  };
  projetoUrl?: string;
  githubUrl?: string;
};
