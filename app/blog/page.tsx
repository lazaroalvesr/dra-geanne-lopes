import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import type { SanityImageSource } from '@sanity/image-url';
import { BlogArchive, type ArchivedPost } from '../../components/BlogArchive';
import { Footer } from '../../components/Footer';
import { WhatsAppButton } from '../../components/WhatsAppButton';
import { client } from '../../sanity/lib/client';
import { urlFor } from '../../sanity/lib/image';
import { ALL_BLOG_POSTS_QUERY } from '../../sanity/queries';
import { absoluteUrl } from '../site-config';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Conteúdos e orientações sobre Direito Previdenciário.',
  alternates: { canonical: '/blog' },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: absoluteUrl('/blog'),
    title: 'Blog | Dra. Geanne Lopes',
    description: 'Conteúdos e orientações sobre Direito Previdenciário.',
  },
  twitter: {
    card: 'summary',
    title: 'Blog | Dra. Geanne Lopes',
    description: 'Conteúdos e orientações sobre Direito Previdenciário.',
  },
};

type BlogPost = {
  _id: string;
  title: string;
  slug: string;
  category?: string;
  readingTime?: number;
  mainImage?: SanityImageSource;
  imageAlt?: string;
};

export default async function BlogPage() {
  const posts = await client.fetch<BlogPost[]>(ALL_BLOG_POSTS_QUERY, {}, { next: { revalidate: 60 } });
  const archivePosts: ArchivedPost[] = posts.map((post) => ({
    id: post._id,
    title: post.title,
    slug: post.slug,
    category: post.category,
    readingTime: post.readingTime,
    imageUrl: post.mainImage ? urlFor(post.mainImage).width(1200).height(700).fit('crop').url() : undefined,
    imageAlt: post.imageAlt ?? post.title,
  }));

  return (
    <>
      <header className="flex items-center justify-between border-b border-[#D1AD7D33] bg-[#F3F3F3] px-5.5 py-5 md:px-[max(6vw,40px)] md:py-6">
        <Link href="/" aria-label="Dra. Geanne Lopes — Início">
          <Image
            src="/assets/Logo-dra.png"
            alt="Logo da Dra. Geanne Lopes"
            width={260}
            height={70}
            priority
            sizes="(max-width: 767px) 200px, 260px"
            className="h-auto w-50 xl:w-65"
          />
        </Link>
        <Link href="/" className="text-[14px] font-semibold text-[#0A2723]">← Página principal</Link>
      </header>
      <main className="min-h-[65vh] bg-[#F3F3F3] px-5.5 py-18 md:px-[max(6vw,40px)] md:py-25">
        <div className="mx-auto max-w-350">
          <p className="mb-5 text-[11px] font-semibold tracking-[1.4px] text-[#D1AD7D]">BLOG</p>
          <h1 className="mb-9 max-w-190 font-['Playfair_Display'] text-[42px] leading-[1.1] tracking-[-1.7px] text-[#0A2723] md:text-[clamp(48px,5vw,72px)]">Informação para decisões mais <em className="font-medium text-[#D1AD7D]">seguras.</em></h1>
          <BlogArchive posts={archivePosts} />
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
