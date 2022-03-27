import s from './header.module.css';

import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { MN, ChevronDown, ChevronUp } from 'components/icons';
import cn from 'classnames';
import SocialLinks from 'components/common/SocialLinks';

const ActiveLink = ({ href, children }) => {
  const { pathname } = useRouter();
  return (
    <Link href={href}>
      <a className={`${s.link} ${pathname.split('/')[1] === href.split('/')[1] ? s.active : ''}`}>
        {children}
      </a>
    </Link>
  );
};

export default function Header() {
  const [mobileNavShown, setMobileNavShown] = useState(false);

  const toggle = () => setMobileNavShown(!mobileNavShown);

  return (
    <>
      <header className={s.header}>
        {/* Logo  */}
        <Link href="/" passHref>
          <a className={s.logo} aria-label="Mateo Nunez">
            <MN />
          </a>
        </Link>

        {/* Navigation */}
        <nav className={s.desktopNav}>
          <ActiveLink href="/works">Works</ActiveLink>
        </nav>

        {/* Right Nav  */}
        <div className={s.rightNav}>
          <SocialLinks />
        </div>

        <button className={s.toggle} onClick={toggle}>
          {mobileNavShown ? <ChevronUp /> : <ChevronDown />}
        </button>
      </header>

      <nav className={cn(s.mobileNav, mobileNavShown && s.active)}>
        <>
          <Link href="/works">
            <a>Works</a>
          </Link>
        </>
      </nav>
    </>
  );
}
