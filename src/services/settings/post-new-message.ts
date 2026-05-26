import { getData } from "@/lib/api-method/api-method-functions";

export async function postNewMessage({
  message,
  messageCategory,
}: {
  message: any;
  messageCategory: any;
}) {
  return await getData({
    endPoint: `message-template/${messageCategory}?message=${message}`,
    type: "post",
    baseUrlKey: "sms",
  });
}
