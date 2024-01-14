import Article from "components/articles"

export async function generateMetadata({ params }) {
  const { slug } = params;
  const { metadata: frontMatter } = await import(`./../../../articles/${slug}.mdx`);

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

export default async function BlogArticle({ params }) {
  'use client';

  const { slug } = params
  const { default: BlogArticle, metadata } = await import(`./../../../articles/${slug}.mdx`)

  return (
    <Article frontMatter={metadata}>
      <BlogArticle />
    </Article>
  )
}
