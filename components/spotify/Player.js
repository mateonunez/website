import s from './Player.module.css';

import Link from 'next/link';
import Lottie from 'react-lottie-player';
import PlayerJson from '/components/animations/player.json';

import { ChevronUp, Spotify } from 'components/icons';
import { useUI } from 'components/ui/UIContext';

const PlayerAnimation = () => {
  return <Lottie loop animationData={PlayerJson} play style={{ width: '1rem', height: '1rem' }} />;
};

export default function Listening() {
  const { listening } = useUI();

  const url =
    listening && listening.isPlaying
      ? listening.url
      : 'https://open.spotify.com/user/ltstcqtg2k6q3a17xzdbmcd8q';

  const progress = listening && (listening.progress / listening.duration) * 100;

  return (
    <>
      <div className={s.root}>
        <div className={s.inner}>
          <Link href={url} passHref>
            <a target="_blank" rel="noopener noreferer noreferrer" href={url}>
              {listening?.isPlaying ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img className="w-24 shadow-sm" src={listening?.thumbnail} alt={listening?.album} />
              ) : (
                <Spotify className="w-20 h-20" color={'#1ED760'} />
              )}
            </a>
          </Link>

          <div className={s.details}>
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-col">
                <p className={s.title}>
                  {listening?.isPlaying ? listening.title : 'Not Listening'}
                </p>
                <p className={s.artist}>{listening?.isPlaying ? listening.artist : 'Spotify'}</p>
              </div>
              <div className="flex flex-row">
                <button
                  aria-disabled={true}
                  onClick={() => {
                    console.log('requested to change song');
                  }}>
                  <ChevronUp className="w-4 h-4 rotate-90" />
                </button>
              </div>
            </div>
            {listening?.isPlaying && (
              <>
                <div className={s.progress}>
                  <div className={s.listened} style={{ width: `${progress}%` }} />
                </div>

                <div className={s.animation}>
                  <PlayerAnimation />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
