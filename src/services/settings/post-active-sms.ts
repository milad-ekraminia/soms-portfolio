import { getData } from "@/lib/api-method/api-method-functions";

export async function postActiveSms({ templateId }: { templateId: any }) {
  return await getData({
    endPoint: `change-active-template/${templateId}`,
    type: "post",
    dataParams: {},
    baseUrlKey: "sms",
  });
}