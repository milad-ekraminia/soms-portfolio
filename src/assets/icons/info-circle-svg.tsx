import { SvgProps } from "@/types/icons/types";

export const InfoCircleSvg = ({
  width = "19",
  height = "19",
  fill = "none",
  stroke = "white",
}: SvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 19 19"
      fill={fill}
    >
      <path
        d="M9.16683 12.5002V9.16683M9.16683 5.8335H9.17516M17.5002 9.16683C17.5002 13.7692 13.7692 17.5002 9.16683 17.5002C4.56446 17.5002 0.833496 13.7692 0.833496 9.16683C0.833496 4.56446 4.56446 0.833496 9.16683 0.833496C13.7692 0.833496 17.5002 4.56446 17.5002 9.16683Z"
        stroke={stroke}
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
