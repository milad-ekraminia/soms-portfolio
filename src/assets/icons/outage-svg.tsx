import { SvgProps } from "@/types/icons/types";

export const OutageSvg = ({
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
        d="M9.93997 2.49707C14.0838 2.49707 17.4431 5.85633 17.4431 10.0002C17.4431 14.1441 14.0838 17.5033 9.93997 17.5033"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.3764 17.0439C6.55395 16.7461 5.78991 16.3068 5.11879 15.7458"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.11879 4.25434C5.78951 3.69279 6.55365 3.25344 7.3764 2.9563"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.5569 8.69789C2.70754 7.83561 3.00864 7.00653 3.44644 6.24854"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.5569 11.3015C2.70745 12.1641 3.00855 12.9934 3.44644 13.7517"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.2751 12.7762L11.6674 10H8.33264L9.72489 7.22388"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.2751 12.7762L11.6674 10H8.33264L9.72489 7.22388"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="10"
        cy="10.0002"
        r="7.50312"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
