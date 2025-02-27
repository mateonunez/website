import personal from './personal';

const config = {
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || personal.website,
  munber: 33,
};

export default config;
