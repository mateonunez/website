import { createRef, useEffect } from 'react';

import { animateSplitText } from 'core/animations/text';

export default function Home() {
  let textRef = createRef();

  useEffect(() => {
    animateSplitText(textRef);
  }, []);

  return (
    <>
      <span className="text-9xl font-bold" ref={textRef}>
        Mateo Nunez
      </span>
    </>
  );
}
