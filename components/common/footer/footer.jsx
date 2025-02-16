export default function Footer() {
  return (
    <footer className="p-4 mt-auto text-white sm:text-center">
      <p className="text-xs">
        Made with 
        <span role="img" aria-label="heart">
          ❤️
        </span>
      </p>
      <p className="text-xs">
        &copy; {new Date().getFullYear()} 
        <a href="https://x.com/mmateonunez" alt="Mateo on Twitter" target="_blank" rel="noopener noreferrer">
          Mateo Nunez.
        </a>
      </p>
    </footer>
  );
}
