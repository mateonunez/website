// https://github.com/vercel/hyper-site/
import s from './terminal.module.css';

import { Keyframes, Frame } from './react-keyframes.ts';
import { useEffect, useMemo, useState } from 'react';
import { useUI } from 'components/ui/UIContext';

const sleepDuration = 3000;
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
  'Hey.. Nice to met you. 😳',
  'What are you doing here? Are you lost? 😱',
  '',
  'Anyway, Now you are here and you will stay here forever (with me 😉).',
  ''
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
      </Frame>
    );

    // typing out the line
    for (let i = 0; i < text.length; i++) {
      const duration =
        frames.length > 0 || renderedLines.length > 0 ? getTypingDuration() : sleepDuration;

      frames.push(
        <Frame duration={duration} key={`${text}-${i}`}>
          <Line text={text.slice(0, i + 1)} />
        </Frame>
      );
    }

    // ending frame
    frames.push(
      <Frame key={`${text}-last`}>
        <Line text={text} noCaret />
      </Frame>
    );

    const keyFrames = (
      <Keyframes
        component="p"
        onEnd={() => {
          if (newRender) {
            setRenderedLines(renderedLines => [...renderedLines, text]);
            setLineCount(c => c + 1);
          }
        }}>
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
      <div className={`${s.inner}${lineCount >= 8 ? ' ' + s.amber : ''}`}>
        <div className={s.header}>
          <span className={s.icon} />
          <span className={s.icon} />
          <span className={s.icon} />
        </div>

        <div className={s.body}>
          {/* Rendered Lines  */}
          {renderedLines.length > 0 &&
            renderedLines.map((renderedLine, index) => (
              <p key={index}>
                <Line text={renderedLine} noCaret />
              </p>
            ))}

          {/* New paragraphs */}
          {paragraphs.map((text, index) => (
            <div key={index}>
              {lineCount === index && !isLastParagraph && !isTerminalCompleted && (
                <>{renderLine(text, true)}</>
              )}
            </div>
          ))}

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
