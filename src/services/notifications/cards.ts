import { getData } from "@/lib/api-method/api-method-functions";
import {
  CancelNotificationCounts,
  OutagesAssignedNotificationResponse,
} from "@/types/components/pages/notification";

export async function fetchCancelNotificationCount(): Promise<CancelNotificationCounts> {
  return await getData<CancelNotificationCounts>({
    endPoint: `cancel-notification-count`,
    type: "get",
  });
}

export async function fetchOutagesAssignedNotificationCount(): Promise<OutagesAssignedNotificationResponse> {
  return await getData<OutagesAssignedNotificationResponse>({
    endPoint: `outages-assigned-notification-count`,
    type: "get",
  });
}
