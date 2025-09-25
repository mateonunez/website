import config from '@/lib/config';
import { getFooterSocialLinks } from '@/lib/config/social';
import type { Command } from '../types/commands';

export const linksCommand: Command = {
  name: 'links',
  description: 'Key social links',
  handler: () => {
    const links = getFooterSocialLinks().map((l) => `  - ${l.name}: ${l.href}`);
    return ['Links', ...links].join('\n');
  },
  aliases: ['link', 'social', 'contacts'],
};

export const siteCommand: Command = {
  name: 'site',
  description: 'Main site sections',
  handler: () => {
    const sections = [
      { name: 'Home', path: '/' },
      { name: 'Blog', path: '/blog' },
      { name: 'Open Source', path: '/open-source' },
      { name: 'Projects', path: '/open-source/projects' },
      { name: 'Spotify', path: '/spotify' },
    ];
    const base = config.baseUrl?.replace(/\/$/, '') || '';
    const lines = sections.map((s) => `  - ${s.name}: ${base}${s.path}`);
    return ['Site', ...lines].join('\n');
  },
  aliases: ['nav', 'menu', 'sections', 'sitemap'],
};
