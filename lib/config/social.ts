import { Github, Twitter, LinkedinIcon, Music, Mail, Instagram } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface SocialLink {
  name: string;
  href: string;
  icon: LucideIcon;
  showInFooter?: boolean;
}

export type SocialLinkName = 'Email' | 'GitHub' | 'Twitter' | 'LinkedIn' | 'Instagram' | 'Spotify';

export const socialLinks: SocialLink[] = [
  {
    name: 'Email',
    href: 'mailto:mateonunez95@gmail.com',
    icon: Mail,
    showInFooter: false,
  },
  {
    name: 'GitHub',
    href: 'https://github.com/mateonunez',
    icon: Github,
    showInFooter: true,
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com/mmateonunez',
    icon: Twitter,
    showInFooter: true,
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/mateo-nunez',
    icon: LinkedinIcon,
    showInFooter: true,
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/mmateonunez',
    icon: Instagram,
    showInFooter: false,
  },
  {
    name: 'Spotify',
    // biome-ignore lint/nursery/noSecrets: falsy
    href: 'https://open.spotify.com/user/ltstcqtg2k6q3a17xzdbmcd8q',
    icon: Music,
    showInFooter: true,
  },
] as const;

export function getSocialLink(name: SocialLinkName): SocialLink | undefined {
  return socialLinks.find((link) => link.name === name);
}

export function getSocialLinkUrl(name: SocialLinkName): string | undefined {
  return getSocialLink(name)?.href;
}

/**
 * Get all social links that should be shown in the footer
 */
export function getFooterSocialLinks(): SocialLink[] {
  return socialLinks.filter((link) => link.showInFooter);
}
