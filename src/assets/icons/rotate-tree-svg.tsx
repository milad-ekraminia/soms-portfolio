import { SvgProps } from "@/types/icons/types";

export const RotateTreeSVG = ({
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
      <path
        d="M5.28771 15.8265C5.08437 15.6615 4.88687 15.4857 4.69687 15.2965C1.76771 12.3673 1.76771 7.61899 4.69687 4.68983C6.58854 2.79816 9.23771 2.13566 11.6669 2.68733"
        stroke={stroke}
        strokeWidth="1.67"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.33398 15.8265H5.41732V13.7432"
        stroke={stroke}
        strokeWidth="1.67"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.0523 10.6775L10.6765 13.0533C10.3023 13.4275 9.69566 13.4275 9.3215 13.0533L6.94566 10.6775C6.5715 10.3033 6.5715 9.69664 6.94566 9.32247L9.3215 6.94664C9.69566 6.57247 10.3023 6.57247 10.6765 6.94664L13.0523 9.32247C13.4265 9.69664 13.4265 10.3033 13.0523 10.6775Z"
        stroke={stroke}
        strokeWidth="1.67"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.7122 4.17334C14.9155 4.33834 15.113 4.51417 15.303 4.70334C18.2322 7.63251 18.2322 12.3808 15.303 15.31C13.4113 17.2017 10.7622 17.8642 8.33301 17.3125"
        stroke={stroke}
        strokeWidth="1.67"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.6673 4.17334H14.584V6.25667"
        stroke={stroke}
        strokeWidth="1.67"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
