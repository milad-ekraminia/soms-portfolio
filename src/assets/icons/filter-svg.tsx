import { SvgProps } from "@/types/icons/types";

export const FilterSvg = ({
  width = "12",
  height = "12",
  fill = "",
  stroke = "#98A2B3",
}: SvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 12 12"
      fill={fill}
    >
      <g clipPath="url(#clip0_2646_46676)">
        <path
          d="M0.0914058 1.28672C0.246093 0.958594 0.574218 0.75 0.9375 0.75H11.0625C11.4258 0.75 11.7539 0.958594 11.9086 1.28672C12.0633 1.61484 12.0164 2.00156 11.7867 2.28281L7.5 7.52109V10.5C7.5 10.7836 7.34063 11.0437 7.08516 11.1703C6.82969 11.2969 6.52734 11.2711 6.3 11.1L4.8 9.975C4.61016 9.83438 4.5 9.61172 4.5 9.375V7.52109L0.210937 2.28047C-0.0164067 2.00156 -0.0656254 1.6125 0.0914058 1.28672Z"
          fill={stroke}
        />
      </g>
      <defs>
        <clipPath id="clip0_2646_46676">
          <rect width="12" height="12" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
