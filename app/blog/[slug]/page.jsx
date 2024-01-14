'use client';

import Article from "components/articles"

export default async function BlogArticle({ params }) {
  const { slug } = params
  const { default: BlogArticle, metadata } = await import(`./../../../articles/${slug}.mdx`)

  return (
    <Article frontMatter={metadata}>
      <BlogArticle />
    </Article>
  )
}
