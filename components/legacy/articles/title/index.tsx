'use client';

import type { JSX } from 'react';
import s from './title.module.css';

export default function ArticleTitle({ title }: { title: string }): JSX.Element {
  return (
    <>
      <h1 className={s.root}>{title.length > 140 ? `${title.substring(0, 140)}...` : title}</h1>
    </>
  );
}
