import { SvgProps } from "@/types/icons/types";

export const CheckIconSvg = ({
  width = "20",
  height = "20",
  fill = "none",
  stroke = "#1570EF",
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
        d="M16.6663 5L7.49967 14.1667L3.33301 10"
        stroke={stroke}
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
