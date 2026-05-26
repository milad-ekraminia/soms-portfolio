import React, { Suspense, useMemo } from "react";
import type { ApexOptions } from "apexcharts";
import { Loader } from "../loader/loader";
const Chart = React.lazy(() => import("react-apexcharts"));
const ColumnChart = () => {
  const series = useMemo(
    () => [
      {
        name: "Kesinti Sayısı",
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66, 12, 42, 62, 50],
      },
    ],
    []
  );

  const options: ApexOptions = useMemo(
    () => ({
      chart: {
        type: "bar",
        toolbar: { show: false },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          borderRadius: 5,
          borderRadiusApplication: "end",
        },
      },
      dataLabels: { enabled: false },
      stroke: { show: true, width: 2, colors: ["transparent"] },
      legend: { show: false },
      xaxis: {
        categories: [
          "0",
          "2",
          "4",
          "6",
          "8",
          "10",
          "12",
          "14",
          "16",
          "18",
          "20",
          "22",
          "24",
        ],
      },
      tooltip: {
        marker: { show: false },
      },
      fill: {
        colors: ["#D1E9FF"],
      },
      states: {
        hover: { filter: { type: "none" } },
        active: { filter: { type: "none" } },
      },
    }),
    []
  );

  return (
    <div className="fill-map-wrapper ">
      <Suspense fallback={<Loader />}>
        <Chart options={options} series={series} type="bar" height="100%" />
      </Suspense>
    </div>
  );
};

export default ColumnChart;
