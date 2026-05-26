import { getData } from "@/lib/api-method/api-method-functions";

export async function fetchStationWithAddress({
  stationId,
}: {
  stationId: number | string;
}) {
  return await getData({
    endPoint: `gis-id-with-station-id/${stationId}`,
    type: "get",
  });
}
