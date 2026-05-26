import { JSX, useState } from "react";
import { useDispatch } from "react-redux";
import { openDrawer } from "@/store/app/drawer-slice";
import { NotificationModal } from "@/components/ui/notification/notification-modal/notification-modal";
import Table from "@/components/ui/Table/table";
import { outageArchiveTableColumns as outageColumnsConfig } from "@/helpers/data/outage";
import { useTranslation } from "react-i18next";
import { useUnArchiveOutage } from "@/hooks/outage/use-archive-outages";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/providers/toast-provider";
import { useTableColumns } from "@/hooks/use-table-columns";
import { usePlannedArchiveOutage } from "@/hooks/outage/planned-outage";

interface UnArchiveProps {
  selectedRows: number[];
  outageData: any;
  modalValues?: {
    title: string;
    type: string;
    text?: JSX.Element | null;
    description: string;
  };
  isOpen: boolean;
  onClose: () => void;
  title: string;
  onCancel: () => void;
  idKey: "outageId" | "plannedOutageId";
  invalidateKeys: string[][];
  tableName: string;
}
const UnArchiveOutage = ({
  selectedRows,
  modalValues,
  outageData,
  isOpen,
  onClose,
  title,
  onCancel,
  idKey,
  invalidateKeys,
  tableName,
}: UnArchiveProps) => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const tableRows = selectedRows?.map((selectedRow) => {
    return outageData?.find((item: any) => item?.[idKey] == selectedRow);
  });
  const outageRow = (id: any) => {
    const outageId = tableRows?.find((item: any) => {
      return item?.[idKey] == id;
    });
    return outageId;
  };
  const handleTableRowClick = (rowData: any) => {
    const type = idKey === "outageId" ? "outage" : "plannedOutage";
    dispatch(
      openDrawer({
        title: "TBC524",
        type,
        id: rowData?.[idKey],
        rowData,
      })
    );
    onCancel();
  };
  const outageMutation = useUnArchiveOutage();
  const plannedOutageMutation = usePlannedArchiveOutage();
  const unArchiveMutation =
    idKey === "outageId" ? outageMutation : plannedOutageMutation;

  const onConfirm = () => {
    unArchiveMutation.mutate(
      {
        list: selectedArchiveRows,
      },
      {
        onSuccess: (data) => {
          invalidateKeys.forEach((key) =>
            queryClient.invalidateQueries({ queryKey: key })
          );
          const { responseMessage, responseStatusCode } = data ?? {};
          if (responseStatusCode === 600) {
            showToast(responseMessage, "success");
          } else {
            showToast("İşleminiz başarıyla gerçekleştirilmiştir.", "success");
          }
          onClose();
        },
        onError: (error: any) => {
          const responseMessage =
            error?.response?.data?.responseMessage ?? "İşlem Başarısız"; // Fallback message

          showToast(responseMessage, "error");
          onClose();
        },
      }
    );
  };

  const [selectedArchiveRows, setSelectedArchiveRows] = useState<number[]>(
    () =>
      tableRows
        ?.filter(
          (item) => !!item?.reason && !!item?.cause && !!item?.outageSource
        )
        ?.map((item) => item?.[idKey]) ?? []
  );

  const selectRowsHandler = (id: number, isAll = false) => {
    const rowData = outageRow(id);

    const rows = tableRows?.filter((item) => {
      if (!item?.reason || !item?.cause || !item?.outageSource) {
        return;
      } else {
        return item;
      }
    });

    if (isAll) {
      if (selectedArchiveRows?.length === rows.length) {
        deselectAllRows();
      } else {
        selectAllRows();
      }
    } else {
      if (!rowData?.reason || !rowData?.cause || !rowData?.outageSource) {
        return;
      }
      if (selectedArchiveRows?.includes(id)) {
        setSelectedArchiveRows(
          selectedArchiveRows?.filter((rowId) => rowId !== id)
        );
      } else {
        setSelectedArchiveRows([...selectedArchiveRows, id]);
      }
    }
  };

  const selectAllRows = () => {
    const rows = tableRows?.filter((item) => {
      if (item?.reason && item?.cause && item?.outageSource) {
        return item;
      }
    });
    setSelectedArchiveRows(rows?.map((row: any) => row?.[idKey]));
  };

  const deselectAllRows = () => {
    setSelectedArchiveRows([]);
  };
  const outageColumns = outageColumnsConfig(handleTableRowClick, t);
  const { columnOrder, setColumnOrder, effectiveColumns } = useTableColumns({
    tableName,
    allColumns: outageColumns,
  });

  return (
    <NotificationModal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      onConfirm={onConfirm}
      onCancel={onCancel}
      submitButtonText={"Uygun Olan Kesintileri Arşivden Çıkar"}
      cancelButtonText="Vazgeç"
      footerType="confirmationNotif"
      description={modalValues?.description}
      disabled={!selectedArchiveRows[0] || selectedArchiveRows?.length < 1}
      modalSize="md"
    >
      <div className="archive-outage-wrapper">
        <Table
          data={tableRows ?? []}
          columns={effectiveColumns}
          maxHeight="320px"
          idKey={idKey}
          hasPagination={false}
          selectRowsHandler={selectRowsHandler}
          hasCheckbox
          selectedRows={selectedArchiveRows}
          columnOrder={columnOrder}
          setColumnOrder={setColumnOrder}
        />
      </div>
    </NotificationModal>
  );
};
export default UnArchiveOutage;
