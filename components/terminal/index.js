// https://github.com/vercel/hyper-site/

import { Keyframes, Frame } from './react-keyframes.ts';
import s from './terminal.module.css';
import { useState } from 'react';

const sleepDuration = 700;
const getTypingDuration = () => 80 + 80 * (Math.random() - 0.5);

const Line = ({ text, noPrompt = false, noCaret = false }) => (
  <>
    {!noPrompt && <span>MN &gt; </span>}
    {text}
    {!noCaret && <span className={s.caret} />}
  </>
);

const Terminal = () => {
  const [lineCount, setLineCount] = useState(0);

  const renderLine = text => {
    const frames = [];

    // starting frame
    frames.push(
      <Frame duration={sleepDuration} key={`${text}-first`}>
        <Line />
      </Frame>
    );

    // typing out the line
    for (let i = 0; i < text.length; i++) {
      const isLastLetter = i === text.length - 1;
      const duration = isLastLetter ? sleepDuration : getTypingDuration();
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

    return (
      <Keyframes component="p" onEnd={() => setLineCount(c => c + 1)}>
        {frames}
      </Keyframes>
    );
  };

  return (
    <div className={s.root}>
      <div className={`${s.inner}${lineCount >= 8 ? ' ' + s.rose : ''}`}>
        <div className={s.header}>
          <span className={s.icon} />
          <span className={s.icon} />
          <span className={s.icon} />
        </div>
        <div className={s.body}>
          {renderLine("😱 Hello... I wasn't expecting you here.")}
          {lineCount >= 1 && renderLine('🤔 You actually put me in trouble. ')}
          {lineCount >= 2 && renderLine('What do you expect me to do?')}
          {lineCount >= 3 && renderLine('...')}
          {lineCount >= 4 && renderLine("I don't know.")}
          {lineCount >= 5 && renderLine('Do you want me to indroduce myself?')}
          {lineCount >= 6 && renderLine("I'm sorry. I can't help you.")}
          {lineCount >= 7 && renderLine("💡You could scroll down and shut up. I'm so tired.")}
          {lineCount >= 8 && (
            <>
              <p className={s.green}>
                <Line text="Welcome to my world!" noPrompt noCaret />
              </p>
              <p>
                <Line />
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Terminal;
