import s from './top.module.css';

import { ArtistCard, TrackCard, Container, Fade, Title } from 'components';
import config from 'lib/config';
import { useRef } from 'react';

export default function Top({ artists, tracks }) {
  const sectionTitleRef = useRef(null);
  const artistTitleRef = useRef(null);
  const artistsRef = useRef(null);

  const tracksTitleRef = useRef(null);
  const tracksRef = useRef(null);

  return (
    <>
      <Container className="min-h-screen" clean>
        <div className="py-8" ref={sectionTitleRef}>
          <Fade trigger={sectionTitleRef}>
            <Title>Top of this month</Title>
          </Fade>
        </div>

        <div className={s.root}>
          {/* Artists  */}
          {artists?.length > 0 && (
            <>
              <div ref={artistTitleRef}>
                <Fade direction="left" trigger={artistTitleRef}>
                  <Title className="text-2xl" variant="naked" element="h4">
                    Artists
                  </Title>
                </Fade>
              </div>

              {/* Artists Container  */}
              <div className={s['artists-container']} ref={artistsRef}>
                {artists.map((artist, key) => (
                  <Fade
                    key={`${artist.id}-${new Date().getTime()}`}
                    className={s.artist}
                    delay={key - config.munber / 100}
                    trigger={artistsRef}
                    clean>
                    <ArtistCard item={artist} delay={key + config.munber / 100} />
                  </Fade>
                ))}
              </div>
            </>
          )}

          {/* Tracks  */}
          {tracks?.length > 0 && (
            <>
              <div ref={tracksTitleRef}>
                <Fade delay={config.munber / 100} direction="right" trigger={tracksTitleRef}>
                  <Title className="text-2xl" variant="naked" element="h4">
                    Tracks
                  </Title>
                </Fade>
              </div>

              <div className={s['tracks-container']} ref={tracksRef}>
                {/* Tracks Container  */}
                {tracks.map((track, key) => (
                  <>
                    <Fade
                      key={`${track.id}-${new Date().getTime()}`}
                      className={s.track}
                      delay={key - config.munber / 100}
                      clean
                      trigger={tracksRef}>
                      <TrackCard item={track} delay={key + config.munber / 100} variant="full" />
                    </Fade>
                  </>
                ))}
              </div>
            </>
          )}
        </div>
      </Container>
    </>
  );
}
