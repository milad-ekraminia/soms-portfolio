import { fetchSimsTreeNodes } from "@/services/tree/fetch-tree-nodes";
import { useQuery } from "@tanstack/react-query";

export const useSimulatiorTreeNodes = (params: any) => {
  return useQuery({
    queryKey: ["simTreeNodes", params],
    queryFn: () => fetchSimsTreeNodes(params),
    enabled: !!params,
  });
};
