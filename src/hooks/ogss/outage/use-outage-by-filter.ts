import { PostOutageByFilter } from "@/services/ogss/outage/post-outage-by-filter";
import { getMockOutageByFilter } from "./mock-outage-by-filter";
import { useMutation } from "@tanstack/react-query";

const IS_MOCK = import.meta.env.VITE_MOCK === "true";
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const outageByFilter = async (params: {
  isActive: boolean;
  appliedFilters: any;
  page: number;
  pageSize: number;
  sorting?: string;
}) => {
  if (IS_MOCK) {
    await delay(1000);
    return getMockOutageByFilter(params.isActive, params.page, params.pageSize);
  }

  return PostOutageByFilter(params);
};

export const useOutageByFilter = () => {
  return useMutation({
    mutationFn: outageByFilter,
  });
};
