'use client';

import s from './meta.module.css';

import Link from 'next/link';

import { dateWithoutYearForHumans } from 'lib/helpers/date';
import { Clock, Tag, User } from 'components/icons';
import { kebapCase } from 'lib/helpers/string';

export default function ArticleMeta({ date, author, readingTime, tags = [] }) {
  return (
    <>
      <div className={s.root}>
        {/* Date  */}
        <div className={s.item}>
          <Clock />
          <span className="ml-1 text-white">{dateWithoutYearForHumans(date)}</span>
          <span className="mx-1 text-white">•</span>
          <span className="mr-1 text-white">{readingTime} min</span>
        </div>

        {/* Tags  */}
        <div className={s.item}>
          <Tag />
          <div className={s.tagList}>
            {tags.map((tag, index) => (
              <span className={index !== tags.length - 1 ? 'mr-2' : ''} key={tag}>
                <Link
                  href={`/blog/tags/${kebapCase(tag)}`}
                  as={`/blog/tags/${kebapCase(tag)}`}
                  className={s.tag}
                  title={tag}
                >
                  #{tag}
                </Link>
              </span>
            ))}
          </div>
        </div>

        {/* Author */}
        <div className={s.item}>
          <User />
          <span className="ml-1 text-white">By: </span>

          {/* {author} */}
          <Link
            href={`/blog/authors/${kebapCase(author.name)}`}
            as={`/blog/authors/${kebapCase(author.name)}`}
            className={s.author}
            title={author.name}
          >
            {author.name}
          </Link>
        </div>
      </div>
    </>
  );
}
