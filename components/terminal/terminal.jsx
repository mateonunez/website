'use client';

import s from './terminal.module.css';

import { Keyframes, Frame } from './keyframes.js';
import { useEffect, useMemo, useState } from 'react';
import { useUI } from 'components/ui/ui-context';

const sleepDuration = 1500;
const getTypingDuration = () => 80 + 80 * (Math.random() - 0.5);

const Line = ({ text, noPrompt = false, noCaret = false }) => (
  <>
    {!noPrompt && (
      <>
        <span className="font-black text-amber-500">MN </span>
        <span>&gt; </span>
      </>
    )}
    {text}
    {!noCaret && <span className={s.caret} />}
  </>
);

const paragraphs = [
  "Hey there! I'm Mateo 👋",
  '',
  "👨‍💻 I'm a Senior Software Engineer at BonusX.",
  '⌨️ I code often in JavaScript, TypeScript and Python.',
  "💭 I'm currently learning Rust and Zig.",
  '☁️ I Love the Cloud and sometimes I play with K8S, AWS and CNCF treats.',
  '📐 My favourite setup is: VS Code with Vim, tmux and Colemak layout.',
  '',
  '',
];

const Terminal = () => {
  const [renderedLines, setRenderedLines] = useState([]);
  const [lineCount, setLineCount] = useState(0);

  const { isTerminalCompleted, completeTerminal } = useUI();

  const renderLine = (text, newRender = false) => {
    const frames = [];
    // starting frame
    frames.push(
      <Frame duration={sleepDuration} key={`${text}-first`}>
        <Line />
      </Frame>,
    );

    // typing out the line
    for (let i = 0; i < text.length; i++) {
      const duration = frames.length > 0 || renderedLines.length > 0 ? getTypingDuration() : sleepDuration;

      frames.push(
        <Frame duration={duration} key={`${text}-${i}`}>
          <Line text={text.slice(0, i + 1)} />
        </Frame>,
      );
    }

    // ending frame
    frames.push(
      <Frame key={`${text}-last`}>
        <Line text={text} noCaret />
      </Frame>,
    );

    const keyFrames = (
      <Keyframes
        component="p"
        onFinished={() => {
          if (newRender) {
            setRenderedLines((renderedLines) => [...renderedLines, text]);
            setLineCount((c) => c + 1);
          }
        }}
      >
        {frames}
      </Keyframes>
    );

    return keyFrames;
  };

  const isLastParagraph = useMemo(() => lineCount === paragraphs.length, [lineCount]);

  useEffect(() => {
    if (isLastParagraph) {
      completeTerminal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLastParagraph]);

  useEffect(() => {
    if (isTerminalCompleted) {
      setRenderedLines(paragraphs);
      setLineCount(paragraphs.length);
    }
  }, [isTerminalCompleted]);

  return (
    <div className={s.root}>
      <div className={`${s.inner}${lineCount >= 8 ? `${s.amber}` : ''}`}>
        <div className={s.header}>
          <span className={s.icon} />
          <span className={s.icon} />
          <span className={s.icon} />
        </div>

        <div className={s.body}>
          {/* Rendered Lines  */}
          {renderedLines.length > 0 &&
            renderedLines.map((renderedLine, index) => (
              <p key={`${renderedLine}-${index}`}>
                <Line text={renderedLine} noCaret />
              </p>
            ))}

          {/* New paragraphs */}
          {paragraphs.map((text, index) => {
            const shouldRenderLine = lineCount === index && !isLastParagraph && !isTerminalCompleted;

            return <div key={`${text}-${index}`}>{shouldRenderLine ? renderLine(text, true) : null}</div>;
          })}

          {/* Last paragraph */}
          {isLastParagraph && (
            <>
              <p className="text-amber-500">
                <Line text="See you." noPrompt noCaret />
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Terminal;
