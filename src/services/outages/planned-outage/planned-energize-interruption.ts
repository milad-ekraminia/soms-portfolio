import { getData } from "@/lib/api-method/api-method-functions";

export async function postPlannedEnergizeInterruption({
  plannedOutageId,
  formData,
}: {
  plannedOutageId: number;
  formData: any;
}) {
  return await getData({
    endPoint: `planned-outage-energize/${plannedOutageId}`,
    type: "post",
    dataParams: formData,
  });
}