import { getFormDataPost } from "@/lib/api-method/api-method-functions";

interface NotificationCancellationParams {
  list: number[];
  description: string;
  status: number;
}
export async function PostNotificationCancellation({
  list,
  description,
  status,
}: NotificationCancellationParams) {
  return await getFormDataPost({
    endPoint: `notification-cancellation?description=${description}&status=${status}`,
    type: "post",
    formData: [...list],
  });
}
