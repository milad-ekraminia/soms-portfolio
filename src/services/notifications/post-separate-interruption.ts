import {
  getData,
  getFormDataPost,
} from "@/lib/api-method/api-method-functions";

export async function fetchSeperateInterruption({
  notificationsId,
  outageId,
}: {
  notificationsId: number[];
  outageId?: number;
}) {
  const dataParams = {
    outageId,
    ...notificationsId.reduce((acc, id, index) => {
      acc[`notificationsId[${index}]`] = id;
      return acc;
    }, {} as Record<string, any>),
  };
  return await getData({
    endPoint: `disconnect-notification-change`,
    type: "get",
    dataParams,
  });
}
export async function PostSeperateInterruption({
  notificationsId,
  outageId,
}: {
  notificationsId: number[];
  outageId?: number;
}) {
  return await getFormDataPost({
    endPoint: `disconnect-notifications-to-outage?outageId=${outageId}`,
    type: "post",
    formData: [...notificationsId],
  });
}
