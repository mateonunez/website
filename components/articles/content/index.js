import s from './content.module.css';

import { MDXRemote } from 'next-mdx-remote';
import * as components from 'components/articles/mdx';

export default function ArticleContent({ compiledSource }) {
  console.log();
  return (
    <>
      <div className={s.root}>
        <MDXRemote compiledSource={compiledSource} components={components} />
      </div>
    </>
  );
}
