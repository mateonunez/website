import Container from '@/components/legacy/common/container/container';
import s from './profile.module.css';

import Image from 'next/image';
import Link from 'next/link';
import type { JSX } from 'react';

interface ProfileProps {
  avatar: string;
  bio: string;
  company: string;
  username: string;
  url: string;
}

export default function GitHubProfile({ avatar, bio, company, username, url, ...rest }: ProfileProps): JSX.Element {
  return (
    <>
      <Container clean {...rest}>
        <div className={s.root}>
          {/* Avatar  */}
          <div className={s.container}>
            <Image width={150} height={150} src={avatar} className={s.avatar} alt="Mateo Nunez's face" />
          </div>
          <div className={s.container}>
            {/* Name  */}
            <Link
              href={url}
              title="Mateo on Github"
              aria-label="Mateo on Github"
              rel="canonical"
              target="_blank"
              className={s.name}
            >
              @{username}
            </Link>
            {/* Bio  */}
            <p className={s.bio}>{bio}</p>
            {/* Company */}
            <p className={s.company}>{company}</p>
          </div>
        </div>
      </Container>
    </>
  );
}
