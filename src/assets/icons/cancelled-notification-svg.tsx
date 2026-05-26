import { SvgProps } from "@/types/icons/types";

export const CancelledNotificationSvg = ({
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
        d="M49.3333 33.9167C42.5222 33.9167 37 28.3944 37 21.5833C37 14.911 42.6733 9.24383 49.3426 9.25C56.1506 9.25617 61.6667 14.7753 61.6667 21.5833C61.6667 28.3944 56.1475 33.9167 49.3333 33.9167"
        stroke={stroke}
        strokeWidth="4"
      />
      <path
        d="M41.9333 64.75H32.0667"
        stroke={stroke}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M37.4101 18.5H37V18.5C28.4869 18.5 21.5834 25.4036 21.5834 33.9167V33.9167V34.0153V41.6373C21.5834 42.6363 21.0191 43.5459 20.128 43.993L18.5771 44.7669C16.6408 45.7382 15.4167 47.7177 15.4167 49.8822V49.8822C15.4167 53.0395 17.9759 55.5987 21.1332 55.5987H52.8669C56.0242 55.5987 58.5834 53.0395 58.5834 49.8822V49.8822C58.5834 47.7177 57.3593 45.7382 55.4229 44.77L53.872 43.9961C52.9809 43.5459 52.4167 42.6363 52.4167 41.6373V33.5189"
        stroke={stroke}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M52.8175 25.0675L45.8492 18.0992"
        stroke={stroke}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M52.8175 18.0992L45.8492 25.0675"
        stroke="#323232"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M52.8175 18.0992L45.8492 25.0675"
        stroke={stroke}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
