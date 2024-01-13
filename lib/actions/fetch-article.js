'use server'

// biome-ignore lint/nursery/useAwait: <explanation>
export  async function fetchArticle(slug) {
  const { default: Article, metadata } = require(`articles/${slug}.mdx`)
  return {
    Article,
    metadata
  }
}
