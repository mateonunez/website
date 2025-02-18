'use client';

import s from './about.module.css';

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Fade, CircularProgress } from '@/components';
import cn from 'classnames';

const projects = [{ title: 'AIt', progress: 10 }];

const About = ({ ...props }) => {
  const rootRef = useRef(null);
  const titleRef = useRef(null);
  const introRef = useRef(null);
  const profileRef = useRef(null);
  const sectionsRef = useRef(null);

  return (
    <div {...props} ref={rootRef}>
      {/* Main About Section */}
      <div className={s.root}>
        {/* Section Title */}
        <Fade className="m-0" delay={0.3} trigger={titleRef}>
          <h2 className={s.title} ref={titleRef}>
            <span className={s['about-gradient']}>About</span> <span className={s['me-gradient']}>Me</span>
          </h2>
        </Fade>

        <div className="container">
          <div className={s.intro}>
            {/* Intro Text */}
            <Fade direction="left" distance={150} delay={0.5} trigger={introRef}>
              <div className={s.introInner} ref={introRef}>
                <span>Hi, I'm Mateo Nuñez—a passionate Senior Software Engineer based in Milan. 🤌</span>
              </div>
            </Fade>

            <div className={s.profileContainer}>
              {/* Profile & Quote */}
              <Fade distance={150} delay={0.5} trigger={profileRef}>
                <div className={s.profileImage}>
                  <Image width={150} height={150} src="/images/profile.jpg" alt="Mateo Nuñez's portrait" />
                </div>

                <div className="w-full" ref={profileRef}>
                  <div className={s.profileQuoteContainer}>
                    <div className={cn(s.profileQuote, 'text-left')}>"</div>
                    <p className={s.profileText}>
                      If you don't fix a different bug every day, you're not learning enough.
                    </p>
                    <div className={cn(s.profileQuote, 'text-right')}>"</div>
                  </div>
                  <div className="w-full">
                    <p className="font-bold text-center text-amber-500 text-md">@mateonunez</p>
                  </div>
                </div>
              </Fade>

              <div className={s.sections} ref={sectionsRef}>
                {/* Bio Section */}
                <Fade className="m-0 mx-0" direction="left" distance={150} delay={0.3} trigger={sectionsRef}>
                  <article className={s.section}>
                    <h2 className={s.sectionTitle}>Bio</h2>
                    <div className={s.sectionContent}>
                      <div className={s.bio}>
                        <span className={s.bioYear}>1995</span>
                        <span>
                          Born in Palmira, Colombia—where I discovered the true value of family and community.
                        </span>
                      </div>

                      <div className={s.bio}>
                        <span className={s.bioYear}>2009</span>
                        <span>
                          Moved to Milan, Italy. A fresh start that brought new friends, culture, and even a passion for
                          Italian cooking.
                        </span>
                      </div>

                      <div className={s.bio}>
                        <span className={s.bioYear}>2015</span>
                        <span>
                          Began my career as a Telecommunications Technician, mastering systems like{' '}
                          <span className={s.bioItalic}>UT</span>, <span className={s.bioItalic}>1240</span>, and{' '}
                          <span className={s.bioItalic}>MSAN</span>.
                        </span>
                      </div>

                      <div className={s.bio}>
                        <span className={s.bioYear}>2017–2022</span>
                        <span>
                          Joined{' '}
                          <Link href="https://sabicom.com" className={s.bioLink} target="_blank" rel="noreferrer">
                            Sabicom SRL
                          </Link>{' '}
                          as a Developer. Over time, I evolved into a Team Leader, expanding both my technical and
                          leadership skills.
                        </span>
                      </div>

                      <div className={s.bio}>
                        <span className={s.bioYear}>2022–2023</span>
                        <span>
                          Embarked on a new adventure at{' '}
                          <Link href="https://hlpy.co" className={s.bioLink} target="_blank" rel="noreferrer">
                            hlpy
                          </Link>{' '}
                          as a Senior Developer.
                        </span>
                      </div>

                      <div className={s.bio}>
                        <span className={s.bioYear}>2023–Present</span>
                        <span>
                          Currently, I'm shaping innovative solutions as a Senior Software Engineer at{' '}
                          <Link href="https://bonusx.it" className={s.bioLink} target="_blank" rel="noreferrer">
                            BonusX
                          </Link>
                          .
                        </span>
                      </div>
                    </div>
                  </article>
                </Fade>

                {/* What Drives Me */}
                <Fade className="m-0 mx-0" direction="left" distance={150} delay={0.5} clean trigger={sectionsRef}>
                  <article className={s.section}>
                    <h2 className={s.sectionTitle}>What Drives Me</h2>
                    <p className={s.paragraph}>
                      Knowledge, curiosity, and the need to push limits—that’s what keeps me going.
                    </p>
                  </article>
                </Fade>

                {/* Projects */}
                <Fade className="m-0 mx-0" direction="left" distance={150} delay={1.8} clean trigger={sectionsRef}>
                  <article className={s.section}>
                    <h2 className={s.sectionTitle}>Active Projects</h2>
                    <div className={s.sectionContent}>
                      <ul className={s.goalsList}>
                        {projects.map((goal) => (
                          <li key={goal.title} className={s.goal}>
                            <span>{goal.title}</span>
                            <CircularProgress progress={goal.progress} />
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
  );
};

export default React.memo(About);
