import { NotificationModal } from "@/components/ui/notification/notification-modal/notification-modal";
import { openDrawer } from "@/store/app/drawer-slice";
import { useDispatch, useSelector } from "react-redux";
import InteruptionsNotification from "./interuptions-notification";
import {
  useSeperateInterruption,
  useSeperateToInterruptionPost,
} from "@/hooks/notifications";
import { useToast } from "@/providers/toast-provider";
import { useQueryClient } from "@tanstack/react-query";
interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  drawerValues?: {
    title: string;
    type: string;
  };
  selectedRows: any;
  outageId: any;
}

export const SeperateInterruption = ({
  isOpen,
  onClose,
  drawerValues = {
    title: "",
    type: "",
  },
  selectedRows,
  outageId,
}: DrawerProps) => {
  const { isOpen: isDrawerOpen } = useSelector(
    (state: any) => state?.drawer
  );
  const queryClient = useQueryClient();

  const { showToast } = useToast();
  const seperateInterruptionMutation = useSeperateToInterruptionPost();
  const handleConfirm = () => {
    seperateInterruptionMutation?.mutate(
      {
        outageId: outageId?.outageId,
        notificationsId: selectedRows,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["NotificationGrid"] });
          showToast("İşleminiz başarıyla gerçekleştirilmiştir.", "success");
          onClose();
        },
        onError: () => {
          showToast("İşlem Başarısız", "error");
          onClose();
        },
      }
    );
  };

  const dispatch = useDispatch();
  const idClickHandler = (type: string, id: any) => {
    if (!isDrawerOpen) {
      onClose();
      dispatch(openDrawer({ title: "TBC524", type, id, rowData: outageId }));
    }
  };
  const {
    data: assignModalData,
    isLoading: assignModalLoading,
    isPending: assignModalPending,
  } = useSeperateInterruption({
    notificationsId: selectedRows,
    outageId: outageId?.outageId,
  });
  const renderSelectedIds = () =>
    selectedRows.map((item: number, index: number) => (
      <span key={item} className="interuptions-notification__title-items">
        <button
          className="item-id"
          onClick={() => idClickHandler("notification", item)}
        >
          {item}
        </button>
        {index < selectedRows.length - 1 && <span>, </span>}
      </span>
    ));

  const renderOutageId = () =>
    outageId?.outageId && (
      <button
        className="item-id"
        onClick={() => idClickHandler("outage", outageId.outageId)}
      >
        {outageId.outageId}
      </button>
    );

  const notifText = (
    <span className="interuptions-notification__title">
      <span>Seçtiğiniz</span>
      {selectedRows.length > 0 && renderSelectedIds()}
      <span>numaralı bildirim</span>
      {renderOutageId()}
      <span>numaralı kesintiden </span>
      <span>ayrılacaktır.</span>
      <span> Onaylıyor musunuz?</span>
    </span>
  );

  return (
    <NotificationModal
      isOpen={isOpen}
      onClose={onClose}
      title={drawerValues?.title}
      onConfirm={handleConfirm}
      onCancel={onClose}
      submitButtonText="Onayla"
      cancelButtonText="Vazgeç"
      footerType="confirmationNotif"
      disabled={!assignModalData || assignModalLoading || assignModalPending}
    >
      <InteruptionsNotification
        text={notifText}
        data={assignModalData}
        isLoading={assignModalLoading || assignModalPending}
        drawerValues={drawerValues}
      />
    </NotificationModal>
  );
};
