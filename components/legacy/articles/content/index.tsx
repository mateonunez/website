'use client';

import s from './content.module.css';

import { MDXRemote } from 'next-mdx-remote';
import * as components from '@/components/legacy/articles/mdx';
import type { Article as ArticleType } from '@/types/article';
import type { JSX } from 'react';

export default function ArticleContent({
  compiledSource,
}: {
  compiledSource: ArticleType['compiledSource'];
}): JSX.Element {
  return (
    <>
      <div className={s.root}>
        <MDXRemote compiledSource={compiledSource} components={components} scope={undefined} frontmatter={undefined} />
      </div>
    </>
  );
}
