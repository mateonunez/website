'use client';

import s from './player.module.css';

import React, { useMemo } from 'react';

import Link from 'next/link';
import Lottie from 'react-lottie-player';
import PlayerJson from 'lib/lottie-files/player.json';

import { ChevronUp, Spotify } from 'components/icons';
import { useUI } from 'components/ui/ui-context';
import config from 'lib/config';

const PlayerAnimation = () => {
  return <Lottie loop animationData={PlayerJson} play />;
};

const Player = () => {
  const { listening } = useUI();

  const url = listening?.isPlaying ? listening.url : `${config.baseUrl}/spotify`;

  const progress = useMemo(() => listening && (listening.progress / listening.duration) * 100, [listening]);

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
              <div className="h-auto w-auto">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img width="40" height="40" src={listening?.thumbnail} alt={listening?.album} />
              </div>
            ) : (
              <Spotify className="h-10 w-10" color={'#1ED760'} />
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
                  <ChevronUp className="h-4 w-4 rotate-90" />
                </Link>
              </div>
            </div>
            {listening?.isPlaying && (
              <>
                <div className={s.playingContainer}>
                  <div className={s.progress}>
                    <div className={s.listened} style={{ width: `${progress}%` }} />
                  </div>

                  <div className={s.animation}>
                    <PlayerAnimation />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(Player);
