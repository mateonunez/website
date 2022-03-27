import s from './SocialLinks.module.css';

import Link from 'next/link';
import { Github, LinkedIn, Instagram, Spotify } from 'components/icons';

export default function SocialLinks() {
  return (
    <>
      {/* Github  */}
      <Link href="https://github.com/mateonunez" passHref>
        <a
          className={s.personalLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Github | Mateo Nunez">
          <Github />
        </a>
      </Link>

      {/* LinkedIn */}
      <Link href="https://www.linkedin.com/in/mateo-nunez" passHref>
        <a
          className={s.personalLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn | Mateo Nunez">
          <LinkedIn />
        </a>
      </Link>

      {/* Instagram  */}
      <Link href="https://www.instagram.com/mateonunez95/" passHref>
        <a
          className={s.personalLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram | Mateo Nunez">
          <Instagram />
        </a>
      </Link>

      {/* Spotify  */}
      <Link
        href="https://open.spotify.com/user/ltstcqtg2k6q3a17xzdbmcd8q?si=c09bc43e12754f0b"
        passHref>
        <a
          className={s.personalLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Spotify | Mateo Nunez">
          <Spotify />
        </a>
      </Link>
    </>
  );
}
