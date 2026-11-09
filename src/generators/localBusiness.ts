import { LocalBusinessInput } from '../types';
import { requireFields } from '../validate';

export function buildLocalBusinessSchema(input: LocalBusinessInput) {
  requireFields(
    input,
    ['name', 'streetAddress', 'addressLocality', 'addressCountry', 'url'],
    'LocalBusiness'
  );

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: input.name,
    description: input.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: input.streetAddress,
      addressLocality: input.addressLocality,
      addressCountry: input.addressCountry,
    },
    telephone: input.telephone,
    url: input.url,
    priceRange: input.priceRange,
  };
}
