export default function Footer() {
  return (
    <footer className="p-4 mt-auto text-right text-white sm:text-center">
      <p className="absolute left-0 ml-2 text-xs">
        Made with{' '}
        <span role="img" aria-label="heart">
          ❤️
        </span>
      </p>
      <p className="text-xs">&copy; {new Date().getFullYear()} Mateo Nunez. All Rights Reserved.</p>
    </footer>
  );
}
