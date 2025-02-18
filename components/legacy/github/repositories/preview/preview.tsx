'use client';

import { Fork, Star } from '@/components/legacy/icons';
import Link from 'next/link';
import s from './preview.module.css';
import cn from 'classnames';
import type { CSSProperties, JSX } from 'react';
import type { NormalizedGitHubRepository } from '@/types/github';

interface RepositoryPreviewProps extends NormalizedGitHubRepository {
  style?: CSSProperties;
  className?: string;
}

export default function RepositoryPreview({
  name,
  url,
  description,
  stars,
  forks,
  language,
  languageColor,
  style,
  className,
}: RepositoryPreviewProps): JSX.Element {
  const rootClassName = cn(s.root, className);

  return (
    <Link href={url} target="_blank" rel="noopener noreferrer" className={rootClassName} style={style}>
      <div className={s.header}>
        <h3 className={s.name}>{name}</h3>
        {language && (
          <div className={s.language}>
            <span className={s.languageColor} style={{ backgroundColor: languageColor || undefined }} />
            <span className={s.languageName}>{language}</span>
          </div>
        )}
      </div>

      {description && <p className={s.description}>{description}</p>}

      <div className={s.footer}>
        {stars > 0 && (
          <div className={s.stat}>
            <Star className={s.icon} />
            <span>{stars}</span>
          </div>
        )}
        {forks > 0 && (
          <div className={s.stat}>
            <Fork className={s.icon} />
            <span>{forks}</span>
          </div>
        )}
      </div>
    </Link>
  );
}
