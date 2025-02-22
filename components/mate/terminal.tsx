'use client';

import { type JSX, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface LineProps {
  text?: string;
  noPrompt?: boolean;
  noCaret?: boolean;
  isTyping?: boolean;
}

const Line = ({ text = '', noPrompt = false, noCaret = false, isTyping = false }: LineProps): JSX.Element => (
  <>
    {!noPrompt && (
      <>
        <span className="font-black text-amber-500">MN </span>
        <span className="font-black text-amber-500">&gt; </span>
      </>
    )}
    <span className={cn(isTyping && 'text-white')}>{text}</span>
    {!noCaret && <span className="animate-pulse text-amber-500">▊</span>}
  </>
);

const paragraphs: string[] = [
  "Hey there! I'm Mateo 👋",
  '',
  "👨‍💻 I'm a Senior Software Engineer at BonusX, and I code mostly in JavaScript, TypeScript, and Python.",
  '',
  '☁️ The cloud is my sandbox: I poke around K8S, AWS, and CNCF tools just for fun.',
  '',
  "🤖 As a good surfer, I'm diving into AI these days, working on tools and pipelines to learn new tricks.",
  '',
  '⌨ My dev setup? VS Code + Vim, a tmux session always running, and the Colemak layout—no turning back now!',
  '',
  '🚀 Always eager to learn, build, and share the next cool thing!',
  '',
];

const sleepDuration = 1000;
const getTypingDuration = (): number => 80 + 80 * (Math.random() - 0.5);

interface TypingLineState {
  text: string;
  currentIndex: number;
}

export function Terminal(): JSX.Element {
  const [currentLine, setCurrentLine] = useState<number>(0);
  const [typingLine, setTypingLine] = useState<TypingLineState>({ text: '', currentIndex: 0 });
  const [completedLines, setCompletedLines] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  const isLastParagraph = currentLine === paragraphs.length;

  // Handle typing logic
  useEffect(() => {
    if (isLastParagraph) {
      setIsComplete(true);
      return;
    }

    const currentText = paragraphs[currentLine];

    if (typingLine.currentIndex === 0) {
      const timeout = setTimeout(() => {
        setTypingLine({ text: '', currentIndex: 1 });
      }, sleepDuration);
      return () => clearTimeout(timeout);
    }

    if (typingLine.currentIndex <= currentText.length) {
      const timeout = setTimeout(() => {
        setTypingLine({
          text: currentText.slice(0, typingLine.currentIndex),
          currentIndex: typingLine.currentIndex + 1,
        });
      }, getTypingDuration());
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => {
      setCompletedLines((prev) => [...prev, currentText]);
      setCurrentLine((prev) => prev + 1);
      setTypingLine({ text: '', currentIndex: 0 });
    }, sleepDuration);
    return () => clearTimeout(timeout);
  }, [currentLine, typingLine, isLastParagraph]);

  // Scroll to bottom when content changes
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [completedLines, typingLine]);

  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow">
      <div className="flex items-center justify-between border-b px-4 py-2">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-red-500" />
          <div className="h-3 w-3 rounded-full bg-yellow-500" />
          <div className="h-3 w-3 rounded-full bg-green-500" />
        </div>
        <div className="text-sm text-muted-foreground">Terminal</div>
      </div>
      <div
        ref={terminalRef} // Attach the reference to the container
        className="h-[320px] space-y-2 overflow-y-auto p-4 font-mono text-sm bg-black text-neutral-50 rounded-b-xl"
      >
        {completedLines.map((line, index) => (
          <p key={index} className="transition-colors">
            <Line text={line} noCaret />
          </p>
        ))}
        {!isComplete && typingLine.currentIndex > 0 && (
          <p>
            <Line text={typingLine.text} isTyping />
          </p>
        )}
        {isComplete && (
          <p>
            <Line text="See you." noPrompt noCaret />
          </p>
        )}
      </div>
    </div>
  );
}

export default Terminal;
