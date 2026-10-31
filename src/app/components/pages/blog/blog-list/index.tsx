'use client';

import Link from 'next/link';
import { SectionTitle } from '@/app/components/section-title';
import { Dictionary } from '@/app/i18n/dictionaries';
import { motion } from 'framer-motion';
import { fadeUpAnimation } from '@/app/lib/animations';
import { usePathname } from 'next/navigation';

type BlogListProps = {
  posts: Awaited<ReturnType<typeof import('@/app/lib/content').getBlogPosts>>;
  dict: Dictionary;
};

export function BlogList({ posts, dict }: BlogListProps) {
  const pathname = usePathname();

  return (
    <section className='container py-32'>
      <SectionTitle
        subtitle={dict.blog.subtitle}
        title={dict.blog.title}
        className='text-center items-center mb-16'
      />

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {posts.map((post, i) => (
          <motion.article
            key={post.slug}
            {...fadeUpAnimation}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <Link
              href={`${pathname.replace(/\/$/, '')}/${post.slug}`}
              className='block p-6 rounded-lg bg-zinc-900/50 border border-white/5 hover:border-emerald-500/30 transition-all h-full'
            >
              <time className='text-xs font-mono text-zinc-500'>
                {new Date(post.data.date).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <h3 className='text-xl font-medium mt-2 mb-3 group-hover:text-emerald-500 transition-colors'>
                {post.data.title}
              </h3>
              <p className='text-zinc-400 text-sm line-clamp-3'>
                {post.data.description}
              </p>
              <div className='flex flex-wrap gap-2 mt-4'>
                {post.data.tags.map((tag) => (
                  <span
                    key={tag}
                    className='text-xs font-mono px-2 py-1 rounded-full bg-zinc-800 text-zinc-400'
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </Link>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
