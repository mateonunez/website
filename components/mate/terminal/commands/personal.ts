import { ABOUT_MESSAGES } from '../constants';
import type { Command } from '../types/commands';

export const profileCommand: Command = {
  name: 'profile',
  description: 'Display information about me and my background',
  handler: () => [...ABOUT_MESSAGES].join('\n'),
  aliases: ['whoami', 'about', 'bio', 'me', 'info'],
};

export const personalCommands: Command[] = [profileCommand];
