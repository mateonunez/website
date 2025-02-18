'use client';

import s from './recently-played.module.css';
import { ChevronUp, Container, Title, TrackCard } from '@/components';
import type { SpotifyRecentlyPlayed, SpotifyTrack } from '@/types/spotify';
import { useEffect, useState, useMemo } from 'react';
import type { JSX, KeyboardEvent } from 'react';

export default function RecentlyPlayed({ items }: { items: SpotifyRecentlyPlayed[] }): JSX.Element {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const nextIndex = (): void => {
    if (currentIndex >= items.length - 1) return;
    setCurrentIndex(currentIndex + 1);
  };

  const prevIndex = (): void => {
    if (currentIndex <= 0) return;
    setCurrentIndex(currentIndex - 1);
  };

  const handleKeyDown = (event: KeyboardEvent): void => {
    if (event.key === 'ArrowRight') {
      nextIndex();
    }

    if (event.key === 'ArrowLeft') {
      prevIndex();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown as unknown as EventListener);

    return (): void => {
      window.removeEventListener('keydown', handleKeyDown as unknown as EventListener);
    };
  }, [currentIndex]);

  const recentlyTrack = useMemo(() => {
    return items[currentIndex];
  }, [currentIndex, items]);

  return (
    <>
      <Container>
        <Title variant="subtitle">Recently Played</Title>
      </Container>

      {items.length > 0 && (
        <div className={s.root}>
          <button
            type="button"
            className={s.navigator}
            onClick={prevIndex}
            aria-label="Less Tracks"
            style={{
              left: '10px',
            }}
          >
            <ChevronUp className="-rotate-90 h-6 w-6 transform font-black transition duration-500" />
          </button>

          <Container clean>
            <TrackCard item={recentlyTrack as unknown as SpotifyTrack} currentIndex={currentIndex} />
          </Container>

          <button
            type="button"
            className={s.navigator}
            onClick={nextIndex}
            aria-label="More Tracks"
            style={{
              right: '10px',
            }}
          >
            <ChevronUp className="h-6 w-6 rotate-90 transform transition duration-500 hover:scale-110" />
          </button>
        </div>
      )}
    </>
  );
}
