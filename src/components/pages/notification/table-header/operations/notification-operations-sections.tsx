import { NotificationModal } from "@/components/ui/notification/notification-modal/notification-modal";
import DetailsDrawer from "./details-drawer";
import { CreateUnplannedOutage } from "./create-unplanned-outage.tsx/create-unplanned-outage";
import ForwardNotification from "./forward-notification-drawer";
import NotificationCancelation from "./notification-cancelation";
import { SeperateInterruption } from "./seperate-interruption";
import { AssignToInterruption } from "./assign-to-interruptions";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface OperationsSectionProps {
  selectedRows: number[];
  isModalOpen: boolean;
  isDrawerOpen: boolean;
  isDetailsDrawerOpen: boolean;
  tableDrawer: boolean;
  forwardDrawer: boolean;
  seperateInterruptionShow: boolean;
  drawerValues: {
    title: string;
    type: string;
  };
  cancelationStep: number;
  setIsDrawerOpen: (value: boolean) => void;
  setIsDetailsDrawerOpen: (value: boolean) => void;
  setForwardDrawer: (value: boolean) => void;
  setTableDrawer: (value: boolean) => void;
  setSeperateInterruptionShow: (value: boolean) => void;
  handleCloseModal: () => void;
  handleConfirm: (args: {
    chosenRows: number[];
    formValues?: { reason: number; description?: string };
    onSuccess?: any;
  }) => void;
  handleCancel: () => void;
  notifData: any;
}
const NotificationOperationsSections = ({
  selectedRows,
  isModalOpen,
  isDrawerOpen,
  isDetailsDrawerOpen,
  tableDrawer,
  forwardDrawer,
  cancelationStep,
  drawerValues,
  seperateInterruptionShow,
  setIsDrawerOpen,
  setIsDetailsDrawerOpen,
  handleCloseModal,
  handleConfirm,
  handleCancel,
  setForwardDrawer,
  setTableDrawer,
  setSeperateInterruptionShow,
  notifData,
}: OperationsSectionProps) => {
  const schema = yup.object({
    reason: yup.number().min(0, "İptal nedeni zorunludur"),
    description: yup.string().optional(),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      reason: -1,
      description: "",
    },
  });
  const outageRow = () => {
    let outageId;
    if (selectedRows.length == 1) {
      outageId = notifData?.find(
        (item: any) => item.notificationId === selectedRows[0]
      );
    }
    return outageId;
  };

  return (
    <>
      <NotificationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={"Bildirimi İptal Et"}
        onConfirm={
          cancelationStep === 0
            ? () =>
                handleConfirm({
                  chosenRows: selectedRows,
                  formValues: undefined,
                }) // just move to step 1
            : handleSubmit((values) => {
                handleConfirm({
                  chosenRows: selectedRows,
                  formValues: values as {
                    reason: number;
                    description?: string;
                  },
                  onSuccess: () => {
                    reset({
                      reason: -1,
                      description: "",
                    });
                  },
                });
              })
        }
        onCancel={handleCancel}
        submitButtonText="Onayla"
        cancelButtonText="Vazgeç"
        footerType="confirmationNotif"
        modalSize="md"
      >
        <NotificationCancelation
          selectedRows={selectedRows}
          cancelationStep={cancelationStep}
          handleCancel={handleCancel}
          control={control}
          errors={errors}
        />
      </NotificationModal>
      <CreateUnplannedOutage
        drawerValues={drawerValues}
        onClose={() => {
          setIsDrawerOpen(false);
        }}
        isOpen={drawerValues?.type == "plansız" && isDrawerOpen}
        data={notifData}
        selectedRows={selectedRows}
      />
      <AssignToInterruption
        onClose={() => {
          setTableDrawer(false);
        }}
        isOpen={tableDrawer}
        drawerValues={drawerValues}
        selectedRows={selectedRows}
      />
      <DetailsDrawer
        isOpen={isDetailsDrawerOpen}
        onClose={() => {
          setIsDetailsDrawerOpen(false);
        }}
        drawerValues={drawerValues}
        notificationId={selectedRows[0]}
      />
      <ForwardNotification
        isOpen={forwardDrawer}
        onClose={() => {
          setForwardDrawer(false);
        }}
        drawerValues={drawerValues}
        notificationId={selectedRows[0]}
        notifData={notifData}
      />
      <SeperateInterruption
        onClose={() => {
          setSeperateInterruptionShow(false);
        }}
        isOpen={seperateInterruptionShow}
        drawerValues={drawerValues}
        selectedRows={selectedRows}
        outageId={outageRow()}
      />
    </>
  );
};

export default NotificationOperationsSections;
