import { getData } from "@/lib/api-method/api-method-functions";
import {
  CityOutageResponse,
  DailyCounts,
} from "@/types/components/pages/dashboard";
import { numberOfInterruptionsByDayParams } from "@/types/services/chart.type";

export async function fetchOutageByCityWithHour(): Promise<CityOutageResponse> {
  return await getData<CityOutageResponse>({
    endPoint: `outage-by-city-with-hour-group`,
    type: "get",
  });
}

export async function fetchNumberOfInterruptionsByDay({
  start,
  end,
  statusId,
}: numberOfInterruptionsByDayParams): Promise<DailyCounts> {
  return await getData<DailyCounts>({
    endPoint: `number-of-interruptions-by-day`,
    type: "get",
    dataParams: { start, end, statusId },
  });
}
