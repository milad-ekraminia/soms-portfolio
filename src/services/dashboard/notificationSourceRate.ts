import { getData } from "@/lib/api-method/api-method-functions";
import { CardParams } from "@/types/services/cards";

export async function fetchNotificationSourceRate({ referenceDate, dateType }: CardParams) {
  return await getData({
    endPoint: `${dateType}/notification-source-rate`,
    type: "get",
    dataParams: { referenceDate },
  });
}

export async function fetchCountByHourWithCity() {
  return await getData({
    endPoint: `count-by-hour-with-city`,
    type: "get",
  });
}
