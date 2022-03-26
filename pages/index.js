export default function Home() {
  return (
    <>
      <header className="container flex flex-col items-center pb-32 text-center pt-36 md:pb-36 md:pt-56">
        <h1 className="title text-5xl md:text-7xl lg:text-8xl max-w-[720px] mb-10">
          <span className="relative z-30">A better way to build software</span>
        </h1>
        <p className="text-xl md:text-3xl mb-20 lg:mb-24 relative z-30 mix-blend-color-dodge max-w-[520px]">
          Go from idea to production with the fastest workflow for frontend teams.
        </p>
        <svg
          className="relative z-30 w-20 h-20 lg:w-32 lg:h-32 triangle"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 129 114">
          <path d="M0 113.615 64.879 0 129 113.615H0Z" fill="#fff"></path>
        </svg>
      </header>
    </>
  );
}
