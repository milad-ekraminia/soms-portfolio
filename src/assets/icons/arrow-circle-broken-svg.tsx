import { SvgProps } from "@/types/icons/types";

export const ArrowCircleBrokenSVG = ({
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
      <g clipPath="url(#clip0_8868_59454)">
        <path
          d="M5.83366 17.2183C3.34282 15.7774 1.66699 13.0843 1.66699 9.99984C1.66699 5.39746 5.39795 1.6665 10.0003 1.6665C14.6027 1.6665 18.3337 5.39746 18.3337 9.99984C18.3337 13.0843 16.6578 15.7774 14.167 17.2183M13.3337 9.9999L10.0003 6.66656M10.0003 6.66656L6.66699 9.9999M10.0003 6.66656V18.3332"
          stroke={stroke}
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_8868_59454">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
