import Drawer from "@/components/ui/drawer/drawer";
import { DateDrawerForm } from "./date-drawer-form";
import { AlertSvg } from "@/assets/icons/alert-svg";
import { useForm } from "react-hook-form";
import { dateFields } from "@/types/components/pages/outage/unPlanned/edit-date";
import { yupResolver } from "@hookform/resolvers/yup";
import { editDateSchema } from "@/validations/outage/unplanned-outage/edit-date";
import {
  usePostDateChange,
  useDateChangeNotificationImpact,
} from "@/hooks/outage/unPlanned-outage/use-post-date-change";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { FilterItem, setTableFilters } from "@/store/app/filter-slice";
import { useTableFilters } from "@/hooks/use-table-filters";
import { useTableLogic } from "@/hooks/use-table-logic";
import { useTableColumns } from "@/hooks/use-table-columns";
import { ClockSvg } from "@/assets/icons/clock-svg";
import Table from "@/components/ui/Table/table";
import { Loader } from "@/components/ui/loader/loader";
import { GlobalTableHeader } from "@/components/ui/global-header/global-header";
import { Button } from "@/components/ui/button/button";
import { ClearSvg } from "@/assets/icons/clear-svg";
import { dateChangeTabColumn } from "@/helpers/data/outage";
import { useTranslation } from "react-i18next";
import { openDrawer } from "@/store/app/drawer-slice";
import { useToast } from "@/providers/toast-provider";

interface EditDateDrawerProps {
  data: any;
  isOpen: boolean;
  onClose: () => void;
}
export const EditDateDrawer = ({
  data,
  isOpen,
  onClose,
}: EditDateDrawerProps) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { showToast } = useToast();

  const tableName = "unPlannedOutageChangeDatess";
