import { getData } from "@/lib/api-method/api-method-functions";

export async function fetchSubscriberWithoutEnergyCount() {
  return await getData({
    endPoint: `subscriber-without-energy-count`,
    type: "get",
  });
}
