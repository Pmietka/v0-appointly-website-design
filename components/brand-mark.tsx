type BrandMarkProps = {
  className?: string;
};

export function BrandMark({ className }: BrandMarkProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <rect x="7" y="11" width="50" height="46" rx="8" className="fill-white" />
      <path
        d="M17 12h30c4.971 0 9 4.029 9 9v27c0 4.971-4.029 9-9 9H17c-4.971 0-9-4.029-9-9V21c0-4.971 4.029-9 9-9Z"
        className="stroke-current"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 24h48"
        className="stroke-current"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 8v8M43 8v8"
        className="stroke-current"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m21 38 8 7 16-17"
        className="stroke-current"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
