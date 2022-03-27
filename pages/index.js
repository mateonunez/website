import heroStyles from 'styles/pages/home/hero.module.css';

import Terminal from 'components/terminal';
import Header from 'components/header';

export default function Home() {
  return (
    <>
      <Header />

      <div className="container">
        {/* Hero  */}
        <div className={heroStyles.root}>
          {/* Title  */}
          <h1 className={heroStyles.title}>Mateo Nunez</h1>

          {/* Terminal  */}
          <div className={heroStyles.terminal}>
            <Terminal />
          </div>
        </div>
      </div>
    </>
  );
}
