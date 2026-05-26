import { AddPlusSvg } from "@/assets/icons/add-plus-svg";
import { Button } from "@/components/ui/button/button";
import Tabs from "@/components/ui/tabs/tabs";
import { useEffect, useState } from "react";
import { getClassNames } from "@/helpers/get-class-names";
import { NotificationModal } from "@/components/ui/notification/notification-modal/notification-modal";
import { AddMessageModal } from "../modals/add-message-modal";
import { DangerSvg } from "@/assets/icons/danger-svg";
import { smsTabs } from "@/helpers/data/settings";
import { SaveSvg } from "@/assets/icons/save-svg";
import { useGetMessageList } from "@/hooks/settings/use-get-message-list";
import { usePostActiveSms } from "@/hooks/settings/use-post-active-sms";
import { ListMessagesTab } from "./list-messages-tab";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/providers/toast-provider";
import { convertIdsToPlaceholders } from "@/helpers/sms-id-to-place-holder";
import { usePostDeleteSms } from "@/hooks/settings/use-post-delete-sms";
import { mockSmsApiResponse } from "@/helpers/mock-sms-data";
interface ListMessagesProps {
  handleChosenSms: (sms: any, section?: string) => void;
  chosenSms: any;
  setChosenSms: any;
  type: "planned" | "unPlanned";
}
export const ListMessages = ({
  handleChosenSms,
  chosenSms,
  setChosenSms,
  type,
}: ListMessagesProps) => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState(smsTabs[type][0].value);
  console.log("🚀 ~ ListMessages ~ setActiveTab:", setActiveTab)
  const [showAddNewMsg, setShowAddNewMsg] = useState<boolean>(false);
  const [showDelete, setShowDelete] = useState<any>();
  const [showEdit, setShowEdit] = useState<boolean>(false);

  const postActiveChange = usePostActiveSms();
  const postDeleteSms = usePostDeleteSms();

  const { data, isLoading } = useGetMessageList(Number(activeTab));
  const listData = !isLoading && !data ? mockSmsApiResponse : data;

  useEffect(() => {
    if (listData?.responseList && Array.isArray(listData.responseList)) {
      const activeItem = listData?.responseList?.find(
        (item: any) => item?.isActive,
      );
      if (activeItem?.content) {
        setChosenSms({
          ...activeItem,
          content: convertIdsToPlaceholders(activeItem.content),
        });
      } else {
        setChosenSms(null);
      }
    } else {
      setChosenSms(null);
    }
  }, [listData, activeTab, setChosenSms]);

  const submit = () => {
    const activeItem = data?.responseList?.find((item: any) => {
      return item?.isActive;
    });
    if (
      convertIdsToPlaceholders(activeItem?.content ?? "") !== chosenSms?.content
    ) {
      postActiveChange?.mutate(
        { templateId: chosenSms?.id },
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
        },
      );
    }
  };

  const isBtnDisabled = () => {
    const activeItem = listData?.responseList?.find(
      (item: any) => item?.isActive,
    );
    return (
      convertIdsToPlaceholders(activeItem?.content ?? "") === chosenSms?.content
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
      },
    );
    setShowDelete(null);
  };
  return (
    <>
      <div className="sms-section__list-messages">
        <div className="sms-section__list-messages-header">
          <div className="info">
            <h3 className="title">
              {type == "planned"
                ? "Planlı SMS Ayarları"
                : "Plansız SMS Ayarları"}
            </h3>
            <span className="description">Şablonları</span>
          </div>
          <div className={getClassNames("actions", [[false, "active"]])}>
            <Button
              variant="secondary-color"
              leftIcon={
                <AddPlusSvg stroke="var(--button-secondary-color-fg)" />
              }
              onClick={() => setShowAddNewMsg(true)}
            >
              Yeni Şablon
            </Button>
            <Button
              variant="secondary"
              leftIcon={<SaveSvg />}
              onClick={submit}
              disabled={isBtnDisabled() || data?.responseList?.length === 0}
            >
              Kaydet
            </Button>
          </div>
        </div>
        <div className="sms-section__list-messages-tabs">
          <Tabs
            activeTab={activeTab}
            tabs={smsTabs[type]}
            onTabClick={() => {}}
          />
        </div>
        <div className="sms-section__list-messages-content">
          <ListMessagesTab
            handleChosenSms={handleChosenSms}
            isLoading={isLoading}
            listTab={listData}
            setShowDelete={setShowDelete}
            setShowEdit={setShowEdit}
            setShowAddNewMsg={setShowAddNewMsg}
            chosenSms={chosenSms}
          />
        </div>
      </div>
      <AddMessageModal
        type={type}
        item={showEdit}
        setShowModal={setShowEdit}
        showModal={showEdit}
        title={"Şablon Düzenle"}
      />
      <AddMessageModal
        type={type}
        setShowModal={setShowAddNewMsg}
        showModal={showAddNewMsg}
        title={"Yeni Şablon Ekle"}
      />

      <NotificationModal
        isOpen={showDelete}
        onClose={() => setShowDelete(null)}
        title={"UYARI"}
        onConfirm={onDeleteSubmit}
        onCancel={() => setShowDelete(null)}
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
