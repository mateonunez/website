export const SLEEP_DURATION = 500;
export const MAX_HISTORY = 50;
export const DEFAULT_HEIGHT = '320px';
export const DEFAULT_PROMPT = 'MN >';

export const ABOUT_MESSAGES = [
  "Hey there! I'm Mateo 👋",
  '👨‍💻 Senior Software Engineer at BonusX. I code in JS, TS, Python—and sometimes in riddles.',
  '☁️ The cloud is my playground: K8S, AWS, CNCF tools. I build castles in the sky.',
  '🤖 Surfing the AI wave, crafting tools like AIt—my digital shadow.',
  '⌨ VS Code + Vim, tmux always open, Colemak keys. Efficiency is an art.',
  '🚀 Always building, always learning. "He who fights with monsters..."',
] as const;

export const DEFAULT_MESSAGES = ['Welcome to my terminal.', '', "Type 'help' to see available commands.", ''] as const;

export const getTypingDuration = (): number => 80 + 80 * (Math.random() - 0.5);
