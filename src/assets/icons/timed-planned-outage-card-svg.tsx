import { SvgProps } from "@/types/icons/types";

export const TimedPlannedOutageCardSvg = ({
  width = "49",
  height = "49",
  fill = "none",
  stroke = "#F97066",
}: SvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 49 49"
      fill={fill}
    >
      <path
        d="M15.3298 5.99316V11.9957"
        stroke={stroke}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M33.3371 5.99316V11.9957"
        stroke={stroke}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.3318 42.0079H12.3284C9.01334 42.0079 6.32593 39.3205 6.32593 36.0054V14.9966C6.32593 11.6816 9.01334 8.99414 12.3284 8.99414H36.3384C39.6535 8.99414 42.3409 11.6816 42.3409 14.9966V19.9987"
        stroke={stroke}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M33.1233 29.9688V33.4862L35.8884 35.1729"
        stroke={stroke}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M33.337 42.0075C30.949 42.0075 28.6588 41.0591 26.9702 39.3705C25.2817 37.682 24.3333 35.3917 24.3333 33.0037C24.4072 28.059 28.4002 24.0696 33.345 24C36.5617 24.0014 39.5334 25.7189 41.1405 28.5053C42.7476 31.2918 42.7461 34.724 41.1365 37.5091C39.5269 40.2941 36.5537 42.0089 33.337 42.0075"
        stroke={stroke}
        strokeWidth="3"
      />
    </svg>
  );
};
