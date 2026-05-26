import Table from "@/components/ui/Table/table";
import { districts, outagesCountColumns } from "@/helpers/data/dashboard";
import { useGetOutageByCityWithHourGroup } from "@/hooks/dashboard";
import { useState } from "react";
import DashboardMap from "../../map-graph/dashboard-map";
import DashboardTableHeader from "../dashboard-table-header";
import { useTableColumns } from "@/hooks/use-table-columns";
import { CityOutage, DistrictOutage } from "@/types/components/pages/dashboard";

const outageLegendItems = [
  { label: "Kesinti Yok", color: "var(--utility-gray-100)" },
  { label: "0-1 saat", color: "var(--utility-brand-100)" },
  { label: "1-2 saat", color: "var(--utility-brand-200)" },
  { label: "2-5 saat", color: "var(--utility-warning-200)" },
  { label: "5-10 saat", color: "var(--utility-warning-400)" },
  { label: "+10 saat", color: "var(--utility-error-400)" },
];

const OutagesContent = () => {
  const [provinceValue, setProvinceValue] = useState<number>(10);
  const [cityValue, setCityValue] = useState(-1);

  const { data, isLoading } = useGetOutageByCityWithHourGroup();

  const province = districts.find((elem) => elem.value === provinceValue);

  let filteredList: CityOutage[] | DistrictOutage[] = [];

  if (provinceValue !== 10 && provinceValue > 0) {
    filteredList =
      data?.find((city) => city.city === province?.id)?.districts ?? [];
  } else {
    filteredList = data ?? [];
  }

  // Narrow before using
  if (cityValue !== -1) {
    if (provinceValue > 0) {
      // filteredList is DistrictOutage[]
      filteredList = (filteredList as DistrictOutage[]).filter(
        (district: any) => district?.district == cityValue
      );
    } else {
      // filteredList is CityOutage[]
      filteredList = (filteredList as CityOutage[]).filter(
        (city: any) => city.city === cityValue
      );
    }
  }
  const isDistrictView = provinceValue != 10 && provinceValue > 0;
  
  const { columnOrder, setColumnOrder, effectiveColumns } = useTableColumns({
    tableName: "dashboardOutageTable",
    allColumns: outagesCountColumns({ isDistrict: isDistrictView }),
  });

 return (
    <>
      <DashboardMap
        legendItems={outageLegendItems}
        isLoading={isLoading}
        data={data}
        title="Kesinti Sürelerine Göre Toplam Kesinti Sayısı"
      />
      <Table
        data={
          provinceValue === 10
            ? filteredList?.map((elem: any, index: number) => ({
                ...elem,
                id: index + 1,
                name: elem?.city,
                period0:
                  elem?.hoursGroups?.find(
                    (elem: { durationGroup: string; count: number }) =>
                      elem?.durationGroup === "0-1"
                  )?.count ?? 0,
                period1:
                  elem?.hoursGroups?.find(
                    (elem: { durationGroup: string; count: number }) =>
                      elem?.durationGroup === "1-2"
                  )?.count ?? 0,
                period2:
                  elem?.hoursGroups?.find(
                    (elem: { durationGroup: string; count: number }) =>
                      elem?.durationGroup === "2-5"
                  )?.count ?? 0,
                period5:
                  elem?.hoursGroups?.find(
                    (elem: { durationGroup: string; count: number }) =>
                      elem?.durationGroup === "5-10"
                  )?.count ?? 0,
                period10:
                  elem?.hoursGroups?.find(
                    (elem: { durationGroup: string; count: number }) =>
                      elem?.durationGroup === "10+"
                  )?.count ?? 0,
                children: elem?.districts?.map((child: any, index: number) => ({
                  ...child,
                  id: index + 1,
                  name: child?.district,
                  period0:
                    child?.outages?.find(
                      (elem: { durationGroup: string; count: number }) =>
                        elem?.durationGroup === "0-1"
                    )?.totalOutages ?? 0,
                  period1:
                    child?.outages?.find(
                      (elem: { durationGroup: string; count: number }) =>
                        elem?.durationGroup === "1-2"
                    )?.totalOutages ?? 0,
                  period2:
                    child?.outages?.find(
                      (elem: { durationGroup: string; count: number }) =>
                        elem?.durationGroup === "2-5"
                    )?.totalOutages ?? 0,
                  period5:
                    child?.outages?.find(
                      (elem: { durationGroup: string; count: number }) =>
                        elem?.durationGroup === "5-10"
                    )?.totalOutages ?? 0,
                  period10:
                    child?.outages?.find(
                      (elem: { durationGroup: string; count: number }) =>
                        elem?.durationGroup === "10+"
                    )?.totalOutages ?? 0,
                })),
              })) ?? []
            : filteredList?.map((child: any, index: number) => ({
                ...child,
                id: index + 1,
                name: child?.district,
                period0:
                  child?.outages?.find(
                    (elem: { durationGroup: string; count: number }) =>
                      elem?.durationGroup === "0-1"
                  )?.totalOutages ?? 0,
                period1:
                  child?.outages?.find(
                    (elem: { durationGroup: string; count: number }) =>
                      elem?.durationGroup === "1-2"
                  )?.totalOutages ?? 0,
                period2:
                  child?.outages?.find(
                    (elem: { durationGroup: string; count: number }) =>
                      elem?.durationGroup === "2-5"
                  )?.totalOutages ?? 0,
                period5:
                  child?.outages?.find(
                    (elem: { durationGroup: string; count: number }) =>
                      elem?.durationGroup === "5-10"
                  )?.totalOutages ?? 0,
                period10:
                  child?.outages?.find(
                    (elem: { durationGroup: string; count: number }) =>
                      elem?.durationGroup === "10+"
                  )?.totalOutages ?? 0,
              })) ?? []
        }
        columns={effectiveColumns}
        columnOrder={columnOrder}
        setColumnOrder={setColumnOrder}
        isLoading={isLoading}
        hasPagination={false}
        renderLoading={() => <div>Loading...</div>}
        maxHeight="320px"
        headerChildren={
          <DashboardTableHeader
            provinceValue={provinceValue}
            setProvinceValue={setProvinceValue}
            cityValue={cityValue}
            setCityValue={setCityValue}
            data={data}
            title="İllere Göre Kesinti"
          />
        }
      />
    </>
  );
};

export default OutagesContent;
