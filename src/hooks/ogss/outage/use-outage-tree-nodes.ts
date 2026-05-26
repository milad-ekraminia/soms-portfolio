import { fetchTreeNodes, TreeParams } from "@/services/tree/fetch-tree-nodes";
import { getMockOutageTreeNodes } from "./mock-outage-tree-nodes";
import { useQuery } from "@tanstack/react-query";

const IS_MOCK = import.meta.env.VITE_MOCK === "true";
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const useOutageTreeNodes = (params: TreeParams) => {
  return useQuery({
    queryKey: ["outageTreeNodes", params],
    queryFn: async () => {
      if (IS_MOCK) {
        await delay(1000);
        return getMockOutageTreeNodes(params);
      }
      return fetchTreeNodes(params);
    },
    enabled: !!params.outageId && !!params.requestReason && !!params.ompId,
  });
};
