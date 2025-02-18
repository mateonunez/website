'use client';

import s from './player.module.css';

import React, { useMemo } from 'react';

import Link from 'next/link';
// TODO: Remove this once the new player is implemented
// import Lottie from 'react-lottie-player';
// import PlayerJson from '@/lib/lottie-files/player.json';

import { ChevronUp, Spotify } from '@/components/legacy/icons';
import { useUI } from '@/components/legacy/ui/ui-context';
import config from '@/lib/config';

const PlayerAnimation = () => {
  // return <Lottie loop animationData={PlayerJson} play />;
  return null;
};

const Player = () => {
  const { listening } = useUI();

  const url = listening?.isPlaying ? listening.url : `${config.baseUrl}/spotify`;

  const progress = useMemo(() => {
    if (listening?.isPlaying) {
      const duration = listening.duration;
      const progress = listening.progress;
      return (progress / duration) * 100;
    }
    return 0;
  }, [listening]);

  return (
    <>
      <div className={s.root}>
        <div className={s.inner}>
          <Link
            passHref
            target={listening?.isPlaying ? '_blank' : '_self'}
            aria-label="Mateo Nunez on Spotify"
            rel="noopener noreferer noreferrer"
            title="Mateo Nunez on Spotify"
            href={url}
          >
            {listening?.isPlaying ? (
              <div className="w-auto h-auto">
                {/* biome-ignore lint/nursery/noImgElement: refactor needed */}
                <img width="40" height="40" src={listening?.thumbnail} alt={listening?.album} />
              </div>
            ) : (
              <Spotify className="w-10 h-10" color="#1ED760" />
            )}
          </Link>

          <div className={s.details}>
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-col">
                <p className={s.title}>{listening?.isPlaying ? listening.title : 'Not Listening'}</p>
                <p className={s.artist}>{listening?.isPlaying ? listening.artist : 'Spotify'}</p>
              </div>
              <div className="flex flex-row">
                <Link
                  href="/spotify"
                  passHref
                  target={listening?.isPlaying ? '_blank' : '_self'}
                  aria-label="Mateo Nunez on Spotify"
                  rel="noopener noreferer noreferrer"
                  title="Mateo Nunez on Spotify"
                >
                  <ChevronUp className="w-4 h-4 rotate-90" />
                </Link>
              </div>
            </div>
            {listening?.isPlaying && (
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
    </>
  );
};

export default React.memo(Player);
