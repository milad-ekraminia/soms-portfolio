import NotificationTableHeader from "@/components/pages/notification/table-header/notification-table-header";
import NotificationOperationsContent from "@/components/pages/notification/table-header/operations/notification-operations-content";
import NotificationOperationsSections from "@/components/pages/notification/table-header/operations/notification-operations-sections";
import { GlobalTableHeader } from "@/components/ui/global-header/global-header";
import { Loader } from "@/components/ui/loader/loader";
import Table from "@/components/ui/Table/table";
import { notificationColumns as notificationColumnsConfig } from "@/helpers/data/notification";
import { NOTIFICATION_OPERATIONS_PERMISSIONS_ARRAY } from "@/helpers/permissions/notification";
import {
  useOutageDetailNotifications,
  useOutageDetailWithOutage,
} from "@/hooks/outage/use-get-detail-drawer";
import { usePermissions } from "@/hooks/permissions/use-permissions";
import { useContextMenu } from "@/hooks/use-context-menu";
import { useNotificationOperations } from "@/hooks/use-notification-action";
import { useTableColumns } from "@/hooks/use-table-columns";
import { useTableFilters } from "@/hooks/use-table-filters";
import { useTableLogic } from "@/hooks/use-table-logic";
import { setOrder, setSelected } from "@/store/app/columns-slice";
import { FilterItem, setTableFilters } from "@/store/app/filter-slice";
import { NotificationItemType } from "@/types/components/pages/notification";
import { OutageNodeDetail } from "@/types/components/pages/ogss/ogss";
import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

export const DetailNotifications = ({
  chosenRows,
  drawerType,
  detailData,
}: {
  chosenRows: any;
  drawerType: "outage" | "plannedOutage";
  detailData: any;
}) => {
  const { data: outageData, isLoading: outageLoading } =
    useOutageDetailWithOutage({
      outageId: detailData?.data?.outageId,
      forceEnabled:
        !!detailData?.data?.outageId &&
        detailData?.data?.outageId > 0 &&
        drawerType == "plannedOutage",
    });

  function useFetchOutageDetailCombinedDeductions(
    page: number,
    pageSize: number,
    filters: FilterItem[],
    sorting?: { field: string; direction: "Asc" | "Desc" } | null
  ) {
    return useOutageDetailNotifications({
      page,
      pageSize,
      outageId:
        drawerType == "plannedOutage"
          ? (outageData as OutageNodeDetail)?.outageId
          : chosenRows,
      appliedFilters: filters,
      sorting,
    });
  }
  const { hasAnyPermission } = usePermissions();

  const tableName = "notificationDetailDrawer";
  const {
    filters: appliedFilters,
    setFilter: onFilterChange,
    clearFilters: onFilterClear,
    removeFilterByKey,
    setRefetchCallback,
  } = useTableFilters(tableName);
  const {
    data,
    isLoading,
    refetch,
    selectedRows,
    toggleSelectRow,
    setSelectedRows,
    page,
    setPage,
    pageSize,
    setPageSize,
    tempFilters,
    setFilter,
    removeTempFilterByKey,
    sort,
    setSort,
    tableWholeFilterClear,
  } = useTableLogic<NotificationItemType>({
    removeFilterByKey,
    onFilterClear,
    appliedFilters,
    fetchHook: useFetchOutageDetailCombinedDeductions,
    getRowId: (item) => item.notificationId,
  });
  const { contextMenu, contextMenuRef, openContextMenu, closeContextMenu } =
    useContextMenu({ selectedRows, setSelectedRows });
  const { t } = useTranslation();
  const dispatch = useDispatch();
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
  const {
    selectedColumnKeys,
    setSelectedColumnKeys,
    columnOrder,
    setColumnOrder,
    effectiveColumns,
  } = useTableColumns({
    tableName: "notificationTable",
    allColumns: notificationColumnsConfig(() => {}, t, tempFilters, setFilter),
  });
  useEffect(() => {
    setRefetchCallback(refetch);
  }, [refetch]);

  useEffect(() => {
    dispatch(setOrder({ table: tableName, order: columnOrder }));
  }, [columnOrder]);

  useEffect(() => {
    dispatch(setSelected({ table: tableName, selected: selectedColumnKeys }));
  }, [selectedColumnKeys]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    setSelectedRows([]);
    refetch(); // ✅ manual refetch on page change
  };
  const handleSortChange = (field: string, direction: "Asc" | "Desc") => {
    setSort({ field, direction });
    setPage(0);
  };
  const handlePerPageChange = (newPage: any) => {
    setPageSize(newPage);
  };

  const onFilterSubmit = () => {
    dispatch(setTableFilters({ table: tableName, filters: tempFilters }));
    setPage(0); // reset page
  };

  const hasOperationsPermission = useMemo(() => {
    // Return false if none of the permissions are granted
    return hasAnyPermission(NOTIFICATION_OPERATIONS_PERMISSIONS_ARRAY);
  }, [hasAnyPermission]);
  return (
    <>
      <div
        onContextMenu={(event) => openContextMenu(event)}
        onClick={closeContextMenu}
        className="notification-main-table"
        onKeyDown={(event) => {
          if (event.key === "Escape") closeContextMenu(event);
        }}
        onBlur={closeContextMenu}
      >
        <Table
          data={data?.items ?? []}
          columns={effectiveColumns}
          isLoading={isLoading  || outageLoading}
          renderLoading={() => <Loader />}
          maxHeight="600px"
          columnOrder={columnOrder}
          setColumnOrder={setColumnOrder}
          headerChildren={
            <GlobalTableHeader
              title="Bildirimler Listesi"
              actions={
                <NotificationTableHeader
                  selectedRows={selectedRows}
                  setSelectedColumnKeys={setSelectedColumnKeys}
                  selectedColumnKeys={selectedColumnKeys}
                  columnOrder={columnOrder}
                  setColumnOrder={setColumnOrder}
                  data={data?.items ?? []}
                  onFilterClear={tableWholeFilterClear}
                  appliedFilters={appliedFilters}
                  showOperations={hasOperationsPermission}
                />
              }
            />
          }
          selectRowsHandler={toggleSelectRow}
          hasCheckbox
          selectedRows={selectedRows}
          handleContextMenu={openContextMenu}
          idKey="notificationId"
          totalPagesProp={data?.totalPages}
          setCurrentPage={setPage}
          currentPage={page}
          pageChangeHanlder={handlePageChange}
          appliedFilters={appliedFilters}
          onFilterChange={onFilterChange}
          onFilterSubmit={onFilterSubmit}
          onFilterClear={onFilterClear}
          removeFilterByKey={removeTempFilterByKey}
          currentSort={sort}
          onSortChange={handleSortChange}
          totalCount={data?.totalCount}
          setPageSize={handlePerPageChange}
          pageSize={pageSize}
        />
        {contextMenu && (
          <div
            style={{
              position: "absolute",
              top: contextMenu.y,
              left: contextMenu.x - 470,
              background: "var(--bg-primary)",
              boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
              padding: "8px",
              zIndex: 1000,
              borderRadius: "12px",
              maxHeight: "420px",
              overflowY: "auto",
              minWidth: "330px",
            }}
            ref={contextMenuRef}
          >
            <NotificationOperationsContent
              optionsHandler={optionsHandler}
              selectedRows={selectedRows}
              data={data?.items ?? []}
            />
          </div>
        )}
      </div>
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
        seperateInterruptionShow={seperateInterruptionShow}
        setSeperateInterruptionShow={setSeperateInterruptionShow}
        notifData={data?.items ?? []}
      />
    </>
  );
};
