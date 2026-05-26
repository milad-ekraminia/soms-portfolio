import { SvgProps } from "@/types/icons/types";

export const ChevronUpSvg = ({
  width = "20",
  height = "20",
  fill = "none",
  stroke = "#667085",
}: SvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill={fill}
    >
      <path
        d="M5 12.5L10 7.5L15 12.5"
        stroke={stroke}
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
