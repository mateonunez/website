export default function CircularProgress({ progress = 50, ...props }) {
  const width = 10;
  const circunference = width * 2 * Math.PI;

  return (
    <div x-data="scrollProgress">
      <svg className="w-8 h-8 rotate-90" {...props}>
        {/* Gray  */}
        <circle
          className="text-gray-300"
          strokeWidth="3"
          stroke="currentColor"
          fill="transparent"
          r={width}
          cx="16"
          cy="16"
        />

        <circle
          className="text-amber-500"
          strokeWidth="3"
          strokeDasharray={circunference}
          strokeDashoffset={circunference - (progress / 100) * circunference}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={width}
          cx="16"
          cy="16"
        />
      </svg>
    </div>
  );
}
