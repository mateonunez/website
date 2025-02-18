'use client';

import s from './player.module.css';
import React, { type JSX, useMemo } from 'react';
import Link from 'next/link';
import { ChevronUp, Spotify } from '@/components/legacy/icons';
import { useUI } from '@/components/legacy/ui/ui-context';
import config from '@/lib/config';

const PlayerAnimation = (): JSX.Element | null => {
  // TODO: Remove this once the new player is implemented
  // return <Lottie loop animationData={PlayerJson} play />;
  return null;
};

const Player = (): JSX.Element => {
  const { listening } = useUI();
  const spotifyData = listening;

  const url = spotifyData?.isPlaying ? spotifyData.url : `${config.baseUrl}/spotify`;

  const progress = useMemo(() => {
    if (spotifyData?.isPlaying) {
      const duration = Number(spotifyData.duration);
      const currentProgress = Number(spotifyData.progress);
      return (currentProgress / duration) * 100;
    }
    return 0;
  }, [spotifyData]);

  return (
    <div className={s.root}>
      <div className={s.inner}>
        <Link
          passHref
          target={spotifyData?.isPlaying ? '_blank' : '_self'}
          aria-label="Mateo Nunez on Spotify"
          rel="noopener noreferrer"
          title="Mateo Nunez on Spotify"
          href={url}
        >
          {spotifyData?.isPlaying ? (
            <div className="w-auto h-auto">
              {/* biome-ignore lint/nursery/noImgElement: refactor needed */}
              <img width="40" height="40" src={spotifyData?.thumbnail as string} alt={spotifyData?.album as string} />
            </div>
          ) : (
            <Spotify className="w-10 h-10" color="#1ED760" size={40} />
          )}
        </Link>

        <div className={s.details}>
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-col">
              <p className={s.title}>{spotifyData?.isPlaying ? (spotifyData.title as string) : 'Not Listening'}</p>
              <p className={s.artist}>{spotifyData?.isPlaying ? (spotifyData.artist as string) : 'Spotify'}</p>
            </div>
            <div className="flex flex-row">
              <Link
                href="/spotify"
                passHref
                target={spotifyData?.isPlaying ? '_blank' : '_self'}
                aria-label="Mateo Nunez on Spotify"
                rel="noopener noreferrer"
                title="Mateo Nunez on Spotify"
              >
                <ChevronUp className="w-4 h-4 rotate-90" />
              </Link>
            </div>
          </div>
          {spotifyData?.isPlaying && (
            <div className={s.playingContainer}>
              <div className={s.progress}>
                <div className={s.listened} style={{ width: `${progress}%` }} />
              </div>

              <div className={s.animation}>
                <PlayerAnimation />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(Player);
