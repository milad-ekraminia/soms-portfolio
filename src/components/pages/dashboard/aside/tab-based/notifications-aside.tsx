import TreeMap from "@/components/ui/charts/tree-map";
import DateInput from "@/components/ui/input/date-input/date-input";
import { Loader } from "@/components/ui/loader/loader";
import { useNotificationByCity } from "@/hooks/dashboard";
import { useEffect, useState } from "react";
import SideChartContainer from "../side-chart-container";
import NotificationsAsidePieChart from "./notifications-aside-pie-chart";

interface TreeMapData {
  x: string;
  y: number;
}

const NotificationsAside = () => {
  const today = new Date();
  const prevMonth = new Date(today);
  prevMonth.setMonth(today.getMonth() - 1);

  // Handle cases like Jan 31 → Feb (invalid date adjustment)
  if (prevMonth.getDate() !== today.getDate()) {
    prevMonth.setDate(0); // fallback to last valid day of next month
  }

  const formatDate = (date: Date) => {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      return "";
    }
    return date.toISOString().split("T")[0];
  };

  const [datePeriod, setDatePeriod] = useState<[Date, Date]>([prevMonth, today]);
  const [seriesData, setSeriesData] = useState<any>([]);
  const [clickedOnce, setClickedOnce] = useState(false);
  const [breadcrumbs, setBreadcrumbs] = useState<string[]>([]);

  const { data, isLoading } = useNotificationByCity({
    start: formatDate(datePeriod[0]),
    end: formatDate(datePeriod[1]),
  });

  useEffect(() => {
    setSeriesData(
      data?.map((elem: any) => ({
        x: elem.city,
        y: elem.totalCityNotifications,
      })) || []
    )
    setBreadcrumbs([])
    setClickedOnce(false);
  }, [data, setSeriesData])

  const dateInputChange = (date: [Date | string, Date | string], handler: (date: [Date, Date]) => void) => {
    const [startRaw, endRaw] = date;

    const start = new Date(startRaw);
    const end = new Date(endRaw);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return;
    }

    handler([start, end]);
  }

  const cityDistrictsMap: Record<string, TreeMapData[]> = {
    ŞANLIURFA: data?.find((elem: any) => elem?.city === "ŞANLIURFA")?.districts?.map((elem: any) => ({ x: elem.district, y: elem.totalNotifications })) || [],
    DİYARBAKIR: data?.find((elem: any) => elem?.city === "DİYARBAKIR")?.districts?.map((elem: any) => ({ x: elem.district, y: elem.totalNotifications })) || [],
    MARDİN: data?.find((elem: any) => elem?.city === "MARDİN")?.districts?.map((elem: any) => ({ x: elem.district, y: elem.totalNotifications })) || [],
    BATMAN: data?.find((elem: any) => elem?.city === "BATMAN")?.districts?.map((elem: any) => ({ x: elem.district, y: elem.totalNotifications })) || [],
    SİİRT: data?.find((elem: any) => elem?.city === "SİİRT")?.districts?.map((elem: any) => ({ x: elem.district, y: elem.totalNotifications })) || [],
    ŞIRNAK: data?.find((elem: any) => elem?.city === "ŞIRNAK")?.districts?.map((elem: any) => ({ x: elem.district, y: elem.totalNotifications })) || [],
  };

  const handleCityClick = (_event: any, _chartContext: any, config: any) => {
    if (clickedOnce) return;

    const clickedIndex = config?.dataPointIndex;

    if (
      clickedIndex === undefined ||
      clickedIndex < 0 ||
      clickedIndex >= seriesData.length
    ) {
      return;
    }

    const clickedCity = seriesData[clickedIndex]?.x;
    if (!clickedCity) return;

    const newSeriesData = cityDistrictsMap[clickedCity] || [];

    setSeriesData(newSeriesData);
    setBreadcrumbs((prev) => [...prev, clickedCity]);
    setClickedOnce(true);
  };

  const handleBreadcrumbClick = (index: number) => {
    if (index === -1) {
      setSeriesData(data?.map((elem: any) => ({
        x: elem.city,
        y: elem.totalCityNotifications,
      })) || []);
      setBreadcrumbs([]);
      setClickedOnce(false);
    } else {
      const newBreadcrumbs = breadcrumbs.slice(0, index + 1);
      setSeriesData(cityDistrictsMap[newBreadcrumbs[index]] || seriesData);
      setBreadcrumbs(newBreadcrumbs);
    }
  };

  return (
    <>
      <SideChartContainer
        title="İllere Göre Bildirim"
        options={<DateInput
          dateFormat="MMMM DD"
          onChange={(date: [Date | string, Date | string]) => dateInputChange(date, setDatePeriod)}
          range />}
        showBreadCrumb={true}
        handleBreadcrumbClick={handleBreadcrumbClick}
        breadcrumbs={breadcrumbs}
      >
        {
          isLoading ? <Loader /> :
            <TreeMap handleCityClick={handleCityClick} seriesData={seriesData} />
        }
      </SideChartContainer>
      <div className="dashboard-aside__line"></div>
      <NotificationsAsidePieChart />
    </>
  );
};

export default NotificationsAside;
