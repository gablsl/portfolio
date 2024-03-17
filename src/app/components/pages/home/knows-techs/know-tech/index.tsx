import { CMSIcon } from '@/app/components/cms-icon';
import { TecnologiasConhecidas } from '@/app/types/projects';
import { getRelativeTime } from '@/app/utils/ger-relative-time';

type KnowTechProps = {
  tech: TecnologiasConhecidas;
};

export function KnowTech({ tech }: KnowTechProps) {
  const relativeTime = getRelativeTime(
    new Date(tech.dataDeInicio),
    'pt-BR'
  ).replace('há', '');

  return (
    <div className='p-6 rounded-lg bg-gray-600/20 text-gray-500 flex flex-col gap-2 hover:text-emerald-500 hover:bg-gray-600/30 transition-all'>
      <div className='flex items-center justify-between'>
        <p className='font-medium'>{tech.nome}</p>
        <CMSIcon icon={tech.iconeSvg} />
      </div>

      <span>{relativeTime} de experiência</span>
    </div>
  );
}
