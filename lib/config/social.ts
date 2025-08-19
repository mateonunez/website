import type { LucideIcon } from 'lucide-react';
import { Github, Instagram, LinkedinIcon, Mail, Music, Twitter } from 'lucide-react';
import personal from './personal';

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
    href: `mailto:${personal.email}`,
    icon: Mail,
    showInFooter: false,
  },
  {
    name: 'GitHub',
    href: `https://github.com/${personal.social.github}`,
    icon: Github,
    showInFooter: true,
  },
  {
    name: 'Twitter',
    href: `https://twitter.com/${personal.social.twitter}`,
    icon: Twitter,
    showInFooter: true,
  },
  {
    name: 'LinkedIn',
    href: `https://www.linkedin.com/in/${personal.social.linkedin}`,
    icon: LinkedinIcon,
    showInFooter: true,
  },
  {
    name: 'Instagram',
    href: `https://www.instagram.com/${personal.social.instagram}`,
    icon: Instagram,
    showInFooter: false,
  },
  {
    name: 'Spotify',
    href: `https://open.spotify.com/user/${personal.social.spotify}`,
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
