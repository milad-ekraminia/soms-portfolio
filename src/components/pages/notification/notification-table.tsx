import { Loader } from "@/components/ui/loader/loader";
import Table from "@/components/ui/Table/table";
import { notificationColumns as notificationColumnsConfig } from "@/helpers/data/notification";
import { useNotificationOperations } from "@/hooks/use-notification-action";
import { openDrawer } from "@/store/app/drawer-slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./notification.scss";
import NotificationTableHeader from "./table-header/notification-table-header";
import NotificationOperationsContent from "./table-header/operations/notification-operations-content";
import NotificationOperationsSections from "./table-header/operations/notification-operations-sections";
import { useTranslation } from "react-i18next";
import { useTableFilters } from "@/hooks/use-table-filters";
import { setTableFilters } from "@/store/app/filter-slice";
import { setOrder, setSelected } from "@/store/app/columns-slice";
import { useContextMenu } from "@/hooks/use-context-menu";
import { useNotifcation } from "@/hooks/notifications";
import { useTableLogic } from "@/hooks/use-table-logic";
import { NotificationItemType } from "@/types/components/pages/notification";
import { useTableColumns } from "@/hooks/use-table-columns";
import { GlobalTableHeader } from "@/components/ui/global-header/global-header";

const NotificationTable = () => {
  const tableName = "notification";
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
    isPending,
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
    fetchHook: useNotifcation,
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
  const handleIdClick = (rowData: any) => {
    dispatch(
      openDrawer({
        title: "TBC524",
        type: "notification",
        id: rowData?.notificationId,
        rowData: rowData,
      }),
    );
  };
  const {
    selectedColumnKeys,
    setSelectedColumnKeys,
    columnOrder,
    setColumnOrder,
    effectiveColumns,
  } = useTableColumns({
    tableName: "notificationTable",
    allColumns: notificationColumnsConfig(
      handleIdClick,
      t,
      tempFilters,
      setFilter,
    ),
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
          isLoading={isLoading || isPending}
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
              left: contextMenu.x,
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

export default NotificationTable;
