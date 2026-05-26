import { getData } from "@/lib/api-method/api-method-functions";
import { DataProps } from "@/types/components/pages/dashboard";

interface OutageParams {
  dataParams: {
    start?: string;
    end: string;
  };
}
export async function fetchNotificationByCity({ dataParams }: OutageParams) {
  return await getData({
    endPoint: `notification-by-city`,
    type: "get",
    dataParams,
  });
}

export async function fetchNotificationSourceSystemCount():Promise<DataProps[]> {
  return await getData<DataProps[]>({
    endPoint: `notification-source-system-count`,
    type: "get",
  });
}

export async function fetchPlumbedNotificationRate() {
  return await getData({
    endPoint: `plumbed-notification-rate`,
    type: "get",
  });
}
