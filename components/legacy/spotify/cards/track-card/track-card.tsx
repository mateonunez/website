import s from './track-card.module.css';
import Link from 'next/link';
import config from '@/lib/config';
import cn from 'classnames';
import { forwardRef, useMemo, type RefObject } from 'react';
import { dateFromNowForHumans } from '@/lib/helpers/date';
import type { SpotifyTrack } from '@/types/spotify';
import Fade from '@/components/legacy/animations/fade';
import Title from '@/components/legacy/common/title/title';

interface TrackCardProps {
  item: SpotifyTrack;
  delay?: number;
  variant?: 'default' | 'full';
  currentIndex?: number;
}

const TrackCard = forwardRef<HTMLDivElement, TrackCardProps>(
  ({ item, delay = 0, variant = 'default', currentIndex }, ref) => {
    const classNames = cn(s.root, {
      [s.root_default]: variant === 'default',
      [s.root_full]: variant === 'full',
    });

    const repeat = useMemo(() => {
      return Math.random();
    }, [currentIndex]);

    return (
      <div className={classNames} ref={ref}>
        {/* biome-ignore lint/nursery/noImgElement: refactor needed */}
        <img src={item.thumbnail} alt={item.title} className={s.image} />

        <Link
          href={item.url}
          passHref
          target="_blank"
          rel="noopener noreferrer"
          title={`${item.title} by: ${item.artist}`}
          aria-label={`${item.title} by: ${item.artist}`}
        >
          <Fade
            className={s['title-container']}
            delay={delay / 100}
            duration={config.munber / 50}
            trigger={ref as RefObject<HTMLElement>}
            repeat={repeat}
          >
            <Title element="h3" variant="naked" className={s.title}>
              {item.title}
            </Title>
          </Fade>

          <Fade className={s['artist-container']} direction="bottom" delay={delay / 33} repeat={repeat}>
            <div className={s.artist}>
              {item.artist} ({dateFromNowForHumans(item.playedAt)})
            </div>
          </Fade>
        </Link>
      </div>
    );
  },
);

// Add display name for better debugging
TrackCard.displayName = 'TrackCard';

export default TrackCard;
