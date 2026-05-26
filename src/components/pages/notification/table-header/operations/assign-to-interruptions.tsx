import Drawer from "@/components/ui/drawer/drawer";
import Table from "@/components/ui/Table/table";
import { Button } from "@/components/ui/button/button";
import { Loader } from "@/components/ui/loader/loader";
import { ClearSvg } from "@/assets/icons/clear-svg";
import { NotificationModal } from "@/components/ui/notification/notification-modal/notification-modal";
import InteruptionsNotification from "./interuptions-notification";
import { useDispatch, useSelector } from "react-redux";
import { openDrawer } from "@/store/app/drawer-slice";
import { setTableFilters } from "@/store/app/filter-slice";
import { useTranslation } from "react-i18next";
import { assignInterupttionColumns } from "@/helpers/data/assign-interruption-columns";
import { useTableColumns } from "@/hooks/use-table-columns";
import { useState } from "react";
import {
  useAssignToInterruptionHandler,
  useAssignToInterruptionTableLogic,
} from "@/hooks/notifications/use-assign-to-interruption";
import { NotificationSummaryText } from "@/helpers/notification-summary-text";
import { OutageItemType } from "@/types/components/pages/outage";
import { useAssignToInterruption } from "@/hooks/notifications";
interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedRows: any;
  drawerValues?: { title: string; type: string };
}
export const AssignToInterruption = ({
  isOpen,
  onClose,
  drawerValues,
  selectedRows,
}: DrawerProps) => {
  const { t } = useTranslation();
  const tableName = "assignToInterruptionTableDrawer";
  const { isOpen: isDrawerOpen } = useSelector((state: any) => state?.drawer);

  const dispatch = useDispatch();
  const { appliedFilters, ...table } = useAssignToInterruptionTableLogic(
    tableName,
    isOpen
  );
  const [chosenValue, setChosenValue] = useState<number>();
  const [showModal, setShowModal] = useState(false);
  const { handleAssign, mutation } = useAssignToInterruptionHandler(
    selectedRows,
    onClose,
    () => setShowModal(false)
  );

  const handleIdClick = (rowData: OutageItemType) => {
    if (!isDrawerOpen) {
      dispatch(
        openDrawer({
          title: "TBC524",
          type: "outage",
          id: rowData?.outageId,
          rowData,
        })
      );
    }
  };
  const handleIdClickNotification = (type: string, id: number) => {
    if (!isDrawerOpen) {
      dispatch(
        openDrawer({
          title: "TBC524",
          type,
          id: id,
          rowData: id,
        })
      );
      setShowModal(false);
    }
  };
  const { columnOrder, setColumnOrder, effectiveColumns } = useTableColumns({
    tableName,
    allColumns: assignInterupttionColumns(
      handleIdClick,
      t,
      table.tempFilters,
      table.setFilter
    ),
  });

  const handlePageChange = (newPage: number) => {
    table?.setPage(newPage);
    setChosenValue(undefined);
    table?.refetch();
  };

  const handleSortChange = (field: string, direction: "Asc" | "Desc") => {
    table?.setSort({ field, direction });
    table?.setPage(0);
  };

  const handlePerPageChange = (newSize: any) => {
    table?.setPageSize(newSize);
  };

  const onFilterSubmit = () => {
    dispatch(
      setTableFilters({ table: tableName, filters: table?.tempFilters })
    );
    table?.setPage(0);
  };
  const {
    data: assignModalData,
    isLoading: assignModalLoading,
    isPending: assignModalPending,
  } = useAssignToInterruption({
    notificationsId: selectedRows,
    outageId: chosenValue,
  });


  return (
    <>
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={() => setShowModal(true)}
        title={drawerValues?.title}
        size="lg"
        disableSubmitButton={!chosenValue}
      >
        <div className="notification-interuptions-drawer-table">
          <div className="notification-interuptions-drawer-table__header">
            <span className="notification-interuptions-drawer-table__header-title">
              Aktif Kesintiler
            </span>
            <Button
              variant="secondary-color"
              onClick={table.tableWholeFilterClear}
              leftIcon={
                <ClearSvg
                  stroke={appliedFilters?.length < 1 ? "#98A2B3" : undefined}
                />
              }
              disabled={!appliedFilters?.length}
            >
              {appliedFilters?.length ? "Tüm Filtreleri Temizle" : ""}
            </Button>
          </div>
          <div className="notification-interuptions-drawer-table__body">
            <Table
              {...table}
              data={table.data?.items ?? []}
              columns={effectiveColumns}
              isLoading={table.isLoading}
              renderLoading={() => <Loader />}
              maxHeight="600px"
              hasRadio
              selectedItem={chosenValue}
              setRadioSelect={setChosenValue}
              idKey={drawerValues?.type == "ata" ? "outageId" : undefined}
              columnOrder={columnOrder}
              setColumnOrder={setColumnOrder}
              onFilterSubmit={onFilterSubmit}
              totalCount={table.data?.totalCount || 0}
              appliedFilters={appliedFilters}
              onFilterChange={table?.setFilter}
              onFilterClear={table?.clearFilters}
              removeFilterByKey={table?.removeTempFilterByKey}
              onSortChange={handleSortChange}
              currentSort={table?.sort}
              pageSize={table?.pageSize}
              setPageSize={handlePerPageChange}
              pageChangeHanlder={handlePageChange}
              totalPagesProp={table?.data?.totalPages}
            />
          </div>
        </div>
      </Drawer>

      <NotificationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={() => handleAssign(chosenValue!)}
        onCancel={() => setShowModal(false)}
        title={drawerValues?.title ?? ""}
        footerType="confirmationNotif"
        submitButtonText={"Onayla"}
        cancelButtonText="Vazgeç"
        disabled={
          assignModalLoading ||
          assignModalPending ||
          mutation.isPending
        }
      >
        <InteruptionsNotification
          text={
            <NotificationSummaryText
              selectedRows={selectedRows}
              chosenValue={chosenValue}
              onIdClick={handleIdClickNotification}
              isAssignable
            />
          }
          data={assignModalData}
          isLoading={
            mutation.isPending || assignModalLoading || assignModalPending
          }
          selectedRows={selectedRows}
          chosenValue={chosenValue}
          onIdClick={handleIdClickNotification}
        />
      </NotificationModal>
    </>
  );
};
