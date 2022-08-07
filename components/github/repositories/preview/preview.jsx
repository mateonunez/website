import { Container, Fork, Star } from 'components';
import Link from 'next/link';
import s from './preview.module.css';

export default function RepositoryPreview({
  name,
  description,
  forks,
  language,
  languageColor,
  stars,
  url,
  pushedAt
}) {
  return (
    <>
      <div className={s.root}>
        <div className={s.container}>
          {/* Heading */}

          {/* Name  */}
          <Link href={url}>
            <a
              rel="canonical noreferrer"
              target="_blank"
              className={s.name}
              title={name}
              href={url}>
              {name}
            </a>
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
              <Link href={`${url}/stargazers`}>
                <a
                  href={`${url}/stargazers`}
                  rel="canonical noreferrer"
                  target="_blank"
                  aria-label={`${name} stars`}
                  title={`${name} stars`}
                  className="flex">
                  <Star className="w-5 h-5" />
                  <span className={s.starsCount}>{stars}</span>
                </a>
              </Link>
            </div>

            {/* Forks  */}
            <div className={s.forks}>
              <Link href={`${url}/network/members`}>
                <a
                  href={`${url}/network/members`}
                  rel="canonical noreferrer"
                  target="_blank"
                  aria-label={`${name} forks`}
                  title={`${name} forks`}
                  className="flex">
                  <Fork className="w-5 h-5" />
                  <div className={s.forksCount}>{forks}</div>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
