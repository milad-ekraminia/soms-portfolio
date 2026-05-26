import { SvgProps } from "@/types/icons/types";

export const ReportFileSvg = ({
  width = "90",
  height = "92",
  fill = "none",
  stroke = "#D1E9FF",
}: SvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 90 92"
      fill={fill}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.0001 98H71.3335C80.17 98 87.3335 90.8366 87.3335 82V30.6489C87.3334 26.4054 85.6477 22.3358 82.6472 19.3352L69.9983 6.68629C66.9977 3.68571 62.928 2 58.6845 2H18.0001C9.16357 2 2.00012 9.16344 2.00012 18V82C2.00012 90.8366 9.16357 98 18.0001 98Z"
        stroke={stroke}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M66 76.6667H23.3334"
        stroke={stroke}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M66 58H23.3334"
        stroke={stroke}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M39.3334 39.3333H23.3334"
        stroke={stroke}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M87.3335 31.3333H68.6668C62.7758 31.3333 58.0001 26.5577 58.0001 20.6667V2"
        stroke={stroke}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
