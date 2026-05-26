import { SvgProps } from "@/types/icons/types";

export const ShortArrowUpSvg = ({
  width = "10",
  height = "10",
  fill = "",
  stroke = "currentColor",
}: SvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 10 10"
      fill={fill}
    >
      <path
        d="M5 8.5V1.5M5 1.5L1.5 5M5 1.5L8.5 5"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
