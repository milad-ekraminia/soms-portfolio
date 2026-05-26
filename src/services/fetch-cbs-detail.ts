import { getData } from "@/lib/api-method/api-method-functions";

export async function fetchCbsDetail({ cbsId }: { cbsId: number }) {

  return await getData({
    endPoint: `component-detail/${cbsId}`,
    type: "get",
  });
}
