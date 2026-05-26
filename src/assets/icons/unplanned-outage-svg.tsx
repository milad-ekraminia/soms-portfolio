import { SvgProps } from "@/types/icons/types";

export const UnplannedOutageSvg = ({
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
        d="M4.76666 4.87793C3.69043 5.36068 2.99744 6.42981 2.99622 7.60936V18.1137C2.99622 19.7713 4.33992 21.115 5.99747 21.115H18.0025C18.7987 21.116 19.5624 20.7997 20.1247 20.236"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.99829 4.60815H18.0025C19.66 4.60815 21.0037 5.95186 21.0037 7.6094V15.1125"
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
        d="M15.0012 10.1103H21.0037"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.99622 3.10742L22.0041 22.1153"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
