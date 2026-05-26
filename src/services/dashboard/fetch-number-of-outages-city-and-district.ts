import { getData } from "@/lib/api-method/api-method-functions";
import { OutageSummary } from "@/types/components/pages/dashboard";
import { CardParams } from "@/types/services/cards";

export async function fetchNumberOfOutagesCityAndDistrict({
  referenceDate,
  dateType,
}: CardParams): Promise<OutageSummary> {
  return await getData<OutageSummary>({
    endPoint: `${dateType}/number-of-outages-city-and-district`,
    type: "get",
    dataParams: { referenceDate },
  });
}
