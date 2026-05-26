import Table from "@/components/ui/Table/table";
import { districts, notificationCountColumns } from "@/helpers/data/dashboard";
import { useNotificationSourceSystemCount } from "@/hooks/dashboard";
import { useState } from "react";
import DashboardMap from "../../map-graph/dashboard-map";
import DashboardTableHeader from "../dashboard-table-header";
import { useTableColumns } from "@/hooks/use-table-columns";
import { DataProps, DistrictsProps } from "@/types/components/pages/dashboard";

const outageLegendItems = [
  { label: "Bildirim Yok", color: "var(--utility-gray-100)" },
  { label: "0-100", color: "var(--utility-brand-100)" },
  { label: "100 - 1K", color: "var(--utility-brand-200)" },
  { label: "1K - 2K", color: "var(--utility-warning-200)" },
  { label: "2K - 5K", color: "var(--utility-warning-400)" },
  { label: "5K+", color: "var(--utility-error-400)" },
];

const NotificationsContent = () => {
  const [provinceValue, setProvinceValue] = useState<number>(10);
  const [cityValue, setCityValue] = useState<any>(-1);

  const { data, isLoading } = useNotificationSourceSystemCount();

  const province = districts.find((elem) => elem.value === provinceValue);
  let filteredList: any;

  if (provinceValue != 10 && provinceValue > 0) {
    const selectedCity = data?.find((elem) => elem.city === province?.id);
    filteredList = selectedCity?.districts; // DistrictsProps[]
  } else {
    filteredList = data; // DataProps[]
  }

  if (cityValue !== -1 && Array.isArray(filteredList)) {
    // If we're in the districts case, `district` exists
    if ((filteredList as DistrictsProps[])[0]?.district) {
      filteredList = (filteredList as DistrictsProps[]).filter(
        (elem) => elem.district === cityValue,
      );
    }
  }
  const isDistrictView = provinceValue != 10 && provinceValue > 0;

  const { columnOrder, setColumnOrder, effectiveColumns } = useTableColumns({
    tableName: "dashboardNotificationTable",
    allColumns: notificationCountColumns({ isDistrict: isDistrictView }),
  });
  return (
    <>
      <DashboardMap
        title="Bildirim Sürelerine Göre Toplam Bildirim Sayısı"
        legendItems={outageLegendItems}
        isLoading={isLoading}
        data={data as DataProps[]}
      />
      <Table
        data={
          provinceValue === 10
            ? (filteredList?.map((elem: any, index: number) => ({
                ...elem,
                id: index + 1,
                name: elem?.city,
                children: elem?.districts?.map((child: any, index: number) => ({
                  ...child,
                  id: index + 1,
                  name: child?.district,
                })),
              })) ?? [])
            : (filteredList?.map((child: any, index: number) => ({
                ...child,
                id: index + 1,
                name: child?.district,
              })) ?? [])
        }
        columns={effectiveColumns}
        columnOrder={columnOrder}
        setColumnOrder={setColumnOrder}
        isLoading={isLoading}
        renderLoading={() => <div>Loading...</div>}
        maxHeight="320px"
        hasPagination={false}
        headerChildren={
          <DashboardTableHeader
            provinceValue={provinceValue}
            setProvinceValue={setProvinceValue}
            cityValue={cityValue}
            setCityValue={setCityValue}
            data={data}
            title="Bildirim Kaynak Sistem Sayısı"
          />
        }
      />
    </>
  );
};

export default NotificationsContent;
