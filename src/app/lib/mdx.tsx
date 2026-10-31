import { MDXRemote } from 'next-mdx-remote/rsc';
import { ReactNode } from 'react';
import remarkGfm from 'remark-gfm';

export type MDXContentProps = {
  source: string;
  components?: Record<string, React.ComponentType<{ children?: ReactNode }>>;
};

export async function MDXContent({ source, components }: MDXContentProps) {
  return (
    <MDXRemote
      source={source}
      components={components}
      options={{
        parseFrontmatter: false,
        mdxOptions: {
          remarkPlugins: [remarkGfm],
        },
      }}
    />
  );
}
