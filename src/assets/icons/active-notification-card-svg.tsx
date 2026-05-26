import { SvgProps } from "@/types/icons/types";

export const ActiveNotificationCardSvg = ({
  width = "74",
  height = "74",
  fill = "none",
  stroke = "#F04438",
}: SvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 74 74"
      fill={fill}
    >
      <path
        d="M41.9333 61.6667H32.0667"
        stroke={stroke}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M52.4166 30.9321V30.8334V30.8334C52.4166 22.3203 45.513 15.4167 37 15.4167V15.4167C28.4869 15.4167 21.5833 22.3203 21.5833 30.8334V30.8334V30.9321V38.5541C21.5833 39.5531 21.019 40.4627 20.128 40.9097L18.577 41.6837C16.6407 42.6549 15.4166 44.6344 15.4166 46.7989V46.7989C15.4166 49.9562 17.9758 52.5154 21.1331 52.5154H52.8668C56.0241 52.5154 58.5833 49.9562 58.5833 46.7989V46.7989C58.5833 44.6344 57.3592 42.6549 55.4229 41.6867L53.872 40.9128C52.9809 40.4627 52.4166 39.5531 52.4166 38.5541V30.9321Z"
        stroke={stroke}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M58.4323 18.6511C56.2369 14.797 53.0364 11.5965 49.1823 9.40112"
        stroke={stroke}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.5677 18.6511C17.7631 14.797 20.9636 11.5965 24.8177 9.40112"
        stroke={stroke}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
