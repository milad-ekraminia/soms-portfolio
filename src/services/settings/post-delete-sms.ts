import { getData } from "@/lib/api-method/api-method-functions";

export async function postDeleteSms({ templateId }: { templateId: any }) {
  return await getData({
    endPoint: `delete-template/${templateId}`,
    type: "post",
    dataParams: {},
    baseUrlKey: "sms",
  });
}