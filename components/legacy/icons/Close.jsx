const Close = ({ ...props }) => {
  return (
    <>
      <svg
        alt="close"
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        {...props}
      >
        <title>Close</title>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </>
  );
};

export default Close;
