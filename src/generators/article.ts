import { ArticleInput } from '../types';
import { requireFields } from '../validate';

export function buildArticleSchema(input: ArticleInput) {
  requireFields(
    input,
    ['headline', 'description', 'authorName', 'datePublished', 'publisherName', 'url'],
    'Article'
  );

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.headline,
    description: input.description,
    author: { '@type': 'Person', name: input.authorName },
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    image: input.imageUrl ? [input.imageUrl] : undefined,
    publisher: {
      '@type': 'Organization',
      name: input.publisherName,
      logo: input.publisherLogoUrl
        ? { '@type': 'ImageObject', url: input.publisherLogoUrl }
        : undefined,
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': input.url },
  };
}
