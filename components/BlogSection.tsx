import Image from 'next/image';
import Link from 'next/link';
import type { SanityImageSource } from '@sanity/image-url';
import { client } from '../sanity/lib/client';
import { urlFor } from '../sanity/lib/image';
import { BLOG_CARDS_QUERY } from '../sanity/queries';

type SanityPost = {
  _id: string;
  title: string;
  slug: string;
  category?: string;
  readingTime?: number;
  mainImage?: SanityImageSource;
  imageAlt?: string;
};

type ArticleCard = {
  id: string;
  title: string;
  category: string;
  href: string;
  imageUrl?: string;
  imageAlt?: string;
  cover: React.ReactNode;
  coverClass: string;
  titleClass?: string;
};

const fallbackArticles: ArticleCard[] = [
  { id: 'guia', category: 'FAMÍLIA E SUCESSÕES · 8 MIN', title: 'Planejamento sucessório: por que começar agora?', href: '#contato', cover: 'GUIA', coverClass: "h-78.75 bg-[linear-gradient(150deg,rgba(16,36,59,.35),rgba(16,36,59,.7)),linear-gradient(35deg,#b99159_0_23%,#d9d3c5_23%_52%,#36506b_52%)] text-white", titleClass: 'min-h-20' },
  { id: 'civil', category: 'DIREITO CIVIL · 5 MIN', title: 'Contrato bem feito é tranquilidade para o futuro.', href: '#contato', cover: <>DIREITO<br />EM FOCO</>, coverClass: 'h-58.75 bg-[repeating-linear-gradient(45deg,#d9e0d7_0_8px,#cbd3c8_8px_9px)] leading-[.9] text-[#15304a]' },
  { id: 'imoveis', category: 'DIREITO IMOBILIÁRIO · 6 MIN', title: 'O que observar antes de assinar um contrato de compra e venda.', href: '#contato', cover: 'IMÓVEIS', coverClass: 'h-58.75 bg-[linear-gradient(135deg,#b27c69,#513a4c_48%,#243b55)] text-white' },
];

function toArticleCard(post: SanityPost): ArticleCard {
  return {
    id: post._id,
    title: post.title,
    category: `${post.category?.toUpperCase() ?? 'ARTIGO'} · ${post.readingTime ?? 5} MIN`,
    href: `/blog/${post.slug}`,
    imageUrl: post.mainImage ? urlFor(post.mainImage).width(1200).height(700).fit('crop').url() : undefined,
    imageAlt: post.imageAlt ?? post.title,
    cover: post.category?.toUpperCase() ?? 'ARTIGO',
    coverClass: 'h-58.75 bg-[linear-gradient(135deg,rgba(178,124,105,.92),rgba(81,58,76,.96)_48%,rgba(36,59,85,.98)),repeating-linear-gradient(45deg,transparent_0_8px,rgba(255,255,255,.08)_8px_9px)] text-white',
  };
}

export async function BlogSection() {
  const posts = await client.fetch<SanityPost[]>(BLOG_CARDS_QUERY, {}, { next: { revalidate: 60 } });
  const articles = posts.length > 0 ? posts.map(toArticleCard) : fallbackArticles;

  return (
    <section id="blog" className="reveal-section bg-[#F3F3F3] px-5.5 py-20 md:px-[max(6vw,40px)] md:py-30">
      <div className="reveal-item mb-13.5 flex flex-col gap-6 md:flex-row md:items-center md:justify-between"><div><p className="mb-6.25 text-[11px] font-semibold tracking-[1.4px] text-[#D1AD7D]">BLOG</p><h2 className="font-['Playfair_Display'] text-[40px] leading-[1.12] tracking-[-1.6px] text-[#0A2723] md:text-[clamp(36px,4vw,57px)]">Informação que aproxima e <br /> <em className="font-medium text-[#D1AD7D]">orienta.</em></h2></div><Link className="border-b border-[#D1AD7D] pb-1.75 text-[14px] font-semibold text-[#D1AD7D] transition-colors duration-300 hover:text-[#0A2723]" href="/blog">Ver todos os artigos <span>→</span></Link></div>
      <div className="grid gap-5.5 md:grid-cols-2 xl:grid-cols-3">
        {articles.map((article, index) => (
          <article key={article.id} className={`reveal-item reveal-delay-${index + 1} h-full overflow-hidden rounded-xl border border-[#E0C8A0] bg-[#fffdf9] shadow-[0_12px_28px_rgba(10,39,35,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_34px_rgba(10,39,35,0.13)]`}>
            <Link href={article.href} aria-label={`Ler artigo: ${article.title}`} className="group flex h-full cursor-pointer flex-col">
              <div className={`relative flex items-end overflow-hidden p-5.5 font-['Playfair_Display'] text-[clamp(20px,2.1vw,30px)] ${article.coverClass}`}>
                {article.imageUrl && <><Image src={article.imageUrl} alt={article.imageAlt ?? ''} fill sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" /><span className="absolute inset-0 bg-[linear-gradient(to_top,rgba(10,39,35,.78),rgba(10,39,35,.2)_55%,transparent)]" /></>}
                <span className="relative z-10 max-h-[2.1em] max-w-[88%] overflow-hidden wrap-break-word leading-[1.05]">{article.cover}</span>
              </div>
              <div className="flex flex-1 flex-col p-6.25"><p className="mb-3 text-[10px] font-bold tracking-[.8px] text-[#D1AD7D]">{article.category}</p><h3 className={`mb-5.5 max-h-[3.84em] overflow-hidden font-['Playfair_Display'] text-[22px] leading-[1.28] text-[#0A2723] ${article.titleClass ?? ''}`}>{article.title}</h3><span className="mt-auto text-[13px] font-bold text-[#0A2723]">Ler artigo <span className="ml-2 inline-block text-[#D1AD7D] transition-transform duration-300 group-hover:translate-x-1.5">→</span></span></div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
