import { getData } from "@/lib/api-method/api-method-functions";
import { CardParams } from "@/types/services/cards";

export async function fetchPlannedAndUnplannedOutageRate({ referenceDate, dateType }: CardParams) {
  return await getData({
    endPoint: `${dateType}/planned-and-unplanned-outage-rate`,
    type: "get",
    dataParams: { referenceDate },
  });
}