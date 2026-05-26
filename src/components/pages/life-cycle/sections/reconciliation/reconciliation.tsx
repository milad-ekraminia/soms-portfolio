import { consensusDetailsCardData } from "@/helpers/data/life-cycle";
import DetailsCardWrapper from "../details-card-wrapper";
import { StepperDataWrapper } from "../details-wrapper";

const Reconciliation = () => {
  return (
    <StepperDataWrapper title={consensusDetailsCardData.title}>
      <div className="life-cycle-card-wrapper">
        <DetailsCardWrapper data={consensusDetailsCardData.data.details} />
        <DetailsCardWrapper data={consensusDetailsCardData.data.dates} />
      </div>
    </StepperDataWrapper>
  );
};

export default Reconciliation;
