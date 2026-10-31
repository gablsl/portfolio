'use client';

import { Link } from '@/app/components/link';
import { MDXContent } from '@/app/lib/mdx';
import { Dictionary } from '@/app/i18n/dictionaries';
import { HiArrowNarrowLeft } from 'react-icons/hi';
import { motion } from 'framer-motion';
import { fadeUpAnimation } from '@/app/lib/animations';
import { usePathname } from 'next/navigation';

type BlogPostProps = {
  post: Awaited<ReturnType<typeof import('@/app/lib/content').getBlogPost>>;
  dict: Dictionary;
  children: React.ReactNode;
};

export function BlogPost({ post, dict, children }: BlogPostProps) {
  const pathname = usePathname();

  return (
    <article className='container py-32 max-w-[760px] mx-auto'>
      <motion.div {...fadeUpAnimation} transition={{ duration: 0.5 }}>
        <time className='text-sm font-mono text-emerald-400'>
          {new Date(post.data.date).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>
        <h1 className='text-3xl md:text-4xl font-medium mt-4 mb-6'>
          {post.data.title}
        </h1>
        <div className='flex flex-wrap gap-2 mb-10'>
          {post.data.tags.map((tag) => (
            <span
              key={tag}
              className='text-xs font-mono px-2 py-1 rounded-full bg-zinc-800 text-zinc-400'
            >
              #{tag}
            </span>
          ))}
        </div>
      </motion.div>

      <motion.div
        className='prose prose-invert prose-zinc max-w-none'
        {...fadeUpAnimation}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {children}
      </motion.div>

      <div className='mt-16'>
        <Link href={pathname.replace(/\/[^/]*$/, '')}>
          <HiArrowNarrowLeft size={20} />
          {dict.blog.back}
        </Link>
      </div>
    </article>
  );
}
