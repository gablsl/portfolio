import { RichTextContent } from '@graphcms/rich-text-types';
import { TecnologiasConhecidas } from './projects';

export type WorkExperience = {
  logoDaEmpresa: {
    url: string;
  };
  cargo: string;
  empresa: string;
  empresaUrl: string;
  dataDeInicio: string;
  dataFinal: string;
  tecnologias: TecnologiasConhecidas[];
  descricao: {
    raw: RichTextContent;
  };
};
