import { getFormDataPost } from "@/lib/api-method/api-method-functions";

export async function PostPlannedOutageConfirm({ list }: { list: any }) {
  return await getFormDataPost({
    endPoint: `planned-outage-confirm `,
    type: "post",
    formData: [...list],
  });
}
