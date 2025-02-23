export interface TerminalLine {
  text: string;
  showPrompt: boolean;
}

export interface TerminalProps {
  className?: string;
  initialMessages?: string[];
  prompt?: string;
  height?: string;
}
