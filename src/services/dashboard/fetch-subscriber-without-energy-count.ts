import { getData } from "@/lib/api-method/api-method-functions";
import { SubscriberWithoutEnergyCountType } from "@/types/components/pages/dashboard";

export async function fetchSubscriberWithoutEnergyCount(): Promise<SubscriberWithoutEnergyCountType> {
  return await getData<SubscriberWithoutEnergyCountType>({
    endPoint: `subscriber-without-energy-count`,
    type: "get",
  });
}
