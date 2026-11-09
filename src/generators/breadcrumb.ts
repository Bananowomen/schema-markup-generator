import { BreadcrumbItem } from '../types';

export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error('BreadcrumbList schema needs a non-empty array of { name, url } items.');
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => {
      if (!item.name || !item.url) {
        throw new Error('Each breadcrumb item needs both "name" and "url".');
      }
      return {
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url,
      };
    }),
  };
}
