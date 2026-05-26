import { getData } from "@/lib/api-method/api-method-functions";

interface SmsParams {
  outageId: number;
  templateId: number;
}
export async function PostManualSms({ outageId, templateId }: SmsParams) {
  return await getData({
    endPoint: `send-manual-sms-for-outage?outageId=${outageId}&templateId=${templateId}`,
    type: "post",
  });
}
