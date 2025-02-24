import { type JSX, memo } from 'react';
import { cn } from '@/lib/utils';

export interface LineProps {
  text?: string;
  noPrompt?: boolean;
  noCaret?: boolean;
  isTyping?: boolean;
  prompt?: string;
}

export const Line = memo(
  ({ text = '', noPrompt = false, noCaret = false, isTyping = false, prompt = 'MN >' }: LineProps): JSX.Element => (
    <p className="transition-colors">
      {!noPrompt && <span className="font-black text-amber-500">{prompt} </span>}
      <span className={cn('transition-colors', isTyping && 'text-white animate-glitch')}>{text}</span>
      {!noCaret && <span className="animate-pulse text-amber-500">▊</span>}
    </p>
  ),
);

Line.displayName = 'Line';
