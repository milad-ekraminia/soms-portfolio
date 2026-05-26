import { JSX, useState } from "react";
import { useDispatch } from "react-redux";
import { openDrawer } from "@/store/app/drawer-slice";
import { NotificationModal } from "@/components/ui/notification/notification-modal/notification-modal";
import Table from "@/components/ui/Table/table";
import { outageArchiveTableColumns as outageColumnsConfig } from "@/helpers/data/outage";
import { useTranslation } from "react-i18next";
import { useArchiveOutage } from "@/hooks/outage/use-archive-outages";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/providers/toast-provider";

interface ArchiveProps {
  selectedRows: number[];
  outageData: any;
  modalValues?: {
    title: string;
    type: string;
    text: JSX.Element | null;
    description: string;
  };
  isOpen: boolean;
  onClose: () => void;
  title: string;
  onCancel: () => void;
}
const ArchiveOutage = ({
  selectedRows,
  modalValues,
  outageData,
  isOpen,
  onClose,
  title,
  onCancel,
}: ArchiveProps) => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const tableRows = selectedRows?.map((selectedRow) => {
    return outageData?.find((item: any) => item?.outageId == selectedRow);
  });
  const outageRow = (id: any) => {
    const outageId = tableRows?.find((item: any) => {
      return item.outageId == id;
    });
    return outageId;
  };
  const handleTableRowClick = (rowData: any) => {
    dispatch(
      openDrawer({
        title: "TBC524",
        type: "outage",
        id: rowData?.outageId,
        rowData,
      })
    );
    onCancel();
  };
  const archiveOutage = useArchiveOutage();

  const onConfirm = () => {
    archiveOutage.mutate(
      {
        list: selectedArchiveRows,
      },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries({ queryKey: ["outages"] });
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
    tableRows?.map((item) => {
      if (!!item?.reason && !!item?.cause && !!item?.outageSource) {
        return item?.outageId;
      }
    }) ?? []
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
    setSelectedArchiveRows(rows?.map((row: any) => row.outageId));
  };

  const deselectAllRows = () => {
    setSelectedArchiveRows([]);
  };
  const outageColumns = outageColumnsConfig(handleTableRowClick, t);

  return (
    <NotificationModal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      onConfirm={onConfirm}
      onCancel={onCancel}
      submitButtonText={"Uygun Olan Kesintileri Arşivle"}
      cancelButtonText="Vazgeç"
      footerType="confirmationNotif"
      // modalSize={"md"}
      description={modalValues?.description}
      disabled={!selectedArchiveRows[0] || selectedArchiveRows?.length < 1}
      modalSize="md"
    >
      <div className="archive-outage-wrapper">
        <Table
          data={tableRows ?? []}
          columns={outageColumns}
          maxHeight="320px"
          idKey="outageId"
          hasPagination={false}
          selectRowsHandler={selectRowsHandler}
          hasCheckbox
          selectedRows={selectedArchiveRows}
          columnOrder={outageColumns}
          setColumnOrder={() => {}}
        />
      </div>
    </NotificationModal>
  );
};
export default ArchiveOutage;
