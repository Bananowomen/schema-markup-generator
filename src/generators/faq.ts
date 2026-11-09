import { FaqItem } from '../types';

export function buildFaqSchema(items: FaqItem[]) {
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error('FAQPage schema needs a non-empty array of { question, answer } items.');
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => {
      if (!item.question || !item.answer) {
        throw new Error('Each FAQ item needs both "question" and "answer".');
      }
      return {
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      };
    }),
  };
}