const [formValues, setFormValues] = useState<{
  startDateTime?: string;
  endDateTime?: string;
  description?: string;
}>({});
  const postDateChange = usePostDateChange();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<dateFields>({
    resolver: yupResolver(editDateSchema),
    defaultValues: {
      startDateTime:
        data?.startDateTime === "0001-01-01T00:00:00"
          ? ""
          : data?.startDateTime ?? "",
      endDateTime:
        data?.endDateTime === "0001-01-01T00:00:00"
          ? ""
          : data?.endDateTime ?? "",
      description: "",
    },
  });
  const formSubmit = (values: dateFields) => {
    const { description, ...rest } = values;
    setFormValues({
      ...rest,
      ...(description ? { description } : {}),
    });
  };
  // table data

  // --- Filters ---
  const {
    filters: appliedFilters,
    setFilter: onFilterChange,
    removeFilterByKey,
    clearFilters: onFilterClear,
    setRefetchCallback,
  } = useTableFilters(tableName);

  // --- Table logic ---
  function useFetchDateChangeNotificationImpact(
    page: number,
    pageSize: number,
    filters: FilterItem[],
    sort: any
  ) {
    return useDateChangeNotificationImpact({
      page,
      pageSize,
      outageId: data?.outageId,
      appliedFilters: filters,
      dataParams: formValues,
      // dataParams: {
      //   startDateTime: "2025-11-09 01:14",
      //   endDateTime: "2025-11-09 01:15",
      // },
      enabledFetch:
        !!isOpen && !!formValues?.startDateTime && !!formValues?.endDateTime,
      sorting: sort,
    });
  }

  const {
    data: tableData,
    isLoading,
    refetch,
    page,
    setPage,
    pageSize,
    setPageSize,
    tempFilters,
    setFilter,
    removeTempFilterByKey,
    tableWholeFilterClear,
    sort,
    setSort,
  } = useTableLogic({
    removeFilterByKey,
    onFilterClear,
    appliedFilters,
    fetchHook: useFetchDateChangeNotificationImpact,
    getRowId: (item: any) => item.id,
  });
  const handleIdClick = (rowData: any) => {
    dispatch(
      openDrawer({
        title: "TBC524",
        type: "notification",
        id: rowData?.notificationId,
        rowData: rowData,
      })
    );
  };
  const devicesTableColumn = dateChangeTabColumn(
    handleIdClick,
    t,
    setFilter,
    tempFilters
  );

  const { columnOrder, setColumnOrder, effectiveColumns } = useTableColumns({
    tableName,
    allColumns: devicesTableColumn,
  });

  useEffect(() => {
    setRefetchCallback(refetch);
  }, [refetch]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    refetch();
  };

  const handlePerPageChange = (newSize: any) => {
    setPageSize(newSize);
  };

  const onFilterSubmit = () => {
    dispatch(setTableFilters({ table: tableName, filters: tempFilters }));
    setPage(0);
  };
  const handleSortChange = (field: string, direction: "Asc" | "Desc") => {
    setSort({ field, direction });
    setPage(0);
  };
  const submitChanges = () => {
    postDateChange.mutate(
      {
        outageId: data?.outageId,
        dataParams: {
          ...formValues,
        },
      },
      {
        onSuccess: (data) => {
          const { responseMessage, responseStatusCode } = data ?? {};
          if (responseStatusCode === 600) {
            showToast(responseMessage, "success");
          } else {
            showToast(
              responseMessage ?? "İşleminiz başarıyla gerçekleştirilmiştir.",
              "success"
            );
          }
          onClose();
        },
        onError: (error: any) => {
          const responseMessage =
            error?.response?.data?.responseMessage ?? "İşlem Başarısız"; // Fallback message

          showToast(responseMessage, "error");
          onClose();
        },
      }
    );
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={"Kesinti Zamanının Güncellenmesi"}
      onSubmit={submitChanges}
      submitBtnText="Değişiklikleri Onayla"
      closeBtnText="İptal"
    >
      <div className="date-drawer">
        <div className="date-drawer__info">
          <div className="header">
            <AlertSvg width="20" height="20" stroke="#1570EF" />
            <span>Önemli Uyarı</span>
          </div>
          <div className="body">
            <span>
              Kesinti sürelerini değiştirmek kesintiye bağlı bildirimleri
              değiştirebileceğinden onaylamadan önce mutlaka etkilenecek
              bildirimler listesini gözden geçirin.
            </span>
          </div>
        </div>
        <DateDrawerForm
          control={control}
          errors={errors}
          onClick={handleSubmit(formSubmit)}
        />
        {!!formValues?.startDateTime && !!formValues?.endDateTime ? (
          <div className="date-drawer__detail">
            <div className="time-difference">
              <ClockSvg stroke="#079455" />
              <div className="data">
                <span className="title">Yeni Süre:</span>
                <span className="value">
                  {tableData?.extraProperties?.DurationInHours ?? 0} saat
                </span>
              </div>
            </div>
            <div className="date-drawer__table">
              <Table
                data={tableData?.items ?? []}
                columns={effectiveColumns}
                isLoading={isLoading}
                renderLoading={() => <Loader />}
                maxHeight="400px"
                totalPagesProp={tableData?.totalPages}
                setCurrentPage={setPage}
                currentPage={page}
                pageChangeHanlder={handlePageChange}
                columnOrder={columnOrder}
                setColumnOrder={setColumnOrder}
                totalCount={tableData?.totalCount ?? 0}
                setPageSize={handlePerPageChange}
                pageSize={pageSize}
                appliedFilters={appliedFilters}
                onFilterChange={onFilterChange}
                onFilterSubmit={onFilterSubmit}
                onFilterClear={onFilterClear}
                removeFilterByKey={removeTempFilterByKey}
                headerChildren={
                  <GlobalTableHeader
                    title="Kesintiden Ayırılacak Bildirimler Listesi"
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
                currentSort={sort}
                onSortChange={handleSortChange}
              />
            </div>
            {tableData?.totalCount ? (
              <div className="table-detail">
                <AlertSvg stroke="#DC6803" width="20" height="20" />
                <span>
                  Bu kesinti saati değişikliği,kesintiye bağlı{" "}
                  {tableData?.totalCount}
                  bildirimi etkileyecektir.
                </span>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </Drawer>
  );
};
