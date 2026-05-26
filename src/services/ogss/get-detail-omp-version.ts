import { getData } from "@/lib/api-method/api-method-functions";
import { StationInfoByType } from "@/types/components/pages/ogss/ogss";

export async function fetchOutageDetailByType({
  omdId,
  version,
}: {
  omdId: number;
  version: number;
}): Promise<StationInfoByType> {
  return await getData<StationInfoByType>({
    endPoint: `omp-network-detail-simulator-or-historical-outage?ompId=${omdId}&versionId=${version}`,
    type: "get",
  });
}
