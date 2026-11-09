# Schema Markup Generator

Hand-written JSON-LD breaks silently. One missing field, one typo in a `@type`, and the markup just gets ignored — no error, no warning, nothing in your console. Google and every AI system quietly act like it was never there.

This generator refuses to let that happen. Give it the data, it gives you valid `schema.org` JSON-LD for `Article`, `Product`, `FAQPage`, `LocalBusiness` and `BreadcrumbList` — or a loud, specific error naming exactly what you forgot.

## Why

Structured data is one of the clearest signals you can give both search engines and AI systems about what a page actually is. It's also one of the easiest things to ship broken, because nothing tells you when it is. This tool validates on the way in, so what comes out is always something a crawler can actually parse.

## Install

```
git clone <this-repo-url>
cd schema-markup-generator
npm install
npm run build
```

## Usage

```
node dist/cli.js article examples/article.json
node dist/cli.js product examples/product.json
node dist/cli.js faq examples/faq.json
```

Output is the JSON-LD object plus a ready-to-paste `<script type="application/ld+json">` block.

## Example run

```
$ node dist/cli.js faq examples/faq.json

{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the difference between SEO and GEO?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SEO optimizes for ranking in traditional search results. GEO (Generative Engine Optimization) optimizes for being cited inside AI-generated answers, such as ChatGPT or Google's AI Overviews."
      }
    }
  ]
}

--- paste into <head> ---

<script type="application/ld+json">
...
</script>
```

Real, unedited output from the `faq` example shipped in this repo. Break it on purpose — delete `"answer"` from one item in `examples/faq.json` and re-run:

```
$ node dist/cli.js faq examples/faq.json
Each FAQ item needs both "question" and "answer".
```

No silent failure, no half-valid markup shipped to production. That's the entire point of this tool.

## Supported types

| Type | Required fields |
|---|---|
| `article` | headline, description, authorName, datePublished, publisherName, url |
| `product` | name, description, imageUrl, priceCurrency, price, url |
| `faq` | a non-empty list of `{ question, answer }` |
| `localbusiness` | name, streetAddress, addressLocality, addressCountry, url |
| `breadcrumb` | a non-empty list of `{ name, url }` |

Missing a required field throws a clear error naming exactly what's missing, instead of silently emitting invalid markup.

## License

MIT — Uliana Sierik
