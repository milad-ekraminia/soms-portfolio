import React, { useState } from "react";
const AreaChart = React.lazy(() => import("@/components/ui/charts/area-chart"));
import DateInput from "@/components/ui/input/date-input/date-input";
import { Loader } from "@/components/ui/loader/loader";
import { useNumberOfInterruptionsByDay } from "@/hooks/dashboard";
import SideChartContainer from "../side-chart-container";

const OutagesAside = () => {
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

  const [datePeriod, setDatePeriod] = useState<[Date, Date]>([
    prevMonth,
    today,
  ]);
  const [datePeriod2, setDatePeriod2] = useState<[Date, Date]>([
    prevMonth,
    today,
  ]);

  const dateInputChange = (
    date: [Date | string, Date | string],
    handler: (date: [Date, Date]) => void
  ) => {
    const [startRaw, endRaw] = date;

    const start = new Date(startRaw);
    const end = new Date(endRaw);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return;
    }

    handler([start, end]);
  };

  const responseStatusId1 = useNumberOfInterruptionsByDay({
    start: formatDate(datePeriod[0]),
    end: formatDate(datePeriod[1]),
    statusId: 1,
  });

  const responseStatusId2 = useNumberOfInterruptionsByDay({
    start: formatDate(datePeriod2[0]),
    end: formatDate(datePeriod2[1]),
    statusId: 2,
  });

  const responseStatusId1Data = responseStatusId1?.data ?? [];
  const responseStatusId2Data = responseStatusId2?.data ?? [];

  return (
    <>
      <SideChartContainer
        title="Günlere Göre Planlı Kesinti"
        options={
          <DateInput
            dateFormat="MMMM DD"
            onChange={(date: [Date | string, Date | string]) =>
              dateInputChange(date, setDatePeriod)
            }
            range
          />
        }
      >
        {responseStatusId1?.isLoading ? (
          <div className="dv-area-chart-loader-box">
            <Loader />
          </div>
        ) : (
          <AreaChart
            type="datetime"
            data={responseStatusId1Data?.map(
              (elem: { count: number }) => elem?.count
            )}
            categories={responseStatusId1Data?.map(
              (elem: any) => elem?.date
            )}
            curveType={"smooth"}
          />
        )}
      </SideChartContainer>
      <div className="dashboard-aside__line"></div>
      <SideChartContainer
        title="Günlere Göre Plansız Kesinti"
        options={
          <DateInput
            dateFormat="MMMM DD"
            onChange={(date: [Date | string, Date | string]) =>
              dateInputChange(date, setDatePeriod2)
            }
            range
          />
        }
      >
        {responseStatusId2?.isLoading ? (
          <div className="dv-area-chart-loader-box">
            <Loader />
          </div>
        ) : (
          <AreaChart
            type="datetime"
            data={responseStatusId2Data?.map(
              (elem: { count: number }) => elem?.count
            )}
            categories={responseStatusId2Data?.map(
              (elem: any) => elem?.date
            )}
            curveType={"smooth"}
          />
        )}
      </SideChartContainer>
    </>
  );
};

export default OutagesAside;
