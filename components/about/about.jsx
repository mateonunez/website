import s from './about.module.css';

import React, { useRef } from 'react';

import Link from 'next/link';
import Image from 'next/image';
import { Fade, CircularProgress } from 'components';

import cn from 'classnames';

const goals = [
  {
    title: 'Become a Solution Architect',
    progress: 70
  },
  {
    title: 'Learn Rust as I know JavaScript',
    progress: 30
  },
  {
    title: "Learn Solidity as I'll know Rust",
    progress: 20
  }
];

const About = ({ ...props }) => {
  const rootRef = useRef(null);
  const titleRef = useRef(null);
  const introRef = useRef(null);
  const profileRef = useRef(null);
  const sectionsRef = useRef(null);

  return (
    <>
      <div {...props} ref={rootRef}>
        {/* About  */}
        <div className={s.root}>
          {/* Title  */}
          <Fade className="m-0" delay={0.3} trigger={titleRef}>
            <h2 className={s.title} ref={titleRef}>
              <span className={s['about-gradient']}>About</span>{' '}
              <span className={s['me-gradient']}>Me</span>
            </h2>
          </Fade>

          {/* Container  */}
          <div className="container">
            <div className={s.intro}>
              {/* Intro  */}
              <Fade direction="left" distance={150} delay={0.5} trigger={introRef}>
                <div className={s.introInner} ref={introRef}>
                  <span>I&apos;m a Fullstack Developer based in Milan 🤌</span>
                </div>
              </Fade>
              {/* Profile */}
              <div className={s.profileContainer}>
                <Fade distance={150} delay={0.5} trigger={profileRef}>
                  <div className={s.profileImage}>
                    <Image
                      width={150}
                      height={150}
                      src="/images/profile.jpeg"
                      alt="Mateo Nunez's face"
                      layout="responsive"
                    />
                  </div>

                  <div className="w-full" ref={profileRef}>
                    <div className={s.profileQuoteContainer}>
                      <div className={cn(s.profileQuote, 'text-left')}>“</div>
                      <p className={s.profileText}>
                        If you don&apos;t fix a different bug every day you aren&apos;t learning
                        enough.
                      </p>
                      <div className={cn(s.profileQuote, 'text-right')}>”</div>
                    </div>
                    <div className="w-full">
                      <p className="font-bold text-center text-amber-500 text-md">@mateonunez</p>
                    </div>
                  </div>
                </Fade>

                <div className={s.sections} ref={sectionsRef}>
                  {/* Bio */}
                  <Fade
                    className="m-0"
                    direction="left"
                    distance={150}
                    delay={0.5}
                    trigger={sectionsRef}>
                    <article className="my-1">
                      <h2 className={cn(s.profileSectionTitle, s.profileSectionTitleBlack)}>Bio</h2>
                      <div className={s.bio}>
                        <span className={s.bioYear}>1995</span>
                        Born in Palmira, Colombia. <br />
                        <b>Mi Tierra</b>. The place where I learned the most important thing:{' '}
                        <i>The Value of Family</i>.
                      </div>
                      <div className={s.bio}>
                        <span className={s.bioYear}>2009</span>
                        Move to Milan, Italy. <br />I started a new life. Known new friends. Learned
                        how to cook.
                      </div>
                      <div className={s.bio}>
                        <span className={s.bioYear}>2015</span>
                        <span className={s.bioText}>
                          Start working as a Telecommunication Technician. I learned different
                          exchanges such as <i>UT</i>, <i>1240</i>, <i>MSAN</i> and others telephony
                          protocols.
                        </span>
                      </div>
                      <div className={s.bio}>
                        <span className={s.bioYear}>2017 to date</span>
                        <span className={s.bioText}>
                          Works on{' '}
                          <Link href="https://sabicom.com" passHref>
                            <a
                              href="http://sabicom.com"
                              alt="Sabicom SRL"
                              target="_blank"
                              rel="noreferrer">
                              Sabicom SRL
                            </a>
                          </Link>{' '}
                          as a Developer. In these years I learned how to work with different
                          technologies. I&apos;m currently the <i>Team Leader</i>.
                        </span>
                      </div>
                    </article>
                  </Fade>

                  {/* You should know */}
                  <Fade
                    className="m-0"
                    direction="left"
                    distance={150}
                    delay={0.5}
                    trigger={sectionsRef}>
                    <article className="my-3">
                      <h2 className={cn(s.profileSectionTitle, s.profileSectionTitleBlack)}>
                        You should know
                      </h2>
                      <p className={s.paragraph}>
                        Everything I learned, I learned on my own. I like challenges and every
                        single goal for me means putting myself on the line, banging my head,
                        falling down and getting back up.
                      </p>
                    </article>
                  </Fade>

                  {/* You shouldn't */}
                  <Fade
                    className="m-0"
                    direction="left"
                    distance={150}
                    delay={1.2}
                    trigger={sectionsRef}>
                    <article className="my-3">
                      <h2 className={cn(s.profileSectionTitle, s.profileSectionTitleBlack)}>
                        You shouldn&apos;t
                      </h2>
                      <p className={s.paragraph}>I&apos;m touchy.</p>
                    </article>
                  </Fade>

                  {/* Goals  */}
                  <Fade
                    className="m-0"
                    direction="left"
                    distance={150}
                    delay={1.8}
                    trigger={sectionsRef}>
                    <article className="my-3">
                      <h2 className={cn(s.profileSectionTitle, s.profileSectionTitleBlack)}>
                        Goals
                      </h2>
                      <div className="w-full">
                        <ul className={s.goalsList}>
                          {goals.map(goal => (
                            <li key={goal.title} className={s.goal}>
                              {goal.title} <CircularProgress progress={goal.progress} />
                            </li>
                          ))}
                        </ul>
                      </div>
                    </article>
                  </Fade>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(About);
