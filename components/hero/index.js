import s from './hero.module.css';

import cn from 'classnames';
import Terminal from 'components/terminal';
import { ChevronDown } from 'components/icons';
import { useUI } from 'components/ui/UIContext';
import { Player } from 'components/spotify';

export default function Hero({ ...props }) {
  const { isTerminalCompleted, setBigBang } = useUI();

  return (
    <>
      <div {...props}>
        {/* Hero  */}
        <div className={s.root}>
          {/* Title  */}
          <h1 className={s.title}>Mateo Nunez</h1>

          {/* Listening */}
          <div className={s.listening}>
            <Player />
          </div>

          {/* Terminal  */}
          <div className={s.terminal}>
            <Terminal />
          </div>

          {/* Start the BigBang */}
          <div
            className={cn(
              s.start,
              'transition ease-in-out duration-1000',
              isTerminalCompleted ? 'opacity-100' : 'opacity-0'
            )}>
            <button className={s.startButton} onClick={() => setBigBang(true)}>
              <ChevronDown className={s.startIcon} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
