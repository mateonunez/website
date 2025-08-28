import personal from './personal';

const config = {
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || personal.website,
  munber: 33,
  article: {
    relatedArticles: 5,
  },
};

export default config;
