import { getData } from "@/lib/api-method/api-method-functions";
import { NotificationSourseRate } from "@/types/components/pages/dashboard";
import { CardParams } from "@/types/services/cards";

export async function fetchNotificationSourceRate({
  referenceDate,
  dateType,
}: CardParams): Promise<NotificationSourseRate> {
  return await getData<NotificationSourseRate>({
    endPoint: `${dateType}/notification-source-rate`,
    type: "get",
    dataParams: { referenceDate },
  });
}
// TODO add types
export async function fetchCountByHourWithCity(): Promise<any> {
  return await getData<any>({
    endPoint: `count-by-hour-with-city`,
    type: "get",
  });
}
