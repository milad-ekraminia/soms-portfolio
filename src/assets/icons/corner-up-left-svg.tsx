import { SvgProps } from "@/types/icons/types";

export const CornerUpLeftSvg = ({
  width = "20",
  height = "20",
  fill = "none",
  stroke = "#344054",
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
        d="M7.50016 11.6667L3.3335 7.50004M3.3335 7.50004L7.50016 3.33337M3.3335 7.50004H8.66683C11.4671 7.50004 12.8672 7.50004 13.9368 8.04501C14.8776 8.52437 15.6425 9.28928 16.1219 10.2301C16.6668 11.2996 16.6668 12.6998 16.6668 15.5V16.6667"
        stroke={stroke}
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
