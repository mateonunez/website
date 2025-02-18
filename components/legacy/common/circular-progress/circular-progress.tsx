import React, { type SVGProps, type JSX } from 'react';

interface CircularProgressProps extends Omit<SVGProps<SVGSVGElement>, 'progress'> {
  progress?: number;
}

const CircularProgress = React.memo(function CircularProgress({
  progress = 50,
  ...props
}: CircularProgressProps): JSX.Element {
  const width = 10;
  const circumference = width * 2 * Math.PI;

  return (
    <div>
      {/* biome-ignore lint/nursery/useAriaPropsSupportedByRole: <explanation> */}
      {/* biome-ignore lint/a11y/useFocusableInteractive: <explanation> */}
      <svg
        aria-label="circular-progress"
        className="h-8 w-8 rotate-90"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
        {...props}
      >
        <title>Circular Progress</title>
        {/* Background circle */}
        <circle
          className="text-gray-300"
          strokeWidth="3"
          stroke="currentColor"
          fill="transparent"
          r={width}
          cx="16"
          cy="16"
        />
        {/* Progress circle */}
        <circle
          className="text-amber-500"
          strokeWidth="3"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (progress / 100) * circumference}
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
});

CircularProgress.displayName = 'CircularProgress';

export default CircularProgress;
