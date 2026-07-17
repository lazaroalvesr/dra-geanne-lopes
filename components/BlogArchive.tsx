'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';

export type ArchivedPost = {
  id: string;
  title: string;
  slug: string;
  category?: string;
  readingTime?: number;
  imageUrl?: string;
  imageAlt?: string;
};

type BlogArchiveProps = {
  posts: ArchivedPost[];
};

export function BlogArchive({ posts }: BlogArchiveProps) {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const categories = useMemo(() => ['Todos', ...Array.from(new Set(posts.map((post) => post.category).filter((category): category is string => Boolean(category))))], [posts]);
  const filteredPosts = selectedCategory === 'Todos' ? posts : posts.filter((post) => post.category === selectedCategory);

  return (
    <>
      <div className="mb-10 flex flex-wrap gap-2.5" aria-label="Filtrar artigos por categoria">
        {categories.map((category) => {
          const selected = selectedCategory === category;

          return (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              aria-pressed={selected}
              className={`cursor-pointer rounded-full border px-4 py-2 text-[13px] font-semibold transition-all duration-300 ${selected ? 'border-[#0A2723] bg-[#0A2723] text-white shadow-[0_6px_14px_rgba(10,39,35,.16)]' : 'border-[#D1AD7D80] bg-[#fffdf9] text-[#0A2723] hover:border-[#0A2723] hover:bg-[#0A27230d]'}`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {filteredPosts.length > 0 ? (
        <div className="grid gap-5.5 md:grid-cols-2 xl:grid-cols-3">
          {filteredPosts.map((post) => {
            const cover = post.category?.toUpperCase() ?? 'ARTIGO';

            return (
              <article key={post.id} className="overflow-hidden rounded-xl border border-[#E0C8A0] bg-[#fffdf9] shadow-[0_12px_28px_rgba(10,39,35,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_34px_rgba(10,39,35,0.13)]">
                <Link href={`/blog/${post.slug}`} aria-label={`Ler artigo: ${post.title}`} className="group flex h-full cursor-pointer flex-col">
                  <div className={`relative flex h-58.75 items-end overflow-hidden p-5.5 font-['Playfair_Display'] text-[clamp(20px,2.1vw,30px)] ${post.imageUrl ? 'text-white' : 'bg-[linear-gradient(135deg,rgba(178,124,105,.92),rgba(81,58,76,.96)_48%,rgba(36,59,85,.98)),repeating-linear-gradient(45deg,transparent_0_8px,rgba(255,255,255,.08)_8px_9px)] text-white'}`}>
                    {post.imageUrl && <><Image src={post.imageUrl} alt={post.imageAlt ?? post.title} fill sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" /><span className="absolute inset-0 bg-[linear-gradient(to_top,rgba(10,39,35,.78),rgba(10,39,35,.2)_55%,transparent)]" /></>}
                    <span className="relative z-10 max-h-[2.1em] max-w-[88%] overflow-hidden wrap-break-word leading-[1.05]">{cover}</span>
                  </div>
                  <div className="flex flex-1 flex-col p-6.25">
                    <p className="mb-3 text-[10px] font-bold tracking-[.8px] text-[#D1AD7D]">{post.category?.toUpperCase() ?? 'ARTIGO'} · {post.readingTime ?? 5} MIN</p>
                    <h2 className="mb-5.5 max-h-[3.84em] overflow-hidden font-['Playfair_Display'] text-[22px] leading-[1.28] text-[#0A2723]">{post.title}</h2>
                    <span className="mt-auto text-[13px] font-bold text-[#0A2723]">Ler artigo <span className="ml-2 inline-block text-[#D1AD7D] transition-transform duration-300 group-hover:translate-x-1.5">→</span></span>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      ) : (
        <p className="rounded-xl border border-dashed border-[#D1AD7D80] bg-[#fffdf9] px-6 py-9 text-[16px] text-[#0A2723]">Ainda não há artigos nesta categoria.</p>
      )}
    </>
  );
}
