import { Loader } from "@/components/ui/loader/loader";
import Table from "@/components/ui/Table/table";
import { getOutageDetailsColumns } from "@/helpers/data/outage";
import { useOutageDetailListDocuments } from "@/hooks/outage/use-get-detail-drawer";
import { useFileDownload } from "@/hooks/use-file-download";
import Modal from "@/components/ui/modal-wrapper/modal-wrapper";
import DownloadModal from "./download-modal";
import { NotificationModal } from "@/components/ui/notification/notification-modal/notification-modal";
import { DangerSvg } from "@/assets/icons/danger-svg";
import { useEffect, useState } from "react";
import { useFileDelete } from "@/hooks/use-file-delete";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/providers/toast-provider";
import { base64ToBlob, downloadBlob } from "@/helpers/base-to-blob";
import { useTranslation } from "react-i18next";
import { useTableColumns } from "@/hooks/use-table-columns";
import { FilterItem, setTableFilters } from "@/store/app/filter-slice";
import { useTableFilters } from "@/hooks/use-table-filters";
import { useTableLogic } from "@/hooks/use-table-logic";
import { useDispatch } from "react-redux";
import { GlobalTableHeader } from "@/components/ui/global-header/global-header";
import { Button } from "@/components/ui/button/button";
import { UploadSvgIcon } from "@/assets/icons/upload-svg-icon";
import { ClearSvg } from "@/assets/icons/clear-svg";

export const DetailListDocuments = ({ chosenRows }: { chosenRows: any }) => {
  const tableName = "unPlannedOutageDetailListDocumentCOlumn";
  const dispatch = useDispatch();

  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const { t } = useTranslation();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<any>(null);

  const [isOpen, setIsOpen] = useState(false);
  const fileDownload = useFileDownload();
  const fileDelete = useFileDelete();
  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(null);
  };
  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(null);
  };
  const handleDeleteConfirm = () => {
    fileDelete.mutate(
      {
        fileId: isDeleteModalOpen,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["CheckOutageDocumentList"],
          });
          showToast("İşleminiz başarıyla gerçekleştirilmiştir.", "success");
          setIsDeleteModalOpen(null);
        },
        onError: () => {
          showToast("İşlem Başarısız", "error");
        },
      }
    );
  };
  const handleDelete = (id: number) => {
    setIsDeleteModalOpen(id);
  };

  const handleDownload = (id: number) => {
    fileDownload.mutate(id, {
      onSuccess: (data) => {
        const base64 = data?.responseList?.[0].content;
        const contentType = data?.responseList?.[0]?.mimeType ?? "image/png";
        const fileName = data?.responseList?.[0]?.fileName ?? "";

        const blob = base64ToBlob(base64, contentType);
        downloadBlob(blob, fileName);
      },
    });
  };
  const {
    filters: appliedFilters,
    setFilter: onFilterChange,
    removeFilterByKey,
    clearFilters: onFilterClear,
    setRefetchCallback,
  } = useTableFilters(tableName);
  function useFetchOutageDetailListDocuments(
    page: number,
    pageSize: number,
    filters: FilterItem[]
  ) {
    return useOutageDetailListDocuments({
      page,
      pageSize,
      appliedFilters: filters,
      outageId: chosenRows,
    });
  }

  const {
    data,
    isLoading,
    isPending,
    refetch,
    tempFilters,
    setFilter,
    removeTempFilterByKey,
    tableWholeFilterClear,
  } = useTableLogic({
    removeFilterByKey,
    onFilterClear,
    appliedFilters,
    fetchHook: useFetchOutageDetailListDocuments,
    getRowId: (item: any) => item.id,
  });
  const columns = getOutageDetailsColumns({
    onDelete: handleDelete,
    onDownload: handleDownload,
    t: t,
    appliedFilters: tempFilters,
    onFilterChange: setFilter,
  });
  const { columnOrder, setColumnOrder, effectiveColumns } = useTableColumns({
    tableName,
    allColumns: columns,
  });

  useEffect(() => {
    setRefetchCallback(refetch);
  }, [refetch]);

  const onFilterSubmit = () => {
    dispatch(setTableFilters({ table: tableName, filters: tempFilters }));
  };

  return (
    <>
      <div className="detail-list-documents">
        <Table
          data={data?.items ?? []}
          columns={effectiveColumns}
          isLoading={isLoading || isPending}
          renderLoading={() => <Loader />}
          maxHeight="400px"
          hasPagination={false}
          columnOrder={columnOrder}
          setColumnOrder={setColumnOrder}
          appliedFilters={appliedFilters}
          onFilterChange={onFilterChange}
          onFilterSubmit={onFilterSubmit}
          onFilterClear={onFilterClear}
          removeFilterByKey={removeTempFilterByKey}
          headerChildren={
            <GlobalTableHeader
              title="Dokümanlar Listesi"
              actions={
                <>
                  {appliedFilters?.length > 0 ? (
                    <Button
                      variant="secondary-color"
                      onClick={tableWholeFilterClear}
                      leftIcon={
                        <ClearSvg
                          stroke={
                            appliedFilters?.length < 1 ? "#98A2B3" : undefined
                          }
                        />
                      }
                      disabled={appliedFilters?.length < 1}
                    >
                      {appliedFilters?.length < 1
                        ? ""
                        : "Tüm Filtreleri Temizle"}
                    </Button>
                  ) : null}
                  <Button
                    variant="primary"
                    leftIcon={<UploadSvgIcon />}
                    onClick={() => setIsOpen(true)}
                  >
                    Yükle
                  </Button>
                </>
              }
            />
          }
        />
      </div>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} modalSize="sm">
        <DownloadModal outageId={chosenRows} onClose={() => setIsOpen(false)} />
      </Modal>
      <NotificationModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        title={"UYARI"}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        submitButtonText="Sil"
        cancelButtonText="Vazgeç"
        footerType="confirmationError"
        icon={<DangerSvg />}
      >
        <p className="settings-rol-alert-notification-body">
          Doküman {isDeleteModalOpen}’i silmek istediğinizden emin misiniz?{" "}
        </p>
      </NotificationModal>
    </>
  );
};
