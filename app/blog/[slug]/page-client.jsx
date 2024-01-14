'use client';

import Article from "components/articles";

export default async function BlogArticle({ slug }) {
  const { metadata = {}, default: Content } = await import(`./../../../articles/${slug}.mdx`);

  return (
    <Article frontMatter={metadata}>
      <Content />
    </Article>
  )
}
