import React from "react";
import "./stepper.scss";
import { getClassNames } from "@/helpers/get-class-names";

interface StepperProps {
  steps: { icon: React.ReactNode; label: string }[];
  activeStep?: number;
  outageNumber: number | null;
  onClick: (index: number) => void;
}

const Stepper: React.FC<StepperProps> = ({
  steps,
  activeStep = -1,
  outageNumber,
  onClick,
}) => {
  return (
    <div className="stepper-wrapper">
      <div
        className={getClassNames("stepper-container", [
          [activeStep > -1, "active"],
          [outageNumber !== null && activeStep == -1, "completed"],
          [outageNumber == null && activeStep < 0, "inactive"],
        ])}
      >
        {steps.map((step, index) => (
          <button
            className={`step ${index <= activeStep ? "active" : ""} ${
              outageNumber !== null && activeStep == -1 ? "completed" : ""
            } ${outageNumber == null && activeStep < 0 ? "inactive" : ""}`}
            key={step.label}
            onClick={() => onClick(index)}
            disabled={outageNumber == null && activeStep < 0}
          >
            <div></div>
            <div
              className={`circle ${index <= activeStep ? "active" : ""} ${
                index == activeStep ? "active-tab" : ""
              }`}
            >
              <div className="circle-content">
                <span className="icon">{step.icon}</span>
              </div>
              <div
                className={`circle-border ${
                  index <= activeStep ? "active" : ""
                }`}
              ></div>
            </div>
            <span
              className={`label ${index == activeStep ? "label-active" : ""}`}
            >
              {step.label}
            </span>
          </button>
        ))}
      </div>
      <span
        className={getClassNames("instruction", [
          [outageNumber == null && activeStep < 0, "inactive"],
        ])}
      >
        Lütfen sol taraftan bir kesinti seçiniz.
      </span>
    </div>
  );
};

export default Stepper;
