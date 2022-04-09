import s from './hero.module.css';

import Terminal from 'components/terminal';
import { Player } from 'components/spotify';

export default function Hero({ ...props }) {
  return (
    <>
      <div {...props}>
        {/* Hero  */}
        <div className={s.root}>
          {/* Title  */}
          <h1 className="title">Mateo Nunez</h1>

          {/* Listening */}
          <div className={s.listening}>
            <Player />
          </div>

          {/* Terminal  */}
          <div className={s.terminal}>
            <Terminal />
          </div>

          {/* Start the BigBang */}
          {/* <div
            className={cn(
              s.start,
              'transition ease-in-out duration-1000',
              isTerminalCompleted ? 'opacity-100' : 'opacity-0'
            )}>
            <button className={s.startButton} onClick={() => setBigBang(true)}>
              <ChevronDown className={s.startIcon} />
            </button>
          </div> */}
        </div>
      </div>
    </>
  );
}
