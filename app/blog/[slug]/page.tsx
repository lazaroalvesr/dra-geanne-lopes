import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { SanityImageSource } from '@sanity/image-url';
import type { PortableTextBlock } from '@portabletext/types';
import { Footer } from '../../../components/Footer';
import { PortableTextContent } from '../../../components/PortableTextContent';
import { RelatedArticles, type RelatedPost } from '../../../components/RelatedArticles';
import { ShareButtons } from '../../../components/ShareButtons';
import { WhatsAppButton } from '../../../components/WhatsAppButton';
import { absoluteUrl } from '../../site-config';
import { client } from '../../../sanity/lib/client';
import { urlFor } from '../../../sanity/lib/image';
import { POST_BY_SLUG_QUERY, RECENT_POSTS_EXCLUDING_CURRENT_QUERY, RELATED_POSTS_BY_CATEGORY_QUERY } from '../../../sanity/queries';

type BlogPost = {
  _id: string;
  _updatedAt?: string;
  title: string;
  excerpt?: string;
  category?: string;
  categoryId?: string;
  authorName?: string;
  readingTime?: number;
  publishedAt?: string;
  mainImage?: SanityImageSource;
  imageLqip?: string;
  imageAlt?: string;
  seo?: {
    title?: string;
    description?: string;
    image?: SanityImageSource;
    imageAlt?: string;
    noIndex?: boolean;
  };
  body?: PortableTextBlock[];
};

type PageProps = {
  params: Promise<{ slug: string }>;
};

async function getPost(slug: string) {
  return client.withConfig({ stega: false }).fetch<BlogPost | null>(POST_BY_SLUG_QUERY, { slug }, { next: { revalidate: 60 } });
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) return { title: 'Artigo não encontrado', robots: { index: false, follow: false } };

  const title = post.seo?.title ?? post.title;
  const description = post.seo?.description ?? post.excerpt ?? 'Conteúdo informativo da Dra. Geanne Lopes sobre Direito Previdenciário.';
  const image = post.seo?.image ?? post.mainImage;
  const imageUrl = image ? urlFor(image).width(1200).height(630).fit('crop').url() : undefined;
  const canonicalUrl = absoluteUrl(`/blog/${slug}`);

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    robots: post.seo?.noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      type: 'article',
      locale: 'pt_BR',
      url: canonicalUrl,
      title,
      description,
      publishedTime: post.publishedAt,
      modifiedTime: post._updatedAt,
      authors: [post.authorName ?? 'Dra. Geanne Lopes'],
      images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630, alt: post.seo?.imageAlt ?? post.imageAlt ?? title }] : undefined,
    },
    twitter: {
      card: imageUrl ? 'summary_large_image' : 'summary',
      title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const [sameCategoryPosts, recentPosts] = await Promise.all([
    post.categoryId
      ? client.fetch<RelatedPost[]>(RELATED_POSTS_BY_CATEGORY_QUERY, { postId: post._id, categoryId: post.categoryId }, { next: { revalidate: 60 } })
      : Promise.resolve<RelatedPost[]>([]),
    client.fetch<RelatedPost[]>(RECENT_POSTS_EXCLUDING_CURRENT_QUERY, { postId: post._id }, { next: { revalidate: 60 } }),
  ]);
  const relatedPosts = Array.from(new Map([...sameCategoryPosts, ...recentPosts].map((relatedPost) => [relatedPost._id, relatedPost])).values()).slice(0, 3);

  // A própria CDN do Sanity já redimensiona, recorta e entrega WebP/AVIF.
  // Assim evitamos uma segunda conversão pelo otimizador da Vercel na primeira visita.
  const imageUrl = post.mainImage
    ? urlFor(post.mainImage).width(1600).height(900).fit('crop').auto('format').quality(80).url()
    : undefined;
  const publishedAt = post.publishedAt ? new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long' }).format(new Date(post.publishedAt)) : undefined;
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.seo?.title ?? post.title,
    description: post.seo?.description ?? post.excerpt,
    image: imageUrl ? [imageUrl] : undefined,
    datePublished: post.publishedAt,
    dateModified: post._updatedAt ?? post.publishedAt,
    inLanguage: 'pt-BR',
    mainEntityOfPage: absoluteUrl(`/blog/${slug}`),
    author: { '@type': 'Person', name: post.authorName ?? 'Dra. Geanne Lopes' },
    publisher: { '@type': 'LegalService', name: 'Dra. Geanne Lopes | Advocacia Previdenciária' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd).replace(/</g, '\\u003c') }} />
      <header className="flex items-center justify-between border-b border-[#D1AD7D33] bg-[#F3F3F3] px-5.5 py-5 md:px-[max(6vw,40px)] md:py-6">
        <Link href="/" className="font-['Playfair_Display'] text-[21px] font-bold text-[#0A2723]">
          <Image
            src="/assets/Logo-dra.png"
            alt='Logo da Dra Geanne Lope'
            width={260}
            height={260}
            className={`h-auto w-50 xl:w-65`}
          />
        </Link>
        <Link href="/" className="text-[14px] font-semibold text-[#0A2723]">← Voltar ao site</Link>
      </header>
      <main className="bg-[#F3F3F3] px-5.5 py-15 md:px-[max(12vw,60px)] md:py-24">
        <article className="mx-auto max-w-220">
          <p className="mb-5 text-[11px] font-bold tracking-[1.3px] text-[#D1AD7D]">{post.category?.toUpperCase() ?? 'CONTEÚDOS'} {post.readingTime ? `· ${post.readingTime} MIN` : ''}</p>
          <h1 className="mb-6 font-['Playfair_Display'] text-[32px] leading-[1.12] tracking-[-1.2px] text-[#0A2723] md:text-[clamp(32px,3vw,48px)]">{post.title}</h1>
          {post.excerpt && <p className="mb-9 max-w-175 font-['Playfair_Display'] text-[20px] leading-[1.55] text-[#0A2723] md:text-[24px]">{post.excerpt}</p>}
          <div className="mb-9 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-[#65706D]">
            {publishedAt && <span>Publicado em {publishedAt}</span>}
            {publishedAt && <span aria-hidden="true" className="h-1 w-1 rounded-full bg-[#D1AD7D]" />}
            <span>Publicado por <strong className="font-semibold text-[#0A2723]">{post.authorName ?? 'Dra. Geanne Lopes'}</strong></span>
          </div>
          {imageUrl && <div className="relative mb-11 aspect-video overflow-hidden rounded-xl bg-[#E7E1D8]">
            <Image
              src={imageUrl}
              alt={post.imageAlt ?? post.title}
              fill
              preload
              fetchPriority="high"
              unoptimized
              placeholder={post.imageLqip ? 'blur' : 'empty'}
              blurDataURL={post.imageLqip}
              sizes="(max-width: 900px) 100vw, 900px"
              className="object-cover"
            />
          </div>}
          <div className="max-w-175 space-y-6 font-['Playfair_Display'] text-[19px] leading-[1.7] text-[#0A2723] md:text-[22px]">
            <PortableTextContent value={post.body} />
          </div>
          <ShareButtons title={post.title} />
        </article>
        <RelatedArticles posts={relatedPosts} />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
