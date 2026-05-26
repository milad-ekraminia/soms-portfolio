import { SvgProps } from "@/types/icons/types";

export const MergeOutageSvg = ({
  width = "24",
  height = "24",
  fill = "none",
  stroke = "#475467",
}: SvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={fill}
    >
      <path
        d="M4.39108 6.04827C5.37078 6.04827 6.16497 5.25408 6.16497 4.27438C6.16497 3.29468 5.37078 2.50049 4.39108 2.50049C3.41138 2.50049 2.61719 3.29468 2.61719 4.27438C2.61719 5.25408 3.41138 6.04827 4.39108 6.04827Z"
        stroke={stroke}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="square"
      />
      <path
        d="M4.39108 13.7745C5.37078 13.7745 6.16497 12.9803 6.16497 12.0006C6.16497 11.0209 5.37078 10.2267 4.39108 10.2267C3.41138 10.2267 2.61719 11.0209 2.61719 12.0006C2.61719 12.9803 3.41138 13.7745 4.39108 13.7745Z"
        stroke={stroke}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="square"
      />
      <path
        d="M4.39108 21.5005C5.37078 21.5005 6.16497 20.7064 6.16497 19.7267C6.16497 18.7469 5.37078 17.9528 4.39108 17.9528C3.41138 17.9528 2.61719 18.7469 2.61719 19.7267C2.61719 20.7064 3.41138 21.5005 4.39108 21.5005Z"
        stroke={stroke}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="square"
      />
      <path
        d="M19.0156 14.3659L21.3808 12.0007L19.0156 9.6355"
        stroke={stroke}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="square"
      />
      <path
        d="M6.16504 12.0007L21.3811 12.0007"
        stroke={stroke}
        strokeWidth="1.5"
        strokeMiterlimit="10"
      />
      <path
        d="M6.16504 19.7267H6.75634C10.8954 19.7267 10.8954 12.0005 15.0345 12.0005M15.0345 12.0005C19.6072 12.0005 19.6072 12.0005 15.0345 12.0005ZM15.0345 12.0005C10.8954 12.0005 10.8954 4.27417 6.75634 4.27417H6.16504"
        stroke={stroke}
        strokeWidth="1.5"
        strokeMiterlimit="10"
      />
    </svg>
  );
};
