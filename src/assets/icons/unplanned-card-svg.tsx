import { SvgProps } from "@/types/icons/types";

export const UnplannedCardSVG = ({
  width = "76",
  height = "76",
  fill = "none",
  stroke = "#667085",
}: SvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 76 76"
      fill={fill}
    >
      <path
        d="M10.2385 31.8308H31.8309"
        stroke={stroke}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.6974 15.6973C12.379 17.1858 10.2423 20.4823 10.2385 24.1192V56.5077C10.2385 61.6185 14.3816 65.7616 19.4924 65.7616H56.5078C58.9627 65.7648 61.3177 64.7894 63.0513 63.0512"
        stroke={stroke}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M25.6616 14.8654H56.5078C61.6186 14.8654 65.7617 19.0085 65.7617 24.1192V47.2539"
        stroke={stroke}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M51.8809 10.2384V19.4923"
        stroke={stroke}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M47.2539 31.8308H65.7616"
        stroke={stroke}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.2385 10.2384L68.8463 68.8462"
        stroke={stroke}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
