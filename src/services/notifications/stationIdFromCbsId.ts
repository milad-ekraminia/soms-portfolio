import { getData } from "@/lib/api-method/api-method-functions";

export async function fetchStationIdFromCbsId({ cbsIds }: { cbsIds: any[] }) {
  const query = cbsIds
    .map((id) => `cbsIds=${encodeURIComponent(id)}`)
    .join("&");

  return await getData({
    endPoint: `station-id-from-gis-id?${query}`,
    type: "get",
    dataParams: {},
  });
}
