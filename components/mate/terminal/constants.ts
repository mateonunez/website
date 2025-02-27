import personal from '@/lib/config/personal';

export const SLEEP_DURATION = 500;
export const MAX_HISTORY = 50;
export const DEFAULT_HEIGHT = '320px';
export const DEFAULT_PROMPT = personal.terminal.prompt;

export const ABOUT_MESSAGES = personal.terminal.about as readonly string[];

export const DEFAULT_MESSAGES = ['Welcome to my terminal.', '', "Type 'help' to see available commands.", ''] as const;

export const getTypingDuration = (): number => 80 + 80 * (Math.random() - 0.5);
