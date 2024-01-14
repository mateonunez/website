import PageClient from './page-client.jsx'
import { serialize } from 'next-mdx-remote/serialize'
import fs from 'node:fs'
// needed because of bug: https://github.com/hashicorp/next-mdx-remote/issues/350
const mdxOptions = { development: process.env.NODE_ENV === 'development' }

export default async function PageBlogArticle ({ params: { slug } }) {
  const content = fs.readFileSync(`articles/${slug}.mdx`, 'utf8')
  const source = await serialize(content, { mdxOptions })

  return (
    <PageClient source={source} />
  )
}

// biome-ignore lint/nursery/useAwait: <explanation>
export  async function generateMetadata ({ params: { slug } }) {
  return {
    title: 'Ciao!',
    description: 'This is a description',
  }
}
