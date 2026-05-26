import { SvgProps } from "@/types/icons/types";

export const PlannedOutageSvg = ({
  width = "24",
  height = "25",
  fill = "none",
  stroke = "#98A2B3",
}: SvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 25"
      fill={fill}
    >
      <path
        d="M16.5019 3.10742V6.10867"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.49813 3.10742V6.10867"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.5019 3.10742V6.10867"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.99913 21.115H5.99747C4.33992 21.115 2.99622 19.7713 2.99622 18.1138V7.6094C2.99622 5.95186 4.33992 4.60815 5.99747 4.60815H18.0025C19.66 4.60815 21.0037 5.95186 21.0037 7.6094V10.1104"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="16.5019"
        cy="16.613"
        r="4.50187"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.2007 14.6304V16.9143H18.0965"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
