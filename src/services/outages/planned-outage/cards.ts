import { getData } from "@/lib/api-method/api-method-functions";
import { PlannedOutageCardResponse } from "@/types/components/pages/outage/planned-outage";

export async function fetchPlannedStatusCount({
  status,
}: {
  status: number;
}): Promise<PlannedOutageCardResponse> {
  return await getData<PlannedOutageCardResponse>({
    endPoint: `planned-status-count`,
    type: "get",
    dataParams: { status },
  });
}
