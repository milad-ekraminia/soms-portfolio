import type { ApexOptions } from "apexcharts";
import React, { Suspense, useMemo } from "react";
import { Loader } from "../loader/loader";
const Chart = React.lazy(() => import("react-apexcharts"));
interface PieChartProps {
  series: number[];
  labels: string[];
  height: number;
}

const PieChart = ({ series, labels, height }: PieChartProps) => {
  const chartOptions: ApexOptions = useMemo(
    () => ({
      chart: {
        type: "pie",
      },
      labels,
      legend: {
        show: false,
      },
      colors: ["var(--utility-brand-500)", "var(--utility-brand-200)"],
      stroke: {
        width: 0, // border size
        colors: ["transparent"], // border color (one or array)
      },
      dataLabels: {
        enabled: false,
      },
      tooltip: {
        custom: function ({ series, seriesIndex, w }) {
          const value = series?.[seriesIndex] + "%";
          const label = w.config.labels?.[seriesIndex];

          return `
          <div class="donut-tooltip">
            <span>${label}: ${value ?? "No Data"}</span>
          </div>
        `;
        },
      },
      states: {
        hover: {
          filter: {
            type: "none",
          },
        },
        active: {
          filter: {
            type: "none",
          },
        },
      },
    }),
    []
  );

  return (
    <div className="chart-wrapper">
      <Suspense fallback={<Loader />}>
        <Chart
          options={chartOptions}
          series={series}
          type="pie"
          height={height}
        />{" "}
      </Suspense>
    </div>
  );
};

export default PieChart;
