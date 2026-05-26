import { getData } from "@/lib/api-method/api-method-functions";
import { SmsListApiResponse } from "@/types/components/pages/settings/sms";

export async function fetchMessageList({
  categoryId,
}: {
  categoryId: number;
}): Promise<SmsListApiResponse> {
  return await getData<SmsListApiResponse>({
    endPoint: `message-template/${categoryId}`,
    type: "get",
    baseUrlKey: "sms",
  });
}
