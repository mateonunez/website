import Link from 'next/link';

export default function MDXLink({ children, ...rest }) {
  const { href } = rest;

  let title;
  if (typeof children === 'object') {
    title = children.props?.alt;
  } else {
    title = children;
  }

  return (
    <>
      <Link href={href} alt={title} title={title} target="_blank" rel="noreferrer">
        {children}
      </Link>
    </>
  );
}
