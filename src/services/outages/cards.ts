
import { getData } from "@/lib/api-method/api-method-functions";
import { CardParams } from "@/types/services/cards";


export async function fetchActiveUnplannedOutage({ referenceDate, dateType }: CardParams) {
  return await getData({
    endPoint: `${dateType}/active-unplanned-outage`,
    type: "get",
    dataParams: { referenceDate },
  });
}

export async function fetchActivePlannedOutage({ referenceDate, dateType }: CardParams) {
  return await getData({
    endPoint: `${dateType}/active-planned-outage`,
    type: "get",
    dataParams: { referenceDate },
  });
}

export async function fetchEnergizedOutage({ referenceDate, dateType }: CardParams) {
  return await getData({
    endPoint: `${dateType}/energized-outage`,
    type: "get",
    dataParams: { referenceDate },
  });
}