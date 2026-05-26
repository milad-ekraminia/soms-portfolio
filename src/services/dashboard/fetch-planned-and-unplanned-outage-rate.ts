import { getData } from "@/lib/api-method/api-method-functions";
import { OutageSummarySubCard } from "@/types/components/pages/dashboard";
import { CardParams } from "@/types/services/cards";

export async function fetchPlannedAndUnplannedOutageRate({
  referenceDate,
  dateType,
}: CardParams): Promise<OutageSummarySubCard> {
  return await getData<OutageSummarySubCard>({
    endPoint: `${dateType}/planned-and-unplanned-outage-rate`,
    type: "get",
    dataParams: { referenceDate },
  });
}
