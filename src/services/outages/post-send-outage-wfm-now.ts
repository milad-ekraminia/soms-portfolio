import { getFormDataPost } from "@/lib/api-method/api-method-functions";

export async function PostSendOutageWfmNow({
  outageId,
}: {
  outageId: any;
}) {
  return await getFormDataPost({
    endPoint: `send-outage-to-wfm-now`,
    type: "post",
    formData: {
      outageId,
    },
  });
}
