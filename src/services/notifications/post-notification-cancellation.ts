import { getFormDataPost } from "@/lib/api-method/api-method-functions";

interface NotificationCancellationParams {
  list: number[];
  reason: number;
  description?: string;
}
export async function PostNotificationCancellation({
  list,
  reason,
  description,
}: NotificationCancellationParams) {
  return await getFormDataPost({
    endPoint: `notification-cancellation?cancelStatus=${reason}&description=${description}`,
    type: "post",
    formData: [...list],
  });
}
