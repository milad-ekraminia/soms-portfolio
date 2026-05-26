import { getData } from "@/lib/api-method/api-method-functions";

export async function fetchCountByHourWithCity() {
  return await getData({
    endPoint: `count-by-hour-with-city`,
    type: "get",
  });
}
