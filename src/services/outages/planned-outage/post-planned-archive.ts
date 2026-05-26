import { getFormDataPost } from "@/lib/api-method/api-method-functions";

export async function postPlannedArchive({
  plannedOutageIds,
}: {
  plannedOutageIds: number[];
}) {
  return await getFormDataPost({
    endPoint: `check-planned-outage-archive`,
    type: "post",
    formData: plannedOutageIds,
  });
}
