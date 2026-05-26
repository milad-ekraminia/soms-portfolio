import Drawer from "@/components/ui/drawer/drawer";
import { NotificationModal } from "@/components/ui/notification/notification-modal/notification-modal";
import TreeChart from "@/components/ui/tree-chart/tree-chart";

import { JSX, useState } from "react";
import CancelNotification from "../../../shared/operations/cancel-notification";
import { DetailDrawerWrapper } from "./details/details-drawer-wrapper";
import { CreateUnplannedOutage as NotificationCreateUnplannedOutageForm } from "@/components/pages/notification/table-header/operations/create-unplanned-outage.tsx/create-unplanned-outage";
import ArchiveOutage from "../../../shared/operations/archive-outage";
import { EnergizeDrawer } from "../../../shared/operations/energize-drawer";
import { useEnergizeInterruption } from "@/hooks/outage/use-energize-interruption";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { OutageMerge } from "./merge-outage/outage-merge";
import { CreateRank } from "./create-rank/create-rank";
import { ManualSmsDrawer } from "./send-manual-sms/manual-sms-drawer";
import UnArchiveOutage from "../../../shared/operations/un-archive-outage";

interface OperationsSectionProps {
  selectedRows: number[];
  isModalOpen: boolean;
  isDrawerOpen: boolean;
  treeChartModal: boolean;
  drawerValues: {
    title: string;
    type: string;
    formType: string;
  };
  modalValues: {
    title: string;
    type: string;
    text: JSX.Element | null;
    description: string;
  };
  modalSize: "lg" | "full";
  cancelationStep: number;
  setIsDrawerOpen: (value: boolean) => void;
  handleCloseModal: () => void;
  handleConfirm: ({
    chosenRows,
    formValues,
    onSuccess,
  }: {
    chosenRows: number[];
    formValues?: { reason: number; description?: string };
    onSuccess?: any;
  }) => void;
  handleCancel: () => void;
  modalSizeHanlder: () => void;
  closeDrawer: () => void;
  outageData: any;
}

const unPlannedOutageKeys = [
  ["activeUnplannedOutage"],
  ["energizedOutage"],
  ["archiveOutageCount"],
  ["outages"],
];

const OutageOperationSections = ({
  selectedRows,
  isModalOpen,
  isDrawerOpen,
  modalSize,
  drawerValues,
  modalValues,
  treeChartModal,
  cancelationStep,
  setIsDrawerOpen,
  handleCloseModal,
  handleConfirm,
  handleCancel,
  modalSizeHanlder,
  closeDrawer,
  outageData,
}: OperationsSectionProps) => {
  const schema = yup.object({
    reason: yup.number().min(0, "İptal nedeni zorunludur"),
    description: yup.string().optional(),
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      reason: -1,
      description: "",
    },
  });
  const [chosenRows, setChosenRows] = useState<number[]>([]);


  return (
    <>
      {modalValues?.type == "cancel-notif" ||
      modalValues?.type == "planned-outage" ? (
        <NotificationModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={modalValues.title}
          // onConfirm={() => {
          //   handleSubmitForm();
          // }}
          onConfirm={
            cancelationStep === 0
              ? () =>
                  handleConfirm({
                    chosenRows: selectedRows,
                    formValues: undefined,
                  }) // just move to step 1
              : handleSubmit((values) => {
                  if (values.reason === undefined) return; // guard
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
          submitButtonText={"Onayla"}
          cancelButtonText="Vazgeç"
          footerType="confirmationNotif"
          modalSize="md"
        >
          <CancelNotification
            modalValues={modalValues}
            cancelationStep={cancelationStep}
            handleCloseModal={handleCloseModal}
            chosenRows={chosenRows}
            setChosenRows={setChosenRows}
            control={control}
            errors={errors}
          />
        </NotificationModal>
      ) : null}
      {/* archive  */}
      {modalValues?.type == "archive-notif" ? (
        <ArchiveOutage
          selectedRows={selectedRows}
          modalValues={modalValues}
          outageData={outageData}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={modalValues.title}
          onCancel={handleCancel}
          idKey="outageId"
          invalidateKeys={unPlannedOutageKeys}
          tableName="unPlannedOutageArchive"
        />
      ) : null}
      {modalValues?.type == "un-archive-notif" ? (
        <UnArchiveOutage
          selectedRows={selectedRows}
          modalValues={modalValues}
          outageData={outageData}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={modalValues.title}
          onCancel={handleCancel}
          idKey="outageId"
          invalidateKeys={unPlannedOutageKeys}
          tableName="unPlannedOutageArchive"
        />
      ) : null}
      {/* create outage drawer form */}
      {drawerValues?.formType == "plansız" ? (
        <NotificationCreateUnplannedOutageForm
          drawerValues={drawerValues}
          onClose={() => {
            setIsDrawerOpen(false);
          }}
          isOpen={isDrawerOpen}
          selectedRows={[]}
        />
      ) : null}
      {/* energize drawer */}
      <EnergizeDrawer
        isDrawerOpen={drawerValues?.type == "energy" && isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        drawerValues={drawerValues}
        selectedRows={selectedRows}
        outageData={outageData}
        idKey="outageId"
        useMutationHook={useEnergizeInterruption}
        invalidateKeys={[
          ["activeUnplannedOutage"],
          ["energizedOutage"],
          ["archiveOutageCount"],
          ["outages"],
        ]}
      />
      {/* detail drawer */}
      <DetailDrawerWrapper
        selectedRows={selectedRows}
        isDrawerOpen={drawerValues?.type == "data" && isDrawerOpen}
        closeDrawer={() => {
          setIsDrawerOpen(false);
        }}
      />
      {/* tree chart */}
      <Drawer
        isOpen={treeChartModal}
        onClose={closeDrawer}
        hasFooter={false}
        size={modalSize}
        hasHeader={false}
      >
        {treeChartModal ? (
          <TreeChart
            title="Tek Hat Gösterimi"
            selectedRows={selectedRows}
            modalSizeHanlder={modalSizeHanlder}
            outageData={outageData}
          />
        ) : null}
      </Drawer>
      {modalValues?.type == "merge-outage" ? (
        <OutageMerge
          selectedRows={selectedRows}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onCancel={handleCancel}
          invalidateKeys={unPlannedOutageKeys}
        />
      ) : null}
      <CreateRank
        drawerValues={drawerValues}
        onClose={() => {
          setIsDrawerOpen(false);
        }}
        isOpen={drawerValues?.type == "create-rank" && isDrawerOpen}
        selectedRows={selectedRows}
        outageData={outageData}
      />
      <ManualSmsDrawer
        drawerValues={drawerValues}
        onClose={() => {
          setIsDrawerOpen(false);
        }}
        isOpen={drawerValues?.type == "unplanned-sms" && isDrawerOpen}
        selectedRows={selectedRows}
        outageData={outageData}
      />
    </>
  );
};

export default OutageOperationSections;
