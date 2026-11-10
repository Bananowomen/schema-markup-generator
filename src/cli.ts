#!/usr/bin/env node
import { readFileSync } from 'fs';
import { buildArticleSchema } from './generators/article';
import { buildProductSchema } from './generators/product';
import { buildFaqSchema } from './generators/faq';
import { buildLocalBusinessSchema } from './generators/localBusiness';
import { buildBreadcrumbSchema } from './generators/breadcrumb';
import { stripUndefined } from './validate';

const GENERATORS: Record<string, (data: unknown) => object> = {
  article: (data) => buildArticleSchema(data as never),
  product: (data) => buildProductSchema(data as never),
  faq: (data) => buildFaqSchema(data as never),
  localbusiness: (data) => buildLocalBusinessSchema(data as never),
  breadcrumb: (data) => buildBreadcrumbSchema(data as never),
};

function main(): void {
  const [type, filePath] = process.argv.slice(2);

  if (!type || !filePath) {
    console.error('Usage: schema-gen <article|product|faq|localbusiness|breadcrumb> <input.json>');
    console.error('Example: schema-gen article examples/article.json');
    process.exit(1);
  }

  const build = GENERATORS[type.toLowerCase()];
  if (!build) {
    console.error(`Unknown schema type "${type}". Supported: ${Object.keys(GENERATORS).join(', ')}`);
    process.exit(1);
  }

  let data: unknown;
  try {
    data = JSON.parse(readFileSync(filePath, 'utf-8'));
  } catch (err) {
    console.error(err instanceof Error ? err.message : err);
    process.exit(1);
  }

  let schema: object;
  try {
    schema = stripUndefined(build(data));
  } catch (err) {
    console.error(err instanceof Error ? err.message : err);
    process.exit(1);
  }

  const json = JSON.stringify(schema, null, 2);

  console.log(json);
  console.log('\n--- paste into <head> ---\n');
  console.log(`<script type="application/ld+json">\n${json}\n</script>`);
}

main();
