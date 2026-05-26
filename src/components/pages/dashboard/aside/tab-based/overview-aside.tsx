import React, { useEffect, useState } from "react";
const AreaChart = React.lazy(() => import("@/components/ui/charts/area-chart"));
const DonutChart = React.lazy(
  () => import("@/components/ui/charts/donut-chart"),
);
import SelectInput from "@/components/ui/input/select-input/select-input";
import Toggle from "@/components/ui/input/toggle-button/Toggle";
import { Loader } from "@/components/ui/loader/loader";
import { districts, type District } from "@/helpers/data/dashboard";
import { useAsideChartApi } from "@/hooks/dashboard";
import { useTabContext } from "@/providers/dashboard-tabs/tabs-context";
import SideChartContainer from "../side-chart-container";

interface OutageData {
  il: string;
  outageByHour?: { hour: number; outageCount: number }[];
}

type OutageByHourGroup = {
  durationGroup: string;
  count: number;
};

type CountByHourResponse = OutageData[] | OutageByHourGroup[];

const isDurationGroupResponse = (
  data: CountByHourResponse,
): data is OutageByHourGroup[] => {
  return data.length > 0 && "durationGroup" in data[0];
};

const OverviewAside = () => {
  const [isNotification, setIsNotification] = useState<boolean>(false);
  const [donutChartSeries, setDonutChartSeries] = useState<number[]>([]);
  const [outageByHour, setOutageByHour] = useState<number[] | string[]>([]);
  const [outageByHourCount, setOutageByHourCount] = useState<number[]>([]);
  const [selectedCity, setSelectedCity] = useState<number>(1);

  const context = useTabContext();

  const response = useAsideChartApi({
    referenceDate: context?.activeDate,
    dateType: context?.activePeriod ?? 1,
  });

  const getDonutData = () => {
    const data = response?.getNotificationSourceRate?.data;
    if (!data) return;

    const series = isNotification
      ? [
          data.crmNotificationCount,
          data.ososNotificationCount,
          data.scadaNotificationCount,
        ]
      : [data.crmOutageCount, data.ososOutageCount, data.scadaOutageCount];

    setDonutChartSeries(series.map((val: unknown) => Number(val) || 0));
  };

  const getHourlyOutageData = () => {
    const data: CountByHourResponse | undefined =
      response?.getCountByHourWithCity?.data;
    if (!data || !Array.isArray(data)) return;

    if (data.length === 0) {
      setOutageByHour([...Array(25).keys()]);
      setOutageByHourCount(Array(25).fill(0));
      return;
    }

    if (isDurationGroupResponse(data)) {
      setOutageByHour(data.map((d) => d.durationGroup));
      setOutageByHourCount(data.map((d) => d.count));
      return;
    }

    const selectedDistrict: District | undefined = districts.find(
      (d) => d.value === selectedCity,
    );

    const cityData = data.find((d) => d.il === selectedDistrict?.displayName);

    if (cityData?.outageByHour) {
      setOutageByHour(cityData.outageByHour.map((d) => d.hour));
      setOutageByHourCount(cityData.outageByHour.map((d) => d.outageCount));
    } else {
      setOutageByHour([...Array(25).keys()]);
      setOutageByHourCount(Array(25).fill(0));
    }
  };

  useEffect(getDonutData, [
    response?.getNotificationSourceRate?.data,
    isNotification,
  ]);
  useEffect(getHourlyOutageData, [
    response?.getCountByHourWithCity?.data,
    selectedCity,
  ]);
  console.log(
    "🚀 ~ OverviewAside ~ response:",
    response?.getCountByHourWithCity,
  );

  const donutTitle = isNotification
    ? "Bildirim Kaynak Sistem Sayısı"
    : "Kesinti Kaynak Sistem Oranı";
  const legendTitle = isNotification ? "Bildirim Sayısı" : "Kesinti Sayısı";

  return (
    <>
      <SideChartContainer
        title={donutTitle}
        options={
          <Toggle
            hasColorChange={false}
            isOn={isNotification}
            setIsOn={setIsNotification}
          />
        }
      >
        {response?.getNotificationSourceRate?.isLoading ? (
          <Loader />
        ) : (
          <DonutChart series={donutChartSeries} title={legendTitle} />
        )}
      </SideChartContainer>

      <div className="dashboard-aside__line" />

      <SideChartContainer
        title="Saatlere Göre Kesinti Sayısı"
        options={
          <SelectInput
            selected={selectedCity}
            options={districts?.filter((d) => d.value !== 10)}
            setValue={setSelectedCity}
            placeholder="Diyarbakır"
          />
        }
      >
        {response?.getCountByHourWithCity?.isLoading ? (
          <Loader />
        ) : (
          <AreaChart
            data={outageByHourCount}
            categories={outageByHour}
            curveType="smooth"
          />
        )}
      </SideChartContainer>
    </>
  );
};

export default OverviewAside;
