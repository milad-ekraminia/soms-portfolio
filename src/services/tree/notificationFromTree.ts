import { getData } from "@/lib/api-method/api-method-functions";

export interface TreeParams {
  id?: number;
  energyState?: boolean;
}

export async function createNotificationFromTree({
  id,
  energyState,
}: TreeParams) {
  return await getData({
    endPoint: `create-notification-from-frontend/${id}`,
    type: "get",
    dataParams: { energyState },
  });
}
