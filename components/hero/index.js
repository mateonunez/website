import s from './Hero.module.css';

import Terminal from 'components/terminal';
import { ChevronDown } from 'components/icons';

export default function Hero() {
  return (
    <>
      {/* Hero  */}
      <div className={s.root}>
        {/* Title  */}
        <h1 className={s.title}>Mateo Nunez</h1>

        {/* Terminal  */}
        <div className={s.terminal}>
          <Terminal />
        </div>

        {/* Init the f**king world  */}
        <div className={s.start}>
          <button className={s.startButton}>
            <ChevronDown className={s.startIcon} />
          </button>
        </div>
      </div>
    </>
  );
}
