import { ABOUT_MESSAGES } from '../constants';
import type { Command } from '../types/commands';

export const whoamiCommand: Command = {
  name: 'whoami',
  description: 'More about me',
  handler: () => [...ABOUT_MESSAGES].join('\n'),
  aliases: ['about'],
};

export const personalCommands: Command[] = [whoamiCommand];
