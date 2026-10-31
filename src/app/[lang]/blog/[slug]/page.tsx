import { Metadata } from 'next';
import { BlogPost } from '../../../components/pages/blog/blog-post';
import { getCurrentLang, Lang } from '../../../lib/schemas';
import { getBlogPost, getBlogSlugs } from '../../../lib/content';
import { getDictionary } from '../../../i18n/dictionaries';
import { MDXContent } from '../../../lib/mdx';
import { createMetadata } from '../../../lib/metadata';

type BlogPostPageProps = {
  params: { lang: string; slug: string };
};

export default async function BlogPostPage({ params: { lang, slug } }: BlogPostPageProps) {
  const currentLang = getCurrentLang(lang);
  const dict = getDictionary(currentLang);
  const post = await getBlogPost(currentLang, slug);

  return (
    <BlogPost post={post} dict={dict}>
      <MDXContent source={post.source} />
    </BlogPost>
  );
}

export async function generateStaticParams() {
  return getBlogSlugs();
}

export async function generateMetadata({
  params: { lang, slug },
}: BlogPostPageProps): Promise<Metadata> {
  const currentLang = getCurrentLang(lang);
  const post = await getBlogPost(currentLang, slug);

  return createMetadata({
    lang: currentLang,
    title: `${post.data.title} | Gabriel Leitão`,
    description: post.data.description,
    path: `/blog/${slug}`,
  });
}
