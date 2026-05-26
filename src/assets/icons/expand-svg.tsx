import { SvgProps } from "@/types/icons/types";

export const ExpandSvg = ({
  width = "20",
  height = "20",
  fill = "none",
  stroke = "344054",
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
        d="M13.3333 6.66667L17.5 2.5M17.5 2.5H13.3333M17.5 2.5V6.66667M6.66667 6.66667L2.5 2.5M2.5 2.5L2.5 6.66667M2.5 2.5L6.66667 2.5M6.66667 13.3333L2.5 17.5M2.5 17.5H6.66667M2.5 17.5L2.5 13.3333M13.3333 13.3333L17.5 17.5M17.5 17.5V13.3333M17.5 17.5H13.3333"
        stroke={stroke}
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
