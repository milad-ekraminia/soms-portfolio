import { ListSvg } from "@/assets/icons/list-svg";
import { Button } from "@/components/ui/button/button";
import { DropdownWrapper } from "@/components/ui/dropdown/dropdown-wrapper/drop-down-wrapper";

import { useOutageActions } from "@/hooks/use-outage-actions";
import OutageOperationContent from "./outage-operation-content";
import OutageOperationSections from "./outage-operations-sections";

interface OperationsProps {
  selectedRows?: number[];
  outageData: any;
}
export const OutageOperations = ({
  selectedRows = [],
  outageData,
}: OperationsProps) => {
  const {
    isModalOpen,
    treeChartModal,
    modalSize,
    cancelationStep,
    modalValues,
    isDrawerOpen,
    drawerValues,
    closeDrawer,
    modalSizeHanlder,
    handleCancel,
    handleCloseModal,
    handleConfirm,
    optionsHandler,
    setDrawerValues,
    setIsDrawerOpen,
  } = useOutageActions();
  return (
    <>
      <DropdownWrapper
        title={
          <div className="operation-title">
            <span>Operasyonlar</span>
            <div className="operation-title-amount">
              {selectedRows?.length > 0 ? selectedRows?.length : ""} Kesinti
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
        <OutageOperationContent
          optionsHandler={optionsHandler}
          selectedRows={selectedRows}
          setDrawerValues={setDrawerValues}
          setIsDrawerOpen={setIsDrawerOpen}
          isDrawerOpen={isDrawerOpen}
          outageData={outageData}
        />
      </DropdownWrapper>
      <OutageOperationSections
        selectedRows={selectedRows}
        isModalOpen={isModalOpen}
        isDrawerOpen={isDrawerOpen}
        treeChartModal={treeChartModal}
        drawerValues={drawerValues}
        modalValues={modalValues}
        modalSize={modalSize}
        setIsDrawerOpen={setIsDrawerOpen}
        handleCloseModal={handleCloseModal}
        handleConfirm={handleConfirm}
        handleCancel={handleCancel}
        modalSizeHanlder={modalSizeHanlder}
        closeDrawer={closeDrawer}
        cancelationStep={cancelationStep}
        outageData={outageData}
      />
    </>
  );
};
