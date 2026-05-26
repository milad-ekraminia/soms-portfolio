import Drawer from "@/components/ui/drawer/drawer";
import { NotificationModal } from "@/components/ui/notification/notification-modal/notification-modal";
import Table from "@/components/ui/Table/table";
import { openDrawer } from "@/store/app/drawer-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import InteruptionsNotification from "./interuptions-notification";
import {
  useAssignToInterruption,
  useAssignToInterruptionPost,
} from "@/hooks/notifications";
import { Loader } from "@/components/ui/loader/loader";
import { useToast } from "@/providers/toast-provider";
import { useQueryClient } from "@tanstack/react-query";
interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
  columns: any;
  selectedRows: any;
  drawerValues?: {
    title: string;
    type: string;
  };
  isLoading?: boolean;
  hasPagination?: boolean;
  pageChangeHanlder?: (page: number) => void;
  currentPage?: number;
  totalPagesProp?: number;
  pageSize?: number;
  setPageSize: (pageSize: number) => void;
}

export const DrawerTable = ({
  data,
  columns,
  isOpen,
  onClose,
  drawerValues = {
    title: "",
    type: "",
  },
  isLoading,
  hasPagination,
  pageChangeHanlder,
  currentPage,
  totalPagesProp,
  pageSize,
  setPageSize,
  selectedRows,
}: DrawerProps) => {
  const queryClient = useQueryClient();

  const { showToast } = useToast();
  const [chosenValue, setChosenValue] = useState<number>();
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const submitHandler = () => {
    setShowNotificationModal(true);
  };
  const handleCancel = () => {
    setShowNotificationModal(false);
  };

  const handleCloseModal = () => {
    setShowNotificationModal(false);
  };
  const assignToInterruptionMutation = useAssignToInterruptionPost();

  const handleConfirm = () => {
    assignToInterruptionMutation?.mutate(
      {
        outageId: chosenValue as number,
        notificationsId: selectedRows,
      },
      {
        onSuccess: () => {
          showToast("İşleminiz başarıyla gerçekleştirilmiştir.", "success");
          queryClient.invalidateQueries({ queryKey: ["NotificationGrid"] });

          setShowNotificationModal(false);
          onClose();
        },
        onError: () => {
          showToast("İşlem Başarısız", "error");
          onClose();
          setShowNotificationModal(false);
        },
      }
    );
  };

  const dispatch = useDispatch();
  const idClickHandler = (type: string, item: any) => {
    handleCloseModal();
    // TODO add rowDAta
    dispatch(openDrawer({ title: "TBC524", type, id: item, rowData: {} }));
  };
  const {
    data: assignModalData,
    isLoading: assignModalLoading,
    isPending: assignModalPending,
  } = useAssignToInterruption({
    notificationsId: selectedRows,
    outageId: chosenValue,
  });
  const notifText = (
    <span className="interuptions-notification__title">
      <span>Seçtiğiniz</span>
      {selectedRows?.length > 0
        ? selectedRows?.map((item: number, index: number) => (
            <span key={item} className="interuptions-notification__title-items">
              <button
                className="item-id"
                onClick={() => {
                  idClickHandler("notification", item);
                }}
              >
                {item}
              </button>
              {index < selectedRows.length - 1 && <span>, </span>}
            </span>
          ))
        : null}
      <span>numaralı bildirim</span>
      <button
        className="item-id"
        onClick={() => {
          idClickHandler("outage", chosenValue);
        }}
      >
        {chosenValue}
      </button>{" "}
      <span>numaralı kesintiye </span>
      <span>bağlanacaktır.</span>
      <span> Onaylıyor musunuz?</span>
    </span>
  );

  const ataNoDataText = (
    <span className="interuptions-notification__title">
      <span>Seçtiğiniz</span>
      {selectedRows?.length > 0
        ? selectedRows?.map((item: number, index: number) => (
            <span key={item} className="interuptions-notification__title-items">
              <button
                className="item-id"
                onClick={() => {
                  idClickHandler("notification", item);
                }}
              >
                {item}
              </button>
              {index < selectedRows.length - 1 && <span>, </span>}
            </span>
          ))
        : null}
      <span>numaralı bildirim</span>
      <button
        className="item-id"
        onClick={() => {
          idClickHandler("outage", chosenValue);
        }}
      >
        {chosenValue}
      </button>
      <span>numaralı kesinti aynı</span>
      <span> hiyerarşide değildir.</span>
      <span>Bu bildirim bu kesintiye bağlanamaz.</span>
    </span>
  );
  const isOutageAssignable = !assignModalData?.inconsistentList?.length;
  return (
    <>
      {drawerValues?.type == "ata" ? (
        <Drawer
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={submitHandler}
          title={drawerValues?.title}
        >
          <div className="notification-interuptions-drawer-table">
            <span className="notification-interuptions-drawer-table__title">
              Aktif Kesintiler
            </span>
            <Table
              data={data}
              columns={columns}
              isLoading={isLoading}
              renderLoading={() => <Loader />}
              maxHeight="600px"
              hasRadio
              selectedItem={chosenValue}
              setRadioSelect={setChosenValue}
              hasPagination={hasPagination}
              pageChangeHanlder={pageChangeHanlder}
              currentPage={currentPage}
              totalPagesProp={totalPagesProp}
              pageSize={pageSize}
              setPageSize={(num: any) => setPageSize(num)}
              idKey={drawerValues?.type == "ata" ? "outageId" : undefined}
              columnOrder={columns}
              setColumnOrder={() => {}}
            />
          </div>
        </Drawer>
      ) : null}
      <NotificationModal
        isOpen={showNotificationModal}
        onClose={handleCloseModal}
        title={drawerValues?.title}
        onConfirm={isOutageAssignable ? handleConfirm : handleCancel}
        onCancel={handleCancel}
        submitButtonText={isOutageAssignable ? "Onayla" : "Kapat"}
        cancelButtonText="Vazgeç"
        footerType="confirmationNotif"
        disabled={!assignModalData || assignModalLoading || assignModalPending}
      >
        <InteruptionsNotification
          text={isOutageAssignable ? notifText : ataNoDataText}
          data={assignModalData}
          isLoading={assignModalLoading || assignModalPending}
        />
      </NotificationModal>
    </>
  );
};
