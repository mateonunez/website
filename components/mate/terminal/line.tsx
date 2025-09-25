'use client';

import { Check, Clipboard } from 'lucide-react';
import { type JSX, memo, useCallback, useState } from 'react';
import { cn } from '@/lib/utils';
import { segmentText } from './utils/linkify';

export interface LineProps {
  text?: string;
  noPrompt?: boolean;
  noCaret?: boolean;
  isTyping?: boolean;
  prompt?: string;
}

function renderWithLinks(text: string): JSX.Element[] {
  const segments = segmentText(text);
  return segments.map((seg, idx) => {
    if (seg.type === 'text') return <span key={`t-${idx}`}>{seg.value}</span>;
    return (
      <a
        key={`a-${idx}`}
        href={seg.href}
        target={seg.isExternal ? '_blank' : undefined}
        rel={seg.isExternal ? 'noopener noreferrer' : undefined}
        onClick={(e) => e.stopPropagation()}
        aria-label={seg.href}
        className="underline underline-offset-2 break-all text-amber-400 hover:text-amber-300"
      >
        {seg.value}
        {seg.isExternal && <span className="ml-1">↗</span>}
      </a>
    );
  });
}

export const Line = memo(
  ({ text = '', noPrompt = false, noCaret = false, isTyping = false, prompt = 'MN >' }: LineProps): JSX.Element => {
    const [copied, setCopied] = useState(false);
    const hasText = Boolean(text && text.length > 0);
    const canCopy = hasText && !isTyping;
    const segments = segmentText(text);
    const firstLink = segments.find((s) => s.type === 'link') as { type: 'link'; href: string } | undefined;

    const handleCopy = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        const toCopy = firstLink?.href || text || '';
        const write = async () => {
          try {
            if (navigator.clipboard?.writeText) {
              await navigator.clipboard.writeText(toCopy);
            } else {
              const textarea = document.createElement('textarea');
              textarea.value = toCopy;
              textarea.style.position = 'fixed';
              textarea.style.opacity = '0';
              document.body.appendChild(textarea);
              textarea.focus();
              textarea.select();
              document.execCommand('copy');
              document.body.removeChild(textarea);
            }
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1200);
          } catch {}
        };
        void write();
      },
      [text],
    );

    return (
      <div className="transition-colors group relative">
        <p className="transition-colors">
          {!noPrompt && <span className="font-black text-amber-500">{prompt} </span>}
          <span className={cn('transition-colors', isTyping && 'text-white animate-glitch')}>
            {renderWithLinks(text)}
          </span>
          {!noCaret && <span className="animate-pulse text-amber-500">▊</span>}
        </p>
        {canCopy && (
          <button
            type="button"
            aria-label="Copy line"
            title={copied ? 'Copied' : 'Copy'}
            className="absolute right-0 top-1/2 -translate-y-1/2 text-xs opacity-0 group-hover:opacity-100 transition-opacity text-neutral-400 hover:text-amber-400"
            onClick={handleCopy}
          >
            {copied ? (
              <Check className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Clipboard className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        )}
      </div>
    );
  },
);

Line.displayName = 'Line';
