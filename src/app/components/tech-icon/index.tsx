'use client';

import { IconType } from 'react-icons';
import {
  SiAmazonaws,
  SiDocker,
  SiGo,
  SiGraphql,
  SiJavascript,
  SiJest,
  SiKotlin,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiOpenjdk,
  SiReact,
  SiSpringboot,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si';

type TechIconProps = {
  name: string;
  className?: string;
};

const iconMap: Record<string, IconType> = {
  Java: SiOpenjdk,
  'Spring Boot': SiSpringboot,
  Go: SiGo,
  Kotlin: SiKotlin,
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  TailwindCSS: SiTailwindcss,
  React: SiReact,
  NextJS: SiNextdotjs,
  'Node.js': SiNodedotjs,
  NestJS: SiNestjs,
  AWS: SiAmazonaws,
  Docker: SiDocker,
  Jest: SiJest,
  GraphQL: SiGraphql,
};

export function TechIcon({ name, className }: TechIconProps) {
  const Icon = iconMap[name];

  if (!Icon) {
    return null;
  }

  return <Icon className={className} aria-label={name} />;
}
