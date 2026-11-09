import { ProductInput } from '../types';
import { requireFields } from '../validate';

export function buildProductSchema(input: ProductInput) {
  requireFields(
    input,
    ['name', 'description', 'imageUrl', 'priceCurrency', 'price', 'url'],
    'Product'
  );

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: input.name,
    description: input.description,
    image: [input.imageUrl],
    sku: input.sku,
    brand: input.brandName ? { '@type': 'Brand', name: input.brandName } : undefined,
    offers: {
      '@type': 'Offer',
      priceCurrency: input.priceCurrency,
      price: input.price,
      availability: `https://schema.org/${input.availability ?? 'InStock'}`,
      url: input.url,
    },
  };
}
