'use client'

import { MDXRemote } from 'next-mdx-remote'
import * as components from 'components/articles/mdx';
import Article from 'components/articles';

export default function PageBlogArticle ({ source }) {
  if (!source) {
    return 'client'
  }

  return (
    <Article frontMatter={{}}>
      <MDXRemote compiledSource={source.compiledSource} components={components} />
    </Article>
  )
}
