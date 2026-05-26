import { getData } from "@/lib/api-method/api-method-functions";

export async function fetchPlannedOutageDetailWithOutage({
  plannedOutageId,
}: {
  plannedOutageId: number;
}) {
  return await getData({
    endPoint: `planned-outage-detail/${plannedOutageId}`,
    type: "get",
  });
}