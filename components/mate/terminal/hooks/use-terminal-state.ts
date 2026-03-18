import { useCallback, useState } from 'react';
import { MAX_HISTORY } from '../constants';
import type { TerminalLine } from '../types';

export interface TerminalState {
  currentLine: number;
  typingLine: { text: string; currentIndex: number };
  completedLines: TerminalLine[];
  isComplete: boolean;
  userInput: string;
  commandHistory: string[];
  historyIndex: number;
  streamingText: string | null;
}

export interface TerminalStateActions {
  setCurrentLine: (line: number) => void;
  setTypingLine: (line: { text: string; currentIndex: number }) => void;
  addCompletedLine: (line: TerminalLine) => void;
  addCompletedLines: (lines: TerminalLine[]) => void;
  clearCompletedLines: () => void;
  setIsComplete: (complete: boolean) => void;
  setUserInput: (input: string) => void;
  addToHistory: (command: string) => void;
  updateHistoryIndex: (index: number) => void;
  setStreamingText: (text: string | null) => void;
  appendStreamingText: (chunk: string) => void;
}

export function useTerminalState(_initialMessages: string[]): [TerminalState, TerminalStateActions] {
  const [currentLine, setCurrentLine] = useState<number>(0);
  const [typingLine, setTypingLine] = useState<{ text: string; currentIndex: number }>({ text: '', currentIndex: 0 });
  const [completedLines, setCompletedLines] = useState<TerminalLine[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [userInput, setUserInput] = useState<string>('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [streamingText, setStreamingText] = useState<string | null>(null);

  const addCompletedLine = useCallback((line: TerminalLine) => {
    setCompletedLines((prev) => [...prev, line].slice(-100));
  }, []);

  const addCompletedLines = useCallback((lines: TerminalLine[]) => {
    setCompletedLines((prev) => [...prev, ...lines].slice(-100));
  }, []);

  const clearCompletedLines = useCallback(() => {
    setCompletedLines([]);
  }, []);

  const addToHistory = useCallback((command: string) => {
    setCommandHistory((prev) => [command, ...prev].slice(0, MAX_HISTORY));
    setHistoryIndex(-1);
  }, []);

  const appendStreamingText = useCallback((chunk: string) => {
    setStreamingText((prev) => (prev === null ? chunk : prev + chunk));
  }, []);

  return [
    {
      currentLine,
      typingLine,
      completedLines,
      isComplete,
      userInput,
      commandHistory,
      historyIndex,
      streamingText,
    },
    {
      setCurrentLine,
      setTypingLine,
      addCompletedLine,
      addCompletedLines,
      clearCompletedLines,
      setIsComplete,
      setUserInput,
      addToHistory,
      updateHistoryIndex: setHistoryIndex,
      setStreamingText,
      appendStreamingText,
    },
  ];
}
