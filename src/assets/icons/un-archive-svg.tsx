import { SvgProps } from "@/types/icons/types";

export const UnArchiveSvg = ({
  width = "25",
  height = "25",
  fill = "none",
  stroke = "#475467",
}: SvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 25 25"
      fill={fill}
    >
      <rect
        x="3"
        y="9.00391"
        width="18.0075"
        height="12.005"
        rx="2"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.50391 6.00216H18.5093"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.50391 3.00216H17.5081"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.0041 17.0075V13.0059"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.0056 15.0067L12.0047 13.0059L10.0039 15.0067"
        stroke={stroke}
        stroke-width="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
