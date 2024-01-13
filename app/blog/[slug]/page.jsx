'use client';
import s from 'styles/pages/blog/[slug].module.css';
import Article from 'components/articles';

// import { getArticle } from 'lib/articles/parser';

// import { Suspense, cache } from 'react';
// import dynamic from 'next/dynamic';
// import config from 'lib/config';
// import meta from 'lib/config/metadata.js';

// export async function generateMetadata({ params }) {
//   const { slug } = params;
//   const { frontMatter } = await fetchArticle({ slug });

//   const baseUrl = new URL(config.baseUrl);
//   const imagePath = frontMatter.image.startsWith('/') ? frontMatter.image : `/${frontMatter.image}`;
//   const imageUrl = new URL(imagePath, baseUrl).toString();

//   const dynamicMetadata = {
//     ...meta,
//     title: frontMatter.title,
//     description: frontMatter.description,
//     keywords: frontMatter.tags,
//     openGraph: {
//       ...meta.openGraph,
//       title: frontMatter.title,
//       description: frontMatter.description,
//       type: 'article',
//       article: {
//         authors: [frontMatter.author.name],
//         tags: frontMatter.tags,
//         publishedTime: frontMatter.date,
//         modifiedTime: frontMatter.date,
//       },
//       images: [
//         {
//           url: imageUrl,
//           alt: frontMatter.title,
//         },
//       ],
//     },
//   };
//   return dynamicMetadata;
// }

export default function BlogArticle({ params }) {
  const { slug } = params;

  console.log({ slug });

  return (
    <div className={s.root}>
        {/* <DefaultArticle /> */}
      Ciao!
    </div>
  );
}
