import s from './about.module.css';

import Image from 'next/image';

import cn from 'classnames';

export default function About({ ...props }) {
  return (
    <>
      <div {...props}>
        {/* About  */}
        <div className={s.root}>
          {/* Title  */}
          <h1 className={s.title}>
            <span className={s['about-gradient']}>About</span>{' '}
            <span className={s['me-gradient']}>Me</span>
          </h1>

          {/* Container  */}
          <div className="container">
            <div className={s.intro}>
              {/* Intro  */}
              <div className={s.introInner}>
                <span>Hello, I&apos;m a Developer based in Milan 🤌</span>
              </div>
              {/* Profile */}
              <div className={s.profileContainer}>
                <div className={s.profileImage}>
                  <Image width={150} height={150} src="/images/profile.jpeg" alt="" />
                </div>
                <div className="w-full">
                  <div className={s.profileQuoteContainer}>
                    <div className={cn(s.profileQuote, 'text-left')}>“</div>
                    <p className={s.profileText}>
                      If you don&apos;t fix a different bug every day means you aren&apos;t learning
                      enough.
                    </p>
                    <div className={cn(s.profileQuote, 'text-right')}>”</div>
                  </div>
                  <div className="w-full">
                    <p className="font-bold text-center text-amber-500 text-md">@mateonunez</p>
                  </div>
                </div>
                <div className={s.sections}>
                  <article className="w-fit">
                    <h3 className={cn(s.profileSectionTitle, s.profileSectionTitleBlack)}>
                      Bio 📓
                    </h3>
                    <div className={s.bio}>
                      <span className={s.bioYear}>1995</span>
                      Born in Palmira, Colombia. <br />
                      <b>Mi Tierra</b>. The place where I learned the most important thing:{' '}
                      <i>The Value of Family</i>.
                    </div>
                    <div className={s.bio}>
                      <span className={s.bioYear}>2009</span>
                      Moved to Milan, Italy. <br />I started a new life. Known new friends. Learned
                      how to cook.
                    </div>
                    <div className={s.bio}>
                      <span className={s.bioYear}>2009</span>
                      <span className={s.bioText}>Moved to Milan, Italy</span>
                    </div>
                  </article>
                  <div className="w-fit">
                    <h3 className={cn(s.profileSectionTitle, s.profileSectionTitleBlack)}>Works</h3>
                    <span className={s.bio}></span>
                  </div>
                  <div className="w-fit">
                    <h3 className={cn(s.profileSectionTitle, s.profileSectionTitleBlack)}>
                      You should know
                    </h3>
                  </div>
                  <div className="w-fit">
                    <h3 className={cn(s.profileSectionTitle, s.profileSectionTitleBlack)}>
                      You shouldn&apos;t
                    </h3>
                  </div>
                  <div className="w-fit">
                    <h3 className={cn(s.profileSectionTitle, s.profileSectionTitleBlack)}>Goals</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
