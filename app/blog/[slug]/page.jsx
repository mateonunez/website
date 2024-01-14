import config from "lib/config";
import BlogArticleClient from "./page-client";
import meta from "lib/config/metadata";
import { getArticle } from "lib/articles/parser";

export async function generateMetadata({ params }) {
  const { slug } = params;
  const { frontMatter } = await getArticle({ slug });

  console.log('frontMatter', frontMatter);

  const baseUrl = new URL(config.baseUrl);
  const imagePath = frontMatter.image.startsWith('/') ? frontMatter.image : `/${frontMatter.image}`;
  const imageUrl = new URL(imagePath, baseUrl).toString();

  const dynamicMetadata = {
    ...meta,
    title: frontMatter.title,
    description: frontMatter.description,
    keywords: frontMatter.tags,
    openGraph: {
      ...meta.openGraph,
      title: frontMatter.title,
      description: frontMatter.description,
      type: 'article',
      article: {
        authors: [frontMatter.author.name],
        tags: frontMatter.tags,
        publishedTime: frontMatter.date,
        modifiedTime: frontMatter.date,
      },
      images: [
        {
          url: imageUrl,
          alt: frontMatter.title,
        },
      ],
    },
  };
  return dynamicMetadata;
}

export default function BlogArticle({ params }) {
  const { slug } = params;
  return (
    <BlogArticleClient slug={slug} />
  )
}
