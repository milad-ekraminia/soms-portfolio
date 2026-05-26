import { ListSvg } from "@/assets/icons/list-svg";
import { Button } from "@/components/ui/button/button";
import { DropdownWrapper } from "@/components/ui/dropdown/dropdown-wrapper/drop-down-wrapper";

import { useNotificationOperations } from "@/hooks/use-notification-action";
import NotificationOperationsContent from "./notification-operations-content";
import NotificationOperationsSections from "./notification-operations-sections";

interface OperationsProps {
  selectedRows?: number[];
  data: any;
}
export const NotificationOperations = ({
  selectedRows = [],
  data,
}: OperationsProps) => {
  const {
    isModalOpen,
    isDrawerOpen,
    isDetailsDrawerOpen,
    tableDrawer,
    forwardDrawer,
    drawerValues,
    cancelationStep,
    seperateInterruptionShow,
    handleCancel,
    handleCloseModal,
    handleConfirm,
    optionsHandler,
    setIsDrawerOpen,
    setIsDetailsDrawerOpen,
    setTableDrawer,
    setForwardDrawer,
    setSeperateInterruptionShow,
  } = useNotificationOperations();
  return (
    <>
      <DropdownWrapper
        title={
          <div className="operation-title">
            <span>Operasyonlar</span>
            <div className="operation-title-amount">
              {selectedRows?.length > 0 ? selectedRows?.length : ""} Bildirim
            </div>
          </div>
        }
        toggleBtn={
          <Button onClick={() => {}} variant="secondary" leftIcon={<ListSvg />}>
            <span>Operasyonlar</span>
          </Button>
        }
        closeButton={true}
        leftOffset="-100px"
      >
        <NotificationOperationsContent
          optionsHandler={optionsHandler}
          selectedRows={selectedRows}
          data={data}
        />
      </DropdownWrapper>
      <NotificationOperationsSections
        selectedRows={selectedRows}
        isModalOpen={isModalOpen}
        isDrawerOpen={isDrawerOpen}
        isDetailsDrawerOpen={isDetailsDrawerOpen}
        tableDrawer={tableDrawer}
        forwardDrawer={forwardDrawer}
        drawerValues={drawerValues}
        setIsDrawerOpen={setIsDrawerOpen}
        setIsDetailsDrawerOpen={setIsDetailsDrawerOpen}
        setTableDrawer={setTableDrawer}
        setForwardDrawer={setForwardDrawer}
        cancelationStep={cancelationStep}
        handleCancel={handleCancel}
        handleConfirm={handleConfirm}
        handleCloseModal={handleCloseModal}
        notifData={data}
        seperateInterruptionShow={seperateInterruptionShow}
        setSeperateInterruptionShow={setSeperateInterruptionShow}
      />
    </>
  );
};
