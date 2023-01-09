import s from './profile.module.css';

import { Container } from 'components';

import Image from 'next/image';
import Link from 'next/link';

export default function Profile({ avatar, bio, company, email, username, url, location, ...rest }) {
  console.log('Snooping...', {
    company,
    email,
    location
  });

  return (
    <>
      <Container clean {...rest}>
        <div className={s.root}>
          {/* Avatar  */}
          <div className={s.container}>
            <Image
              width={150}
              height={150}
              src={avatar}
              className={s.avatar}
              alt="Mateo Nunez's face"
              layout="responsive"
            />
          </div>
          <div className={s.container}>
            {/* Name  */}
            <h1 className={s.name}>@{username}</h1>
            {/* Bio  */}
            <p className={s.bio}>{bio}</p>
            {/* Url */}
            <Link href={url} title="Github" aria-label="Github" rel="canonical" target="_blank">
              {url}
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
}
