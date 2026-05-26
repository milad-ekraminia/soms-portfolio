import Drawer from "@/components/ui/drawer/drawer";
import Table from "@/components/ui/Table/table";
import { Button } from "@/components/ui/button/button";
import { Loader } from "@/components/ui/loader/loader";
import { ClearSvg } from "@/assets/icons/clear-svg";
import { NotificationModal } from "@/components/ui/notification/notification-modal/notification-modal";
import { useDispatch } from "react-redux";
import { openDrawer } from "@/store/app/drawer-slice";
import { setTableFilters } from "@/store/app/filter-slice";
import { useTranslation } from "react-i18next";
import { useTableColumns } from "@/hooks/use-table-columns";
import { useEffect, useState } from "react";

import { OutageItemType } from "@/types/components/pages/outage";
import { GlobalTableHeader } from "@/components/ui/global-header/global-header";
import { smsInterupttionColumns } from "@/helpers/data/outage/unPlanned/sms-interruption-table";
import { useTableFilters } from "@/hooks/use-table-filters";
import { useTableLogic } from "@/hooks/use-table-logic";
import { useFetchSmsInterruptioons } from "@/hooks/outage/unPlanned-outage";
import { SmsInterruptionModal } from "./sms-interruption-modal";
import { usePostSmsInterruption } from "@/hooks/outage/unPlanned-outage/use-post-sms-interruption";
import { useToast } from "@/providers/toast-provider";
interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
}
export const SmsInterruptionDrawer = ({ isOpen, onClose }: DrawerProps) => {
  const { t } = useTranslation();
  const tableName = "smsInterruptionTableDrawer";
  const dispatch = useDispatch();
  const { showToast } = useToast();

  const postSmsInterruption = usePostSmsInterruption();

  const [chosenValue, setChosenValue] = useState<number>();
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState(null);
  const [value, setValue] = useState(null);

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
  } = useTableLogic<any>({
    removeFilterByKey,
    onFilterClear,
    appliedFilters,
    fetchHook: useFetchSmsInterruptioons,
    getRowId: (item: any) => item.outageId,
  });

  useEffect(() => {
    setRefetchCallback(refetch);
  }, [refetch]);

  const handleIdClick = (rowData: OutageItemType) =>
    dispatch(
      openDrawer({
        title: "TBC524",
        type: "outage",
        id: rowData?.outageId,
        rowData,
      })
    );

  const { columnOrder, setColumnOrder, effectiveColumns } = useTableColumns({
    tableName,
    allColumns: smsInterupttionColumns(
      handleIdClick,
      t,
      tempFilters,
      setFilter
    ),
  });

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    setChosenValue(undefined);
    refetch();
  };

  const handleSortChange = (field: string, direction: "Asc" | "Desc") => {
    setSort({ field, direction });
    setPage(0);
  };

  const handlePerPageChange = (newSize: any) => {
    setPageSize(newSize);
  };

  const onFilterSubmit = () => {
    dispatch(setTableFilters({ table: tableName, filters: tempFilters }));
    setPage(0);
  };
  const submitForm = () => {
    postSmsInterruption.mutate(
      {
        status: status as any,
        notificationId: chosenValue as number,
        ...(value ? { description: value } : {}),
      },
      {
        onSuccess() {
          showToast("İşleminiz başarıyla gerçekleştirilmiştir.", "success");
          setShowModal(false);
          setValue(null);
          setStatus(null);
        },
      }
    );
  };
  return (
    <>
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={() => setShowModal(true)}
        title={"Plansız SMS Onay Bekleyen"}
        size="lg"
        disableSubmitButton={!chosenValue}
        submitBtnText="Seçiniz"
        closeBtnText="Vazgeç"
      >
        <div className="notification-interuptions-drawer-table">
          <div className="notification-interuptions-drawer-table__body">
            <Table
              data={data?.items ?? []}
              columns={effectiveColumns}
              isLoading={isLoading}
              renderLoading={() => <Loader />}
              maxHeight="600px"
              hasRadio
              selectedItem={chosenValue}
              setRadioSelect={setChosenValue}
              columnOrder={columnOrder}
              setColumnOrder={setColumnOrder}
              appliedFilters={appliedFilters}
              idKey="outageId"
              totalPagesProp={data?.totalPages}
              pageChangeHanlder={handlePageChange}
              setCurrentPage={setPage}
              currentPage={page}
              onFilterChange={onFilterChange}
              onFilterSubmit={onFilterSubmit}
              onFilterClear={onFilterClear}
              removeFilterByKey={removeTempFilterByKey}
              currentSort={sort}
              onSortChange={handleSortChange}
              totalCount={data?.totalCount}
              setPageSize={handlePerPageChange}
              pageSize={pageSize}
              headerChildren={
                <GlobalTableHeader
                  title="Onay Bekleyen Kesinti Listesi"
                  actions={
                    <>
                      {appliedFilters?.length > 0 ? (
                        <Button
                          variant="secondary-color"
                          onClick={tableWholeFilterClear}
                          leftIcon={
                            <ClearSvg
                              stroke={
                                appliedFilters?.length < 1
                                  ? "#98A2B3"
                                  : undefined
                              }
                            />
                          }
                          disabled={appliedFilters?.length < 1}
                        >
                          {appliedFilters?.length < 1
                            ? ""
                            : "Tüm Filtreleri Temizle"}
                        </Button>
                      ) : null}
                    </>
                  }
                />
              }
            />
          </div>
        </div>
      </Drawer>

      <NotificationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={() => submitForm()}
        onCancel={() => setShowModal(false)}
        title={`Kesinti Numarası: ${chosenValue}`}
        footerType="noIcon"
        submitButtonText={"Kaydet"}
        cancelButtonText="Vazgeç"
        disabled={status == null}
      >
        <SmsInterruptionModal
          status={status}
          setStatus={setStatus}
          value={value}
          setValue={setValue}
        />
      </NotificationModal>
    </>
  );
};
