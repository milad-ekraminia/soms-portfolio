import { getFormDataPost } from "@/lib/api-method/api-method-functions";

export async function PostDetailChange({
  cbsId,
  outageId,
}: {
  cbsId: any;
  outageId: any;
}) {
  return await getFormDataPost({
    endPoint: `change-outage-address?gisId=${cbsId}&outageId=${outageId}`,
    type: "post",
    formData: {},
  });
}
