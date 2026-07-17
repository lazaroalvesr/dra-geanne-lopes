import Image from 'next/image';
import Link from 'next/link';
import type { SanityImageSource } from '@sanity/image-url';
import { urlFor } from '../sanity/lib/image';

export type RelatedPost = {
  _id: string;
  title: string;
  slug: string;
  category?: string;
  readingTime?: number;
  mainImage?: SanityImageSource;
  imageAlt?: string;
};

export function RelatedArticles({ posts }: { posts: RelatedPost[] }) {
  if (!posts.length) return null;

  return (
    <section className="mx-auto mt-20 max-w-280 border-t border-[#D1AD7D55] pt-14 md:mt-26" aria-labelledby="related-articles-title">
      <p className="mb-4 text-[11px] font-bold tracking-[1.3px] text-[#D1AD7D]">CONTINUE A LEITURA</p>
      <div className="mb-9 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <h2 id="related-articles-title" className="font-['Playfair_Display'] text-[34px] leading-[1.12] text-[#0A2723] md:text-[43px]">Você também pode se <em className="font-medium text-[#D1AD7D]">interessar.</em></h2>
        <Link href="/blog" className="w-fit border-b border-[#D1AD7D] pb-1 text-[13px] font-semibold text-[#0A2723] transition-colors hover:text-[#31514b]">Ver todos os artigos →</Link>
      </div>
      <div className="grid gap-5.5 md:grid-cols-2 xl:grid-cols-3">
        {posts.map((post) => {
          const imageUrl = post.mainImage ? urlFor(post.mainImage).width(1000).height(600).fit('crop').url() : undefined;
          const cover = post.category?.toUpperCase() ?? 'ARTIGO';

          return (
            <article key={post._id} className="overflow-hidden rounded-xl border border-[#E0C8A0] bg-[#fffdf9] shadow-[0_10px_24px_rgba(10,39,35,.07)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_30px_rgba(10,39,35,.12)]">
              <Link href={`/blog/${post.slug}`} className="group flex h-full cursor-pointer flex-col" aria-label={`Ler artigo: ${post.title}`}>
                <div className={`relative flex h-47.5 items-end overflow-hidden p-5 font-['Playfair_Display'] text-[22px] ${imageUrl ? 'text-white' : 'bg-[linear-gradient(135deg,rgba(178,124,105,.92),rgba(81,58,76,.96)_48%,rgba(36,59,85,.98)),repeating-linear-gradient(45deg,transparent_0_8px,rgba(255,255,255,.08)_8px_9px)] text-white'}`}>
                  {imageUrl && <><Image src={imageUrl} alt={post.imageAlt ?? post.title} fill sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" /><span className="absolute inset-0 bg-[linear-gradient(to_top,rgba(10,39,35,.8),rgba(10,39,35,.15)_58%,transparent)]" /></>}
                  <span className="relative z-10 max-h-[2.1em] max-w-[88%] overflow-hidden wrap-break-word leading-[1.05]">{cover}</span>
                </div>
                <div className="flex flex-1 flex-col p-5.5">
                  <p className="mb-3 text-[10px] font-bold tracking-[.75px] text-[#D1AD7D]">{post.category?.toUpperCase() ?? 'ARTIGO'} · {post.readingTime ?? 5} MIN</p>
                  <h3 className="mb-5 max-h-[3.84em] overflow-hidden font-['Playfair_Display'] text-[21px] leading-[1.28] text-[#0A2723]">{post.title}</h3>
                  <span className="mt-auto text-[13px] font-bold text-[#0A2723]">Ler artigo <span className="ml-2 inline-block text-[#D1AD7D] transition-transform duration-300 group-hover:translate-x-1.5">→</span></span>
                </div>
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
}
