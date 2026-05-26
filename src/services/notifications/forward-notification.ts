import {
  getData,
} from "@/lib/api-method/api-method-functions";

export async function fetchForwardNotificationOptions() {
  return await getData({
    endPoint: `operation-center-type-list`,
    type: "get",
  });
}
export async function PostForwardNotification({
  notificationId,
  newOperationCenterId,
}: {
  notificationId: number;
  newOperationCenterId: number;
}) {
  return await getData({
    endPoint: `change-notification-operation-center-id?notificationId=${notificationId}&newOperationCenterId=${newOperationCenterId}`,
    type: "post",
  });
}
