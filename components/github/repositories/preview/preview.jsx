import { Fork, Star } from 'components';
import Link from 'next/link';
import s from './preview.module.css';
import cn from 'classnames';

export default function RepositoryPreview({
  name,
  description,
  forks,
  language,
  languageColor,
  stars,
  url,
  style,
  className,
}) {
  const rootClassName = cn(s.root, className);

  return (
    <>
      <div className={rootClassName} style={style}>
        <div className={s.container}>
          {/* Heading */}

          {/* Name  */}
          <Link href={url} rel="canonical noreferrer" target="_blank" className={s.name} title={name}>
            {name}
          </Link>

          {/* Description  */}
          <div className={s.description}>{description}</div>

          {/* Stats and Language */}
          <div className={s.stats}>
            {/* Language */}
            {language && (
              <div className={s.language}>
                <div className={s.languageColor} style={{ backgroundColor: languageColor }} />
                <div className={s.languageName}>{language}</div>
              </div>
            )}

            {/* Stars */}
            <div className={s.stars}>
              <Link
                href={`${url}/stargazers`}
                rel="canonical noreferrer"
                target="_blank"
                aria-label={`${name} stars`}
                title={`${name} stars`}
                className="flex"
              >
                <Star className="w-5 h-5" />
                <span className={s.starsCount}>{stars}</span>
              </Link>
            </div>

            {/* Forks  */}
            <div className={s.forks}>
              <Link
                href={`${url}/network/members`}
                rel="canonical noreferrer"
                target="_blank"
                aria-label={`${name} forks`}
                title={`${name} forks`}
                className="flex"
              >
                <Fork className="w-5 h-5" />
                <div className={s.forksCount}>{forks}</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
