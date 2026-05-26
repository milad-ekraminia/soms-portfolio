import { SvgProps } from "@/types/icons/types";

export const DataSettingSvg = ({
  width = "104",
  height = "92",
  fill = "none",
  stroke = "#D1E9FF",
}: SvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 104 92"
      fill={fill}
    >
      <path
        d="M23.3333 58H52.6666"
        stroke={stroke}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M23.3333 76.6667H39.3333"
        stroke={stroke}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M39.3333 98H12.6667C6.77333 98 2 93.2267 2 87.3333V12.6667C2 6.77333 6.77333 2 12.6667 2H76.6667C82.56 2 87.3333 6.77333 87.3333 12.6667V34"
        stroke={stroke}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M99.4559 56.2026L97.0293 53.776C94.9439 51.6906 91.5679 51.6906 89.4879 53.776L56.0106 87.2693C55.5093 87.7706 55.2319 88.448 55.2319 89.152V98H64.0799C64.7893 98 65.4666 97.7173 65.9626 97.2213L99.4559 63.744C101.541 61.6586 101.541 58.2826 99.4559 56.2026Z"
        stroke={stroke}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23.3333 32.4V20.6667H44.6666V32.4L33.9999 40.9334L23.3333 32.4Z"
        stroke={stroke}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
