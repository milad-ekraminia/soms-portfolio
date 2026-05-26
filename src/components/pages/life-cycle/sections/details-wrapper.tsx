import React from "react";
interface StepperDataWrapperProps {
  title: string;
  children: React.ReactNode;
}
export const StepperDataWrapper = ({ title, children }: StepperDataWrapperProps) => {
  return (
    <div className="stepper-data">
      <div className="stepper-data__header">
        <span className="title">{title}</span>
      </div>
      <div className="stepper-data__body">{children}</div>
    </div>
  );
};
