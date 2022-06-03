import s from './track-card.module.css';

import Image from 'next/image';
import { forwardRef } from 'react';
import { Fade, Title } from 'components';

// eslint-disable-next-line no-unused-vars
const TrackCard = ({ item, delay = 0 }, ref) => {
  return (
    <>
      <div className={s.root}>
        <div className="absolute inset-0 gradient blend-darken" />

        <Image
          className={s.image}
          src={item.thumbnail}
          alt={item.title}
          height="320"
          width="260"
          layout="responsive"
        />

        <Fade className={s['title-container']} delay={delay + 0.3}>
          <Title element="h3" variant="naked" className={s.title}>
            {item.title}
          </Title>
        </Fade>
      </div>
    </>
  );
};

export default forwardRef(TrackCard);
