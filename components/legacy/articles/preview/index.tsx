'use client';

import s from './preview.module.css';
import Image from 'next/image';
import { dateForHumans } from '@/lib/helpers/date';
import Link from 'next/link';
import type { ArticleFrontmatter } from '@/types/article';
import type { JSX } from 'react';

type ArticlePreviewProps = Pick<ArticleFrontmatter, 'author' | 'date' | 'title' | 'description' | 'image' | 'slug'>;

export default function ArticlePreview({
  author,
  date,
  title,
  description,
  image,
  slug,
}: ArticlePreviewProps): JSX.Element {
  return (
    <div className={s.root}>
      <Link as={`/blog/${slug}`} rel="canonical" href={`/blog/${slug}`} title={title}>
        <div className={s.body}>
          <div className={s.imagePreview}>
            <Image src={image} alt={title} width={1280} height={720} className={s.image} priority />
          </div>

          <div className={s.textPreview}>
            <h2 className={s.title}>{title}</h2>
            <p className={s.description}>{description}</p>
          </div>
        </div>
      </Link>

      <div className={s.heading}>
        <Image src={author.image} alt={author.name} width={32} height={32} className={s.authorImage} />
        <span className={s.simpleText}>Written by: </span>
        <span className={s.authorName}>{author.name}</span>
        <span className={s.simpleText}>at</span>
        <span className={s.date}>{dateForHumans(date)}</span>
      </div>
    </div>
  );
}
