import type { MetadataRoute } from 'next';
import { siteUrl } from './site-config';
import { client } from '../sanity/lib/client';
import { SITEMAP_POSTS_QUERY } from '../sanity/queries';

type SitemapPost = {
  slug: string;
  _updatedAt?: string;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: siteUrl, changeFrequency: 'monthly', priority: 1 },
    { url: `${siteUrl}/blog`, changeFrequency: 'weekly', priority: 0.8 },
  ];

  try {
    const posts = await client.fetch<SitemapPost[]>(SITEMAP_POSTS_QUERY, {}, { next: { revalidate: 3600 } });
    return [
      ...staticPages,
      ...posts.map((post) => ({
        url: `${siteUrl}/blog/${post.slug}`,
        lastModified: post._updatedAt ? new Date(post._updatedAt) : undefined,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      })),
    ];
  } catch {
    return staticPages;
  }
}
