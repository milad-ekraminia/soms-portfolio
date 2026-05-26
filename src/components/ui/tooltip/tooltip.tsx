import  { ReactNode } from "react";
import './tooltip.scss'
interface TooltipProps {
  text: string;
  children: ReactNode;
}

const Tooltip = ({ text, children }: TooltipProps) => {
  return (
    <div className="tooltip-wrapper">
      {children}
      <span className={`tooltip`}>{text}</span>
    </div>
  );
};

export default Tooltip;
