import { getData } from "@/lib/api-method/api-method-functions";

export async function fetchAddressCbsId({ cbsId }: { cbsId: number }) {
  return await getData({
    endPoint: `address-by-gis-id/${cbsId}`,
    type: "get",
  });
}
