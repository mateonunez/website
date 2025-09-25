import { ABOUT_MESSAGES } from '../constants';
import type { Command } from '../types/commands';

export const profileCommand: Command = {
  name: 'profile',
  description: 'Who I am',
  handler: () => [...ABOUT_MESSAGES].join('\n'),
  aliases: ['whoami', 'about', 'bio', 'me', 'info'],
};

export const personalCommands: Command[] = [profileCommand];
