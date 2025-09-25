import { registry } from '../command-registry';
import type { Command } from '../types/commands';
import { formatCommandGroup } from '../utils/formatting';

export const helpCommand: Command = {
  name: 'help',
  description: 'List commands',
  handler: () => {
    return ['Commands (Tab autocompletes):', ...registry.groups.map(formatCommandGroup)].join('\n');
  },
  aliases: ['h', '?', 'commands', 'info'],
};

export const clearCommand: Command = {
  name: 'clear',
  description: 'Clear screen',
  handler: ({ tools }) => {
    tools.clearLines();
    return '';
  },
  aliases: ['c', 'cls', 'clean'],
};

export const systemCommands: Command[] = [clearCommand, helpCommand];
