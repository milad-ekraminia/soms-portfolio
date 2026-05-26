import { getData } from "@/lib/api-method/api-method-functions";

export async function fetchOutageDetailLHoverData({ outageId }: { outageId: number }) {
  return await getData({
    endPoint: `installations-detail/${outageId}`,
    type: "get",
  });
};
