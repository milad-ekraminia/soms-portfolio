import { getFormDataPost } from "@/lib/api-method/api-method-functions";

export async function postSendApprovedSms({ list }: { list: any }) {
  return await getFormDataPost({
    endPoint: `planned-outage-sms-confirm`,
    type: "post",
    formData: [...list],
  });
}
