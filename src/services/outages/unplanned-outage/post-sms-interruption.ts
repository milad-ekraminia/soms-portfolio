import { getData } from "@/lib/api-method/api-method-functions";

export async function PostSmsInterruption({
  status,
  description,
  notificationId,
}: {
  status: "false" | true;
  description?: string;
  notificationId: number;
}) {
  return await getData({
    endPoint: `approve-or-reject-sms-request/${notificationId}?isApproval=${status}&desc=${description}`,
    type: "post",
  });
}
