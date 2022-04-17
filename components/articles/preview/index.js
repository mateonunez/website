/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable @next/next/no-img-element */

import s from './preview.module.css';

import Image from 'next/image';
import { dateForHumans } from 'lib/helpers/date';
import Link from 'next/link';

export default function ArticlePreview({
  author,
  date,
  title,
  description,
  image,
  slug
  // tags,
  // readingTime
}) {
  return (
    <>
      <div className={s.root}>
        {/* Heading  */}
        <div className={s.heading}>
          {/* Author image  */}
          <Image
            src={author.image}
            alt={author.name}
            width={32}
            height={32}
            layout="fixed"
            className={s.authorImage}
          />
          {/* Author Name */}
          <span className={s.simpleText}>Written by: </span>
          <span className={s.authorName}>{author.name}</span>
          {/* Separator */}
          <span className={s.simpleText}>at</span>
          {/* Date */}
          <span className={s.date}>{dateForHumans(date)}</span>
        </div>

        {/* Body */}
        <Link href="/blog/[slug]" as={`/blog/${slug}`}>
          <a rel="canonical" href={`/blog/${slug}`} title={title}>
            <div className={s.body}>
              {/* Title and Description */}
              <div className={s.textPreview}>
                <h2 className={s.title}>{title}</h2>
                <p className={s.description}>{description}</p>
              </div>

              {/* Image */}
              <div className={s.imagePreview}>
                <Image
                  src={image}
                  alt={title}
                  width={512}
                  height={512}
                  layout="responsive"
                  className={s.image}
                />
              </div>
            </div>
          </a>
        </Link>
      </div>
    </>
  );
}
