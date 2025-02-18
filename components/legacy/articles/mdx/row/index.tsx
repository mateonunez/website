import type { JSX } from 'react';

const Row = ({ children }: { children: JSX.Element }): JSX.Element => (
  <div className="-mx-4 flex flex-wrap">{children}</div>
);

export default Row;
