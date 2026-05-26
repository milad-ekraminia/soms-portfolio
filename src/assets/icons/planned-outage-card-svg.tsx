import { SvgProps } from "@/types/icons/types";

export const PlannedOutageCardSvg = ({
  width = "48",
  height = "48",
  fill = "none",
  stroke = "#F97066",
}: SvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 48 48"
      fill={fill}
    >
      <path
        d="M24 42H12C8.68629 42 6 39.3137 6 36V15C6 11.6863 8.68629 9 12 9H36C39.3137 9 42 11.6863 42 15V24"
        stroke={stroke}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 6V12"
        stroke={stroke}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M33 6V12"
        stroke={stroke}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="36"
        cy="36"
        r="5"
        stroke={stroke}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
