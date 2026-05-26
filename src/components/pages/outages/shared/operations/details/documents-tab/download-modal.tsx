import { DocxFileSvg } from "@/assets/icons/docx-file-svg";
import { DownloadSvg } from "@/assets/icons/download-svg";
import { PdfFileSvg } from "@/assets/icons/pdf-file-svg";
import { XlsFileSvg } from "@/assets/icons/xls-file-svg";
import { Button } from "@/components/ui/button/button";
import {
  ALLOWED_FILE_TYPES,
  FILE_SIZE_LIMITS,
  formatFileSize,
} from "@/helpers/data/file-size";
import { useFileUpload } from "@/hooks/use-file-upload";
import { useToast } from "@/providers/toast-provider";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const DownloadModal = ({
  outageId,
  onClose,
}: {
  outageId: any;
  onClose: any;
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const uploadFile = useFileUpload();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;

    const validFiles: File[] = [];

    Array.from(selectedFiles).forEach((file) => {
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        alert(`Geçersiz dosya türü: ${file.name} (${file.type})`);
        return;
      }

      if (file.size > FILE_SIZE_LIMITS.MAX_10_MB) {
        alert(
          `Dosya çok büyük: ${file.name} (${formatFileSize(
            file.size
          )}). Maksimum ${formatFileSize(FILE_SIZE_LIMITS.MAX_10_MB)} olabilir.`
        );
        return;
      }

      validFiles.push(file);
    });

    setFiles(validFiles);
    setPreviews(validFiles.map((file) => URL.createObjectURL(file)));
  };

  const handleUpload = () => {
    if (files.length === 0) return;

    const formData = new FormData();
    files.forEach((file) => formData.append("file", file));

    uploadFile.mutate(
      { fileId: outageId, formData },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries({
            queryKey: ["CheckOutageDocumentList"],
          });

          const { responseMessage, responseStatusCode } = data ?? {};
          showToast(
            responseStatusCode === 600
              ? responseMessage
              : "İşleminiz başarıyla gerçekleştirilmiştir.",
            "success"
          );
          onClose();
        },
      }
    );
  };

  const getFilePreview = (file: File, previewUrl: string) => {
    if (file.type.startsWith("image/")) {
      return (
        <img
          src={previewUrl}
          alt={file.name}
          style={{
            maxWidth: "100%",
            maxHeight: "45px",
            borderRadius: "8px",
            margin: "auto 0",
          }}
        />
      );
    }

    if (file.type === "application/pdf") {
      return <PdfFileSvg />;
    }

    if (
      file.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      return <DocxFileSvg />;
    }

    if (
      file.type ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      return <XlsFileSvg />;
    }
  };
  return (
    <div className="outage-download-modal">
      <div className="outage-download-modal__header">
        <span>Doküman Yükle</span>
      </div>
      <div className="outage-download-modal__body">
        <div className="outage-download-modal__body-upload">
          <input
            type="file"
            onChange={handleFileChange}
            className="hidden-file-input"
            id="file-upload"
            accept={ALLOWED_FILE_TYPES.join(",")}
          />
          <Button
            variant="secondary"
            leftIcon={<DownloadSvg stroke="#344054" />}
          />
          <p className="outage-download-modal__body-upload-paragraph">
            <span>Yüklemek için tıklayın</span>
            <p>veya sürükleyip bırakın</p>
          </p>
          <span>
            PDF, JPG, DOCX veya XLSX dosyaları (maks.{" "}
            {formatFileSize(FILE_SIZE_LIMITS.MAX_10_MB)})
          </span>
        </div>

        <div className="outage-download-modal__body-download-list">
          {files.map((item, index) => (
            <div
              className="outage-download-modal__body-download-list-item"
              key={item?.name}
            >
              <div className="file-img">
                {getFilePreview(item, previews[index])}
              </div>
              <div className="detail">
                <div className="header">
                  <span className="title">{item?.name}</span>
                </div>
                <div className="size">{formatFileSize(item.size)}</div>
              </div>
              {/* <button
                className="deleteIcon"
                onClick={() => handleDeleteFile(index)}
              >
                <TrashSvg stroke="#344054" />
              </button> */}
            </div>
          ))}
        </div>
      </div>

      <div className="outage-download-modal__footer">
        <Button variant="secondary" onClick={onClose}>
          İptal
        </Button>
        <Button variant="primary" onClick={handleUpload}>
          {uploadFile?.isPending ? "yükleniyor" : "Kaydet"}
        </Button>
      </div>
    </div>
  );
};

export default DownloadModal;
