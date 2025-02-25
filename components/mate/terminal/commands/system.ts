import { registry } from '../command-registry';
import type { Command } from '../types/commands';
import { formatCommandGroup } from '../utils/formatting';

export const helpCommand: Command = {
  name: 'help',
  description: 'Show this awesome command list',
  handler: () => {
    return [
      '🌟 Welcome to the Terminal 🌟',
      'Here are the available commands:\n',
      ...registry.groups.map(formatCommandGroup),
      '\n💡 Tip: Type a command and press Enter to execute it, or press Tab to autocomplete.',
    ].join('\n');
  },
  aliases: ['h', '?'],
};

export const clearCommand: Command = {
  name: 'clear',
  description: 'Clear the terminal screen',
  handler: ({ tools }) => {
    tools.clearLines();
    return '';
  },
  aliases: ['c', 'cls'],
};

export const systemCommands: Command[] = [clearCommand, helpCommand];
