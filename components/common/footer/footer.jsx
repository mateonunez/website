export default function Footer() {
  return (
    <footer className="mt-auto p-4 text-right text-white sm:text-center">
      <p className="absolute left-0 ml-2 text-xs">
        Made with{' '}
        <span role="img" aria-label="heart">
          ❤️
        </span>
      </p>
      <p className="text-xs">
        &copy; {new Date().getFullYear()}{' '}
        <a href="https://x.com/mateonunezx" alt="Mateo on Twitter" target="_blank" rel="noopener noreferrer">
          Mateo Nunez.
        </a>
      </p>
    </footer>
  );
}
