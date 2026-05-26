import { SvgProps } from "@/types/icons/types";

export const CircularPatternSvg = ({
  width = "221",
  height = "220",
  fill = "none",
}: SvgProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 221 220"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0_2315_81370"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="-115"
        y="-116"
        width="336"
        height="336"
      >
        <rect
          width="336"
          height="336"
          transform="translate(-115 -116)"
          fill="url(#paint0_radial_2315_81370)"
        />
      </mask>
      <g mask="url(#mask0_2315_81370)">
        <circle cx="53" cy="52" r="47.5" stroke="#E4E7EC" />
        <circle cx="53" cy="52" r="47.5" stroke="#E4E7EC" />
        <circle cx="53" cy="52" r="71.5" stroke="#E4E7EC" />
        <circle cx="53" cy="52" r="95.5" stroke="#E4E7EC" />
        <circle cx="53" cy="52" r="119.5" stroke="#E4E7EC" />
        <circle cx="53" cy="52" r="143.5" stroke="#E4E7EC" />
        <circle cx="53" cy="52" r="167.5" stroke="#E4E7EC" />
      </g>
      <defs>
        <radialGradient
          id="paint0_radial_2315_81370"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(168 -4.00543e-05) rotate(90) scale(336 175.371)"
        >
          <stop />
          <stop offset="0.953125" stop-opacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
};
