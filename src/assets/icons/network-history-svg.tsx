import { SvgProps } from "@/types/icons/types";

export const NetworkHistorySvg = ({
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
        d="M7.5 5.83341H3.33333"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 15H4.99999C4.07952 15 3.33333 14.2538 3.33333 13.3333V2.5"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.1995 3.01175L12.1783 2.03286C12.4128 1.79845 12.7307 1.66675 13.0622 1.66675H15.4167C16.107 1.66675 16.6667 2.22639 16.6667 2.91675V7.08341C16.6667 7.77377 16.107 8.33341 15.4167 8.33341H12.0833C11.393 8.33341 10.8333 7.77377 10.8333 7.08341V3.89562C10.8333 3.56411 10.965 3.24617 11.1995 3.01175Z"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.1995 12.1783L12.1783 11.1994C12.4128 10.965 12.7307 10.8333 13.0622 10.8333H15.4167C16.107 10.8333 16.6667 11.3929 16.6667 12.0833V16.2499C16.6667 16.9403 16.107 17.4999 15.4167 17.4999H12.0833C11.393 17.4999 10.8333 16.9403 10.8333 16.2499V13.0621C10.8333 12.7306 10.965 12.4127 11.1995 12.1783V12.1783Z"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
