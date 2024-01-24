'use client';

import s from './content.module.css';

import { MDXRemote } from 'next-mdx-remote';
import * as mdxComponents from 'components/articles/mdx';

export default function ArticleContent({ source }) {
  return (
    <div className={s.root}>
      <MDXRemote compiledSource={source} components={mdxComponents} />
    </div>
  );
}
