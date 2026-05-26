import Drawer from "@/components/ui/drawer/drawer";
import { NotificationModal } from "@/components/ui/notification/notification-modal/notification-modal";
import TreeChart from "@/components/ui/tree-chart/tree-chart";

import { JSX, useState } from "react";
import CancelNotification from "./cancel-notification";
import { DrawerForms } from "./drawer-forms";
import { DrawerTable } from "./drawer-table";
import EnergyDrawer from "./energy-drawer";
import RedirectOutage from "./redirect-outage";
import { DetailDrawerWrapper } from "./details/details-drawer-wrapper";
import ArchiveOutage from "./archive-outage";

interface OperationsSectionProps {
  selectedRows: number[];
  isModalOpen: boolean;
  isDrawerOpen: boolean;
  tableDrawer: boolean;
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
  setTableDrawer: (value: boolean) => void;
  handleCloseModal: () => void;
  handleConfirm: ({
    chosenRows,
    formValues,
  }: {
    chosenRows: number[];
    formValues: { reason: number; description: string };
  }) => void;
  handleCancel: () => void;
  modalSizeHanlder: () => void;
  closeDrawer: () => void;
  outageData: any;
}
const OutageOperationSections = ({
  selectedRows,
  isModalOpen,
  isDrawerOpen,
  modalSize,
  drawerValues,
  tableDrawer,
  modalValues,
  treeChartModal,
  cancelationStep,
  setIsDrawerOpen,
  handleCloseModal,
  handleConfirm,
  handleCancel,
  setTableDrawer,
  modalSizeHanlder,
  closeDrawer,
  outageData,
}: OperationsSectionProps) => {
  const [formValues, setFormValues] = useState({
    reason: -1,
    description: "",
  });
  const [chosenRows, setChosenRows] = useState<number[]>([]);

  return (
    <>
      {modalValues?.type == "cancel-notif" ? (
        <NotificationModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={modalValues.title}
          onConfirm={() => {
            handleConfirm({ chosenRows: selectedRows, formValues });
          }}
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
            formValues={formValues}
            setFormValues={setFormValues}
            chosenRows={chosenRows}
            setChosenRows={setChosenRows}
          />
        </NotificationModal>
      ) : null}
      {modalValues?.type == "planned-outage" ? (
        <NotificationModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={modalValues.title}
          onConfirm={() => {
            handleConfirm({ chosenRows: selectedRows, formValues });
          }}
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
            formValues={formValues}
            setFormValues={setFormValues}
            chosenRows={chosenRows}
            setChosenRows={setChosenRows}
          />
        </NotificationModal>
      ) : null}
      {modalValues?.type == "archive-notif" ? (
        <ArchiveOutage
          selectedRows={selectedRows}
          modalValues={modalValues}
          outageData={outageData}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={modalValues.title}
          onCancel={handleCancel}
        />
      ) : null}
 
      <DrawerTable
        onClose={() => {
          setTableDrawer(false);
        }}
        isOpen={tableDrawer}
        data={[]}
        columns={[]}
      />
      {drawerValues?.type == "energy" ? (
        <EnergyDrawer
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
          drawerValues={drawerValues}
          selectedRows={selectedRows}
          outageData={outageData}
        />
      ) : null}
      {drawerValues?.formType !== "plansız" &&
      drawerValues?.type != "data" &&
      drawerValues?.type !== "energy" ? (
        <Drawer
          isOpen={isDrawerOpen}
          onClose={() => {
            setIsDrawerOpen(false);
          }}
          title={drawerValues?.title}
          hasFooter={true}
          size={"md"}
          closeBtnText={
            drawerValues?.type == "redirect-outage" ? "Vazgeç " : undefined
          }
        >
          {drawerValues?.type == "redirect-outage" ? (
            <RedirectOutage />
          ) : (
            <DrawerForms drawerValues={drawerValues} />
          )}
        </Drawer>
      ) : null}
      {drawerValues?.type == "data" ? (
        <DetailDrawerWrapper
          selectedRows={selectedRows}
          isDrawerOpen={isDrawerOpen}
          closeDrawer={() => {
            setIsDrawerOpen(false);
          }}
        />
      ) : null}
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
    </>
  );
};

export default OutageOperationSections;
