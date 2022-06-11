FROM node:16-alpine

ENV PORT 3000

RUN mkdir -p /usr/src/mateonunez/website
WORKDIR /usr/src/mateonunez/website

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY articles articles
COPY assets assets
COPY components components
COPY lib lib
COPY pages pages
COPY public public
COPY styles styles

COPY .env.local .env.local
COPY jsconfig.json .
COPY next-sitemap.js .
COPY next.config.js .
COPY postcss.config.js .
COPY tailwind.config.js .

# Development
EXPOSE 3000
CMD npm run dev

# Build
# RUN npm run build
# EXPOSE 3000
# CMD npm start
