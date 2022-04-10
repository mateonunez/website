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
                  <div>
                    <div className={cn(s.profileQuote, 'text-left')}>“</div>
                    <p className={s.profileText}>
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam obcaecati
                      laudantium recusandae, debitis eum voluptatem ad, illo voluptatibus temporibus
                      odio provident.
                    </p>
                    <div className={cn(s.profileQuote, 'text-right')}>”</div>
                  </div>
                  <div className="w-full">
                    <p className="font-bold text-center text-amber-500 text-md">Mateo Nunez</p>
                    <p className="text-xs text-center text-amber-100">@mateonunez</p>
                  </div>
                </div>
                <div className="mt-8">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam obcaecati laudantium
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
