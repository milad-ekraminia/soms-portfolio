
import { getData } from "@/lib/api-method/api-method-functions";


export async function fetchPlannedStatusCount({ status }: { status: number }) {
  return await getData({
    endPoint: `planned-status-count`,
    type: "get",
    dataParams: { status },
  });
}

