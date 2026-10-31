import { Metadata } from 'next';
import { BlogList } from '../../components/pages/blog/blog-list';
import { getCurrentLang, Lang } from '../../lib/schemas';
import { getBlogPosts } from '../../lib/content';
import { getDictionary } from '../../i18n/dictionaries';
import { createMetadata } from '../../lib/metadata';

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang = params.lang as Lang;
  const dict = getDictionary(lang);
  return createMetadata({
    lang,
    title: `${dict.blog.title} | Gabriel Sousa`,
    path: '/blog',
  });
}

export default async function Blog({
  params,
}: {
  params: { lang: string };
}) {
  const lang = getCurrentLang(params.lang);
  const dict = getDictionary(lang);
  const posts = await getBlogPosts(lang);

  return <BlogList posts={posts} dict={dict} />;
}
