import { defineQuery } from 'next-sanity';

export const BLOG_CARDS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)]
    | order(coalesce(publishedAt, _createdAt) desc)[0...3] {
      _id,
      title,
      excerpt,
      "slug": slug.current,
      "category": categories[0]->title,
      "readingTime": estimatedReadingTime,
      mainImage,
      "imageAlt": mainImage.alt
    }
`);

export const ALL_BLOG_POSTS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)]
    | order(coalesce(publishedAt, _createdAt) desc) {
      _id,
      title,
      excerpt,
      "slug": slug.current,
      "category": categories[0]->title,
      "readingTime": estimatedReadingTime,
      mainImage,
      "imageAlt": mainImage.alt
    }
`);

export const POST_BY_SLUG_QUERY = defineQuery(`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    _updatedAt,
    title,
    excerpt,
    "slug": slug.current,
    "category": categories[0]->title,
    "categoryId": categories[0]._ref,
    "authorName": author->name,
    "readingTime": estimatedReadingTime,
    publishedAt,
    mainImage,
    "imageLqip": mainImage.asset->metadata.lqip,
    "imageAlt": mainImage.alt,
    "seo": {
      "title": coalesce(seo.title, title),
      "description": coalesce(seo.description, excerpt),
      "image": coalesce(seo.image, mainImage),
      "imageAlt": coalesce(seo.image.alt, mainImage.alt),
      "noIndex": seo.noIndex == true
    },
    body
  }
`);

export const SITEMAP_POSTS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current) && seo.noIndex != true] {
    "slug": slug.current,
    _updatedAt
  }
`);

export const RELATED_POSTS_BY_CATEGORY_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current) && _id != $postId && $categoryId in categories[]._ref]
    | order(coalesce(publishedAt, _createdAt) desc)[0...3] {
      _id,
      title,
      "slug": slug.current,
      "category": categories[0]->title,
      "readingTime": estimatedReadingTime,
      mainImage,
      "imageAlt": mainImage.alt
    }
`);

export const RECENT_POSTS_EXCLUDING_CURRENT_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current) && _id != $postId]
    | order(coalesce(publishedAt, _createdAt) desc)[0...3] {
      _id,
      title,
      "slug": slug.current,
      "category": categories[0]->title,
      "readingTime": estimatedReadingTime,
      mainImage,
      "imageAlt": mainImage.alt
    }
`);
