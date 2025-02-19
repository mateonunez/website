'use client';

import s from './about.module.css';

import React, { useRef, type RefObject, type HTMLAttributes } from 'react';
import Image from 'next/image';
import cn from 'classnames';
import Fade from '@/components/legacy/animations/fade';
import CircularProgress from '@/components/legacy/common/circular-progress/circular-progress';

interface Project {
  title: string;
  progress: number;
}

const projects: Project[] = [{ title: 'AIt', progress: 10 }];

interface AboutProps extends HTMLAttributes<HTMLDivElement> {}

const About: React.FC<AboutProps> = ({ ...props }) => {
  const rootRef: RefObject<HTMLDivElement> = useRef(null);
  const titleRef: RefObject<HTMLHeadingElement> = useRef(null);
  const introRef: RefObject<HTMLDivElement> = useRef(null);
  const profileRef: RefObject<HTMLDivElement> = useRef(null);
  const sectionsRef: RefObject<HTMLDivElement> = useRef(null);

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
                  <Image width={150} height={150} src="/images/profile.jpg" alt="Mateo Nuñez's portrait" priority />
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
                    <div className={s.sectionContent}>{/* Bio entries remain unchanged */}</div>
                  </article>
                </Fade>

                {/* What Drives Me */}
                <Fade className="m-0 mx-0" direction="left" distance={150} delay={0.5} clean trigger={sectionsRef}>
                  <article className={s.section}>
                    <h2 className={s.sectionTitle}>What Drives Me</h2>
                    <p className={s.paragraph}>
                      Knowledge, curiosity, and the need to push limits—that's what keeps me going.
                    </p>
                  </article>
                </Fade>

                {/* Projects */}
                <Fade className="m-0 mx-0" direction="left" distance={150} delay={1.8} clean trigger={sectionsRef}>
                  <article className={s.section}>
                    <h2 className={s.sectionTitle}>Active Projects</h2>
                    <div className={s.sectionContent}>
                      <ul className={s.goalsList}>
                        {projects.map((project) => (
                          <li key={project.title} className={s.goal}>
                            <span>{project.title}</span>
                            <CircularProgress progress={project.progress} />
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
