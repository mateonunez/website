import Link from 'next/link';

export default function MDXLink({ children, ...rest }) {
  const { href } = rest;

  return (
    <>
      <Link href={href}>
        <a href={href} alt={children} title={children} target="_blank" rel="noreferrer">
          {children}
        </a>
      </Link>
    </>
  );
}
