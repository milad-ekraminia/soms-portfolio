import Drawer from "@/components/ui/drawer/drawer";
import SelectInput from "@/components/ui/input/select-input/select-input";
import {
  useFetchForwardNotificationOptions,
  usePostForwardNotification,
} from "@/hooks/notifications/use-forward-notification";
import { useToast } from "@/providers/toast-provider";
import { openDrawer } from "@/store/app/drawer-slice";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
interface ForwardNotificationProps {
  isOpen: boolean;
  onClose: () => void;
  drawerValues?: {
    title: string;
    type: string;
  };
  notificationId: number;
  notifData: any;
}
const ForwardNotification = ({
  isOpen,
  onClose,
  drawerValues,
  notificationId,
  notifData,
}: ForwardNotificationProps) => {
  const { isOpen: isDrawerOpen } = useSelector(
    (state: any) => state?.drawer
  );
  const { showToast } = useToast();
  const submitForwardNotification = usePostForwardNotification();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const [value, setValue] = useState("");

  const { data, isLoading } = useFetchForwardNotificationOptions({
    enabledFetching: isOpen,
  });
  const submitHandler = () => {
    submitForwardNotification.mutate(
      {
        notificationId,
        newOperationCenterId: value as any,
      },
      {
        onSuccess() {
          queryClient.invalidateQueries({
            queryKey: ["NotificationGrid"],
          });
          showToast("İşleminiz başarıyla gerçekleştirilmiştir.", "success");
          setValue("");
          onClose();
        },
      }
    );
  };
  const idClickHandler = (value: any) => {
    if (!isDrawerOpen) {
      dispatch(
        openDrawer({
          title: "TBC524",
          type: "notification",
          id: value,
          rowData: value,
        })
      );
    }
  };
  const item = notifData?.find(
    (item: any) => item.notificationId == notificationId
  );
  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={submitHandler}
      title={drawerValues?.title}
      closeBtnText="Vazgeç"
      disableSubmitButton={!value}
    >
      <div className="forward-notification">
        <div className="forward-notification__content">
          <span className="forward-notification__content-id-title">
            Kayıtlı Operasyon Birimi:{" "}
          </span>
          <span className="forward-notification__content-id-value">
            {item?.operationCenterName ?? "-"}
          </span>
        </div>
        <div className="forward-notification__forwarding">
          <div className="forward-notification__forwarding-header">
            <span className="title">Yönlendirilecek Birim</span>
            <p className="description">
              <button className="item-id" onClick={() => idClickHandler(84832)}>
                {notificationId}
              </button>{" "}
              nolu bildirim seçtiğiniz operasyon birimine yönlendirilecektir.
            </p>
          </div>
          <div className="forward-notification__forwarding-body">
            <SelectInput
              placeholder="Operasyon Merkezi seçiniz."
              label="Operasyon Merkezi"
              setValue={setValue}
              isLoading={isLoading}
              selected={value}
              options={
                data?.data?.items?.map((item: any) => ({
                  displayName: item?.operationCenterName,
                  value: item?.id,
                  id: item?.id,
                })) ?? []
              }
            />
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default ForwardNotification;
