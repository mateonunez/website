'use client';

import s from './header.module.css';

import { useState } from 'react';
import Link from 'next/link';
import { MN, Menu, Close } from 'components/icons';
import cn from 'classnames';
import SocialLinks from 'components/common/social-links/social-links';

const ActiveLink = ({ href, children, title }) => {
  const pathname = '/blog';

  return (
    <Link
      href={href}
      as={href}
      className={`${s.link}${pathname.split('/')[1] === href.split('/')[1] ? s.active : ''}`}
      rel="canonical"
      title={title}
    >
      {children}
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
        <button type="button" aria-label="Home" className={s.logo}>
          <Link href="/" passHref aria-label="Mateo Nunez">
            <MN />
          </Link>
        </button>

        {/* Navigation */}
        <nav className={s.desktopNav}>
          <SocialLinks />
        </nav>

        {/* Right Nav  */}
        <div className={s.rightNav}>
          {/* <SocialLinks /> */}
          <ActiveLink href="/blog" title="Blog">
            📝 Blog
          </ActiveLink>
          <ActiveLink href="/open-source" title="Open Source">
            💻 Open Source
          </ActiveLink>
          <ActiveLink href="/spotify" title="Spotify">
            🎧 Spotify
          </ActiveLink>
        </div>

        <button
          type="button"
          className={cn(s.toggle, 'transform duration-300 ease-linear', mobileNavShown && 'rotate-90')}
          onClick={toggle}
          aria-label="Toggle Menu"
        >
          {mobileNavShown ? <Close /> : <Menu />}
        </button>
      </header>

      <nav className={cn(s.mobileNav, mobileNavShown && s.active)}>
        <Link href="/blog" passHref rel="canonical" title="Blog" onClick={toggle}>
          📝 Blog
        </Link>

        <Link href="/open-source" passHref rel="canonical" title="Open Source" onClick={toggle}>
          💻 Open Source
        </Link>

        <Link href="/spotify" passHref rel="canonical" title="Blog" onClick={toggle}>
          🎧 Spotify
        </Link>
      </nav>
    </>
  );
}
