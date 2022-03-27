import s from './hero.module.css';

import Terminal from 'components/terminal';

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
      </div>
    </>
  );
}
