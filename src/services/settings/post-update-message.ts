import { getData } from "@/lib/api-method/api-method-functions";

export async function postUpdateMessage({
  message,
  TEMPLATE_ID,
}: {
  message: any;
  TEMPLATE_ID: any;
}) {
  return await getData({
    endPoint: `update-message-template/${TEMPLATE_ID}?content=${message}`,
    type: "post",
    baseUrlKey: "sms",
  });
}
