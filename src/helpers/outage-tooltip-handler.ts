import { UnplannedOutageOperationTooltipText as tooltipText } from "@/helpers/data/outage-tooltips";
export type ConditionTypes = "one" | "oneOrTwo" | "two" | "zero"|'moreThanTwo';

export const tooltipHandler = (
  condition: ConditionTypes,
  selectLength: number
) => {
  if (condition == "one") {
    if (selectLength > 1) {
      return tooltipText.oneSelection.noSelection;
    } else if (selectLength < 1) {
      return tooltipText.oneSelection.multiSelection;
    }
  }
  if (condition == "oneOrTwo") {
    if (selectLength == 0) {
      return tooltipText.singleOrMulti.noSelection;
    }
  }
  if (condition == "two") {
    if (selectLength < 2) {
      return tooltipText.multi.noSelection;
    }
  }
  if (condition == "moreThanTwo") {
    if (selectLength < 2) {
      return tooltipText.moreThanTwo.moreThanTwo;
    }
  }
  if (condition == "zero") {
    if (selectLength != 0) {
      return tooltipText.noSelection.content;
    }
  }
};
