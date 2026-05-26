import { getData } from "@/lib/api-method/api-method-functions";
import { CardParams } from "@/types/services/cards";

export async function fetchNumberOfOutagesCityAndDistrict({ referenceDate, dateType }: CardParams) {
  return await getData({
    endPoint: `${dateType}/number-of-outages-city-and-district`,
    type: "get",
    dataParams: { referenceDate },
  });
}