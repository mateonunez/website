import React, { useEffect, useRef } from 'react';

import clsx from 'clsx';
import gsap from 'gsap';
import styles from 'styles/home/Intro.module.scss';
import { useWindowSize } from 'react-use';

export default function Welcome({ setCompleted = () => {} }) {
  const { width, height } = useWindowSize();

  const introBoxRef = useRef();
  const dotRef = useRef();

  const timeline = gsap.timeline();

  useEffect(() => {
    console.log(width, height);
  }, [width, height]);

  useEffect(() => {
    gsap.from(introBoxRef.current, {
      opacity: 0
    });

    timeline
      .to(dotRef.current, {
        scale: 3,
        opacity: 1,
        duration: 2
      })
      .set(dotRef.current, { x: 0, y: 0 })
      .to(dotRef.current, { x: width / 3 })
      .to(dotRef.current, { x: (width * -1) / 3 })
      .to(dotRef.current, { x: 0 })
      .to(dotRef.current, { y: height / 3 })
      .to(dotRef.current, { y: (height * -1) / 3 })
      .to(dotRef.current, { y: 0 })
      .to(introBoxRef.current, { opacity: 0, duration: 1 })
      .then(() => {
        gsap.set(introBoxRef.current, { display: 'none' });
        setCompleted(true);
      });
  }, []);

  return (
    <>
      <div className={styles['intro-box']} ref={introBoxRef}>
        <div className={clsx(styles['dot'], styles['dot-white'])} ref={dotRef} />
      </div>
    </>
  );
}