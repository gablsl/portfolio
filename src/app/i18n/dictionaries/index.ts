import { en } from './en';
import { pt } from './pt';
import { Lang } from '@/app/lib/schemas';

export type Dictionary = typeof en;

const dictionaries: Record<Lang, Dictionary> = {
  en,
  pt,
};

export function getDictionary(lang: Lang): Dictionary {
  return dictionaries[lang];
}
