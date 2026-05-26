import { useTableLogic } from "@/hooks/use-table-logic";
import { useTableFilters } from "@/hooks/use-table-filters";
import { useOutages } from "@/hooks/outage";
import { OutageItemType } from "@/types/components/pages/outage";
import { useEffect } from "react";
import { useAssignToInterruptionPost } from "@/hooks/notifications";
import { useToast } from "@/providers/toast-provider";
import { useQueryClient } from "@tanstack/react-query";
export const useAssignToInterruptionTableLogic = (tableName: string, isOpen?:boolean) => {
  const {
    filters: appliedFilters,
    setFilter: onFilterChange,
    clearFilters,
    removeFilterByKey,
    setRefetchCallback,
  } = useTableFilters(tableName);

  const table = useTableLogic<OutageItemType>({
    removeFilterByKey,
    onFilterClear: clearFilters,
    appliedFilters,
    fetchHook: useOutages,
    getRowId: (item) => item.outageId,
    enabledFetch: isOpen,
  });

  useEffect(() => {
    setRefetchCallback(table.refetch);
  }, [table.refetch]);

  return {
    ...table,
    appliedFilters,
    setFilter: table?.setFilter,
    clearFilters,
    removeFilterByKey,
    onFilterChange,
  };
};

export const useAssignToInterruptionHandler = (
  selectedRows: number[],
  onClose: () => void,
  closeModal?: () => void // add optional param
) => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const mutation = useAssignToInterruptionPost();

  const handleAssign = (outageId: number) => {
    mutation.mutate(
      { outageId, notificationsId: selectedRows },
      {
        onSuccess: () => {
          showToast("İşleminiz başarıyla gerçekleştirilmiştir.", "success");
          queryClient.invalidateQueries({ queryKey: ["NotificationGrid"] });
          onClose();
          closeModal?.(); // ✅ close modal
        },
        onError: () => {
          showToast("İşlem Başarısız", "error");
          onClose();
          closeModal?.(); // ✅ close modal
        },
      }
    );
  };

  return { handleAssign, mutation };
};
