import { Loader } from "@/components/ui/loader/loader";
import Table from "@/components/ui/Table/table";
import { getOutageDetailsColumns } from "@/helpers/data/outage";
import { useOutageDetailListDocuments } from "@/hooks/outage/use-get-detail-drawer";
import DetailsUploadTableHeader from "./details-upload-table-header";
import { useFileDownload } from "@/hooks/use-file-download";
import Modal from "@/components/ui/modal-wrapper/modal-wrapper";
import DownloadModal from "./download-modal";
import { NotificationModal } from "@/components/ui/notification/notification-modal/notification-modal";
import { DangerSvg } from "@/assets/icons/danger-svg";
import { useState } from "react";
import { useFileDelete } from "@/hooks/use-file-delete";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/providers/toast-provider";
import { base64ToBlob, downloadBlob } from "@/helpers/base-to-blob";
import { useTranslation } from "react-i18next";

export const DetailListDocuments = ({
  chosenRows,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  selectedRows,
}: {
  chosenRows: any;
  selectedRows: any;
}) => {
  console.log("🚀 ~ DetailListDocuments ~ selectedRows:", selectedRows)
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
  const columns = getOutageDetailsColumns({
    onDelete: handleDelete,
    onDownload: handleDownload,
    t: t,
  });
  const { data, isLoading, isPending } = useOutageDetailListDocuments({
    outageId: chosenRows,
  });

  return (
    <>
      <Table
        data={data?.responseList?.[0]?.data?.items ?? []}
        columns={columns}
        isLoading={isLoading || isPending}
        renderLoading={() => <Loader />}
        maxHeight="400px"
        hasPagination={false}
        headerChildren={<DetailsUploadTableHeader setIsOpen={setIsOpen} />}
        columnOrder={columns}
        setColumnOrder={() => {}}
      />
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
