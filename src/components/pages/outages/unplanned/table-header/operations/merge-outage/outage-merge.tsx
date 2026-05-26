import Table from "@/components/ui/Table/table";
import {
  useCheckMergeOutage,
  useMergeOutage,
} from "@/hooks/outage/unPlanned-outage/use-merge-outage";
import { useTableColumns } from "@/hooks/use-table-columns";
import { useToast } from "@/providers/toast-provider";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { outageMergeTableColumns as outageColumnsConfig } from "@/helpers/data/outage";
import Modal from "@/components/ui/modal-wrapper/modal-wrapper";
import { Button } from "@/components/ui/button/button";
import { Loader } from "@/components/ui/loader/loader";

interface OutageMergeProps {
  selectedRows: number[];
  isOpen: boolean;
  onClose: () => void;
  onCancel: () => void;
  invalidateKeys: string[][];
}
export const OutageMerge = ({
  selectedRows,
  isOpen,
  onClose,
  onCancel,
  invalidateKeys,
}: OutageMergeProps) => {
  const { showToast } = useToast();
  const queryClient = useQueryClient();
  const mergeOutageMutation = useMergeOutage();
  const checkMergeOutageMutation = useCheckMergeOutage();
  const [showTable, setShowTable] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [tableData, setTableData] = useState<any[]>([]);

  const tableName = "OutageMergeTableModalcolumnss";

  useEffect(() => {
    if (isOpen) {
      setShowTable(false);
      setErrorMessage(null);
      checkMergeOutageMutation.mutate(
        {
          list: selectedRows,
        },
        {
          onSuccess: (data) => {
            if (data?.data) {
              const items = [{ ...data?.data }];
              setTableData(Array.isArray(items) ? items : []);
              setShowTable(true);
            }
            if (data?.error) {
              const responseMessage = data?.error?.message ?? "Bir hata oluştu";
              setErrorMessage(responseMessage);
            }
          },
          onError: (error: any) => {
            const responseMessage =
              error?.data?.error?.message ?? "İşlem Başarısız";
            setErrorMessage(responseMessage);
          },
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const onConfirm = () => {
    mergeOutageMutation.mutate(
      {
        list: selectedRows,
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
          // onClose();
        },
      }
    );
  };

  const outageColumns = outageColumnsConfig;
  const { columnOrder, setColumnOrder, effectiveColumns } = useTableColumns({
    tableName,
    allColumns: outageColumns,
  });

  return (
    <Modal modalSize="md" onClose={onClose} isOpen={isOpen} zIndex={999}>
      <div className="merge-outages-modal">
        <div className="merge-outages-modal__header">
          <span>Birleştirilen Kesintiler</span>
        </div>
        <div className="merge-outages-modal__body">
          {(() => {
            if (checkMergeOutageMutation.isPending) {
              return <Loader />;
            }
            if (showTable) {
              return (
                <div className="table-container">
                  <Table
                    data={tableData ?? []}
                    columns={effectiveColumns ?? []}
                    isLoading={false}
                    hasPagination={false}
                    columnOrder={columnOrder}
                    setColumnOrder={setColumnOrder}
                  />
                </div>
              );
            }
            if (errorMessage) {
              return <div className="error-message">{errorMessage}</div>;
            }
            return null;
          })()}
        </div>
        <div className="merge-outages-modal__footer">
          <Button variant="secondary" onClick={onCancel}>
            Vazgeç
          </Button>
          <Button
            variant="primary"
            onClick={onConfirm}
            disabled={!selectedRows?.length || !!errorMessage}
          >
            Onayla
          </Button>
        </div>
      </div>
    </Modal>
  );
};
