import s from './social-links.module.css';

import Link from 'next/link';
import { Github, LinkedIn, Spotify, Twitter } from 'components/icons';

export default function SocialLinks() {
  return (
    <>
      {/* Github  */}
      <Link
        href="https://github.com/mateonunez"
        passHref
        className={s.personalLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Github | Mateo Nunez"
      >
        <Github />
      </Link>

      {/* Twitter  */}
      <Link
        href="https://twitter.com/mateonunezx"
        passHref
        className={s.personalLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Twitter | Mateo Nunez"
      >
        <Twitter />
      </Link>

      {/* LinkedIn */}
      <Link
        href="https://www.linkedin.com/in/mateo-nunez"
        passHref
        className={s.personalLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn | Mateo Nunez"
      >
        <LinkedIn />
      </Link>

      {/* Spotify  */}
      <Link
        href="https://open.spotify.com/user/ltstcqtg2k6q3a17xzdbmcd8q?si=c09bc43e12754f0b"
        passHref
        className={s.personalLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Spotify | Mateo Nunez"
      >
        <Spotify />
      </Link>
    </>
  );
}
