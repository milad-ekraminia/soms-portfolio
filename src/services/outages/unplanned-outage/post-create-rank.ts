import { getData } from "@/lib/api-method/api-method-functions";

interface OutageParams {
  dataParams: {
    cbsId: string;
    outageId: number;
  };
}
export async function PostCreateRank({ dataParams }: OutageParams) {
  const { cbsId, outageId } = dataParams;
  return await getData({
    endPoint: `unplanned-outage-step?outageId=${outageId}&gisId=${cbsId}`,
    type: "post",
  });
}
