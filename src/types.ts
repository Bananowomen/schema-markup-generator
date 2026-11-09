export interface ArticleInput {
  headline: string;
  description: string;
  authorName: string;
  datePublished: string;
  dateModified?: string;
  imageUrl?: string;
  publisherName: string;
  publisherLogoUrl?: string;
  url: string;
}

export interface ProductInput {
  name: string;
  description: string;
  imageUrl: string;
  sku?: string;
  brandName?: string;
  priceCurrency: string;
  price: number;
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder';
  url: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface LocalBusinessInput {
  name: string;
  description?: string;
  streetAddress: string;
  addressLocality: string;
  addressCountry: string;
  telephone?: string;
  url: string;
  priceRange?: string;
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}
