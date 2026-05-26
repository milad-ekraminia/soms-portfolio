import { transformTreeData } from "@/helpers/tree-utils";
import { fetchTreeNodes } from "@/services/tree/fetch-tree-nodes";
import { useQuery } from "@tanstack/react-query";

export const useTreeData = ({
  outageData,
  selectedRows = [],
}: {
  outageData: any;
  selectedRows?: number[];
}) => {
  const selectedRowData = outageData.find((item: any) =>
    selectedRows?.includes(item.outageId)
  );

  return useQuery({
    queryKey: ["tree", selectedRowData?.outageId, selectedRows],
    queryFn: async () => {
      const res = await fetchTreeNodes({
        outageId: selectedRowData.outageId,
        ompId: selectedRowData.ompId,
        requestReason: 1,
      });
      return transformTreeData(res);
    },
    enabled: !!selectedRowData?.outageId && !!selectedRowData?.ompId,
  });
};
