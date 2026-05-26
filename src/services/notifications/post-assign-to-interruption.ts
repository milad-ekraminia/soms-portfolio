import {
  getData,
  getFormDataPost,
} from "@/lib/api-method/api-method-functions";

export async function fetchAssignToInterruption({
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
    endPoint: `connect-notification-change`,
    type: "get",
    dataParams,
  });
}
export async function PostAssignToInterruptiopn({
  notificationsId,
  outageId,
}: {
  notificationsId: number[];
  outageId?: number;
}) {
  return await getFormDataPost({
    endPoint: `connect-notifications-to-manual-outage?outageId=${outageId}`,
    type: "post",
    formData: [...notificationsId],
  });
}
