import "./life-cycle.scss";
import Stepper from "@/components/ui/stepper/stepper";
import { stepperSteps } from "@/helpers/data/stepper-steps";
import { renderDetails } from "./details-condition";

interface InfoBoxProps {
  activeStep: number;
  setActiveStep: (index: number) => void;
  outageNumber: number | null;
}

const InfoBox = ({ activeStep, setActiveStep, outageNumber }: InfoBoxProps) => {
  return (
    <div className="life-cycle-info-wrapper">
      <Stepper
        steps={stepperSteps}
        outageNumber={outageNumber}
        activeStep={activeStep}
        onClick={(index) => setActiveStep(index)}
      />
      {renderDetails(activeStep)}
    </div>
  );
};

export default InfoBox;
