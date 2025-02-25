export const SLEEP_DURATION = 500;
export const MAX_HISTORY = 50;
export const DEFAULT_HEIGHT = '320px';
export const DEFAULT_PROMPT = 'MN >';

export const ABOUT_MESSAGES = [
  "Hey there! I'm Mateo 👋",
  '',
  '👨‍💻 Senior Software Engineer at BonusX, originally from Colombia and now based in Milan.',
  '💻 Passionate about crafting modern web experiences with JavaScript, Next.js, and AI.',
  '🌟 Diving deep into open-source projects on GitHub when not creating MIT bugs!',
  "🎵 When not coding, you'll find me jamming to music on Spotify or exploring Milan's food scene.",
  '🚀 Always building, always learning with a chill vibe. Welcome to my digital playground!',
] as const;

export const DEFAULT_MESSAGES = ['Welcome to my terminal.', '', "Type 'help' to see available commands.", ''] as const;

export const getTypingDuration = (): number => 80 + 80 * (Math.random() - 0.5);
