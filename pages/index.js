import Welcome from 'components/home/Welcome';
import { useState } from 'react';

export default function Home() {
  const [welcomeAnimationCompleted, setWelcomeAnimationCompleted] = useState(false);
  return (
    <>
      <div className="min-h-screen min-w-screen flex justify-center items-center overflow-hidden">
        <Welcome setCompleted={setWelcomeAnimationCompleted} />

        {welcomeAnimationCompleted && <div className="text-2xl">Hello</div>}
      </div>
    </>
  );
}
