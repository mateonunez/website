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
      <Container {...rest}>
        <div className={s.root}>
          {/* Avatar  */}
          <div className={s.avatar}>
            <Image
              width={150}
              height={150}
              src={avatar}
              alt="Mateo Nunez's face"
              layout="responsive"
            />
          </div>
          <div className={s.bioContainer}>
            {/* Name  */}
            <h1 className={s.name}>@{username}</h1>
            {/* Bio  */}
            <p className={s.bio}>{bio}</p>
            {/* Url */}
            <Link href={url}>
              <a title="Github" aria-label="Github" rel="canonical" target="_blank">
                {url}
              </a>
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
}
