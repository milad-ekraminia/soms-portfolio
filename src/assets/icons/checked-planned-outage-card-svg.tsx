import { SvgProps } from "@/types/icons/types";

export const CheckedPlannedOutageCardSvg = ({
  width = "49",
  height = "48",
  fill = "none",
  stroke = "#47CD89",
}: SvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 49 48"
      fill={fill}
    >
      <path
        d="M24.6667 42H12.6667C9.35304 42 6.66675 39.3137 6.66675 36V15C6.66675 11.6863 9.35304 9 12.6667 9H36.6667C39.9805 9 42.6667 11.6863 42.6667 15V26"
        stroke={stroke}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.6667 6V12"
        stroke={stroke}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M33.6667 6V12"
        stroke={stroke}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M40.6667 35L35.6667 40L32.6667 37"
        stroke={stroke}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
