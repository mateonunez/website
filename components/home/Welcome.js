import React, { useEffect, useRef } from 'react';

import clsx from 'clsx';
import gsap from 'gsap';
import styles from 'styles/home/Intro.module.scss';

export default function Welcome({ setCompleted = () => {} }) {
  const introBoxRef = useRef();
  const dotRef = useRef();

  const timeline = gsap.timeline();

  useEffect(() => {
    gsap.from(introBoxRef.current, {
      opacity: 0
    });

    timeline
      .to(dotRef.current, {
        scale: 10,
        opacity: 1,
        duration: 2
      })
      .set(dotRef.current, {
        x: 0,
        y: 0
      })
      .to(dotRef.current, {
        x: 200
      })
      .to(dotRef.current, {
        x: -200
      })
      .to(dotRef.current, {
        x: 0
      })
      .to(dotRef.current, {
        y: 200
      })
      .to(dotRef.current, {
        y: -200
      })
      .to(dotRef.current, {
        y: 0
      })
      .to(introBoxRef.current, {
        opacity: 0,
        duration: 1
      })
      .then(() => {
        gsap.set(introBoxRef.current, {
          display: 'none'
        });
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
