import type { JSX } from 'react';

export default function Footer(): JSX.Element {
  return (
    <footer className="p-4 mt-auto text-white sm:text-center">
      <p className="text-xs">
        Made with{' '}
        <span role="img" aria-label="heart">
          ❤️
        </span>
      </p>
      <p className="text-xs">
        &copy; {new Date().getFullYear()} {/* @ts-expect-error alt is not supported by Next.js Link */}
        <a href="https://x.com/mmateonunez" alt="Mateo on Twitter" target="_blank" rel="noopener noreferrer">
          Mateo Nunez.
        </a>
      </p>
    </footer>
  );
}
