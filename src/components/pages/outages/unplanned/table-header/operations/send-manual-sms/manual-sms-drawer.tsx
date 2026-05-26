import { AddPlusSvg } from "@/assets/icons/add-plus-svg";
import { Button } from "@/components/ui/button/button";
import Drawer from "@/components/ui/drawer/drawer";
import { useGetMessageList } from "@/hooks/settings/use-get-message-list";
import { OutageItemType } from "@/types/components/pages/outage";
import { useState } from "react";
import { ManualSmsDrawerList } from "./manual-sms-drawer-list";
import { NotificationModal } from "@/components/ui/notification/notification-modal/notification-modal";
import { DangerSvg } from "@/assets/icons/danger-svg";
import { usePostDeleteSms } from "@/hooks/settings/use-post-delete-sms";
import { useToast } from "@/providers/toast-provider";
import { useQueryClient } from "@tanstack/react-query";
import { AddMessageModal } from "./add-message-modal";
import { useSubmitSmsManually } from "@/hooks/outage/unPlanned-outage/use-manual-sms";
interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  drawerValues: {
    title: string;
    type: string;
  };
  selectedRows?: any;
  outageData?: OutageItemType[];
}
export const ManualSmsDrawer = ({
  isOpen,
  onClose,
  drawerValues,
  selectedRows,
  outageData,
}: DrawerProps) => {
  const postDeleteSms = usePostDeleteSms();
  const postActiveSms = useSubmitSmsManually();
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  const [showAddNewMsg, setShowAddNewMsg] = useState<boolean>(false);
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [chosenSms, setChosenSms] = useState<any>();
  const handleChosenSms = (sms: string) => {
    setChosenSms(sms);
  };
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const outageItem = outageData?.find(
    (item) => item?.outageId == selectedRows[0]
  );
  const { data, isLoading } = useGetMessageList(8);

  const submitHandler = () => {
    postActiveSms?.mutate(
      { templateId: chosenSms?.id, outageId: outageItem?.outageId as number },
      {
        onSuccess: (data) => {
          const toastMessage =
            data?.error?.message ?? "İşleminiz başarıyla gerçekleştirilmiştir.";

          showToast(
            toastMessage,
            (String(data?.error?.type).toLowerCase() as any) ?? "success"
          );
          onClose();
        },
        onError: (error: any) => {
          const apiError = error?.response?.data?.error;

          // hard fallback if backend is not standard
          if (!apiError) {
            showToast("İşlem Başarısız", "error");
            return;
          }

          const { type, message } = apiError;

          switch (type) {
            case "ERROR":
              showToast(message, "error");
              break;

            case "WARNING":
              showToast(message, "warning");
              break;

            case "INFO":
              showToast(message, "info");
              break;

            case "QUESTION":
              // If you don't want confirmation modal right now
              showToast(message, "info");
              break;

            default:
              showToast(message ?? "Bilinmeyen hata", "error");
          }
        },
      }
    );
  };
  const onDeleteSubmit = () => {
    postDeleteSms?.mutate(
      { templateId: showDelete },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries({ queryKey: ["messages"] });
          const { responseMessage, responseStatusCode } = data ?? {};
          if (responseStatusCode === 600) {
            showToast(responseMessage, "error");
          } else {
            showToast("İşleminiz başarıyla gerçekleştirilmiştir.", "success");
          }
        },
        onError: (error: any) => {
          const responseMessage =
            error?.response?.data?.responseMessage ?? "İşlem Başarısız"; // Fallback message

          showToast(responseMessage, "error");
        },
      }
    );
    setShowDelete(false);
  };
  return (
    <>
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={submitHandler}
        title={drawerValues?.title}
        submitBtnText="SMS Gönder"
        style={{ padding: "16px 0px" }}
      >
        <div className="send-manual-sms">
          <div className="send-manual-sms__header">
            <div className="send-manual-sms__header-wrapper">
              <span className="id">
                <span className="title">Kesinti ID:</span>
                <span className="value">{outageItem?.outageId}</span>
              </span>
              <span className="clients">
                <span className="title">Etkilenen Abone Sayısı:</span>
                <span className="value">
                  {outageItem?.totalAffectedSubscribers}
                </span>
              </span>
            </div>
          </div>
          <div className="send-manual-sms__body">
            <div className="send-manual-sms__body-header">
              <span className="title">Hazır Şablonlar</span>
              <Button
                variant="secondary-color"
                leftIcon={<AddPlusSvg stroke="#175CD3" />}
                onClick={() => setShowAddNewMsg(true)}
              >
                Yeni Şablon
              </Button>
            </div>
            <ManualSmsDrawerList
              handleChosenSms={handleChosenSms}
              isLoading={isLoading}
              listTab={data}
              setShowDelete={setShowDelete}
              setShowEdit={setShowEdit}
              setShowAddNewMsg={setShowAddNewMsg}
              chosenSms={chosenSms}
            />
          </div>
        </div>
      </Drawer>
      <AddMessageModal
        type={"unPlanned"}
        item={showEdit}
        setShowModal={setShowEdit}
        showModal={showEdit}
        title={"Şablon Düzenle"}
      />
      <AddMessageModal
        type={"unPlanned"}
        setShowModal={setShowAddNewMsg}
        showModal={showAddNewMsg}
        title={"Yeni Şablon Ekle"}
      />

      <NotificationModal
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
        title={"UYARI"}
        onConfirm={onDeleteSubmit}
        onCancel={() => setShowDelete(false)}
        submitButtonText="Sil"
        cancelButtonText="Vazgeç"
        footerType="confirmationError"
        icon={<DangerSvg />}
      >
        <p className="sms-delete-body">
          Şablonu silmek istediğinizden emin misiniz?
        </p>
      </NotificationModal>
    </>
  );
};
