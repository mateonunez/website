import s from './track-card.module.css';

import Link from 'next/link';

import config from 'lib/config';
import cn from 'classnames';

import { Fade, Title } from 'components';
import { forwardRef, useMemo } from 'react';
import { dateFromNowForHumans } from 'lib/helpers/date';

// eslint-disable-next-line no-unused-vars
const TrackCard = ({ item, delay = 0, variant = 'default', currentIndex }, ref) => {
  const classNames = cn(s.root, {
    [s.root_default]: variant === 'default',
    [s.root_full]: variant === 'full',
  });

  const repeat = useMemo(() => {
    return Math.random();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  return (
    <>
      <div className={classNames} ref={ref}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={item.thumbnail} alt={item.title} className={s.image} />

        <Link
          href={item.url}
          passHref
          target="_blank"
          rel="noopener noreferrer"
          title={`${item.title} by: ${item.artist}`}
          aria-label={`${item.title} by: ${item.artist}`}
        >
          {/* Title */}
          <Fade
            className={s['title-container']}
            delay={delay / 100}
            duration={config.munber / 50}
            trigger={ref}
            repeat={repeat}
          >
            <Title element="h3" variant="naked" className={s.title}>
              {item.title}
            </Title>
          </Fade>

          {/* Artist name */}
          <Fade className={s['artist-container']} direction="bottom" delay={delay / 33} repeat={repeat}>
            <div className={s.artist}>
              {item.artist} ({dateFromNowForHumans(item.playedAt)})
            </div>
          </Fade>
        </Link>
      </div>
    </>
  );
};

export default forwardRef(TrackCard);
