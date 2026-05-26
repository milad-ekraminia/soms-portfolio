import React, { Suspense, useMemo } from "react";
import "./charts.scss";
import type { ApexOptions } from "apexcharts";
import { Loader } from "../loader/loader";
const Chart = React.lazy(() => import("react-apexcharts"));
import DonutCustomLegend from "@/components/ui/charts/custom-legends/donut-custom-legend";

interface DonutChartProps {
  series: number[];
  title: string;
}

const DonutChart = ({ series, title }: DonutChartProps) => {
  const options: ApexOptions = useMemo(
    () => ({
      chart: {
        type: "donut",
      },
      labels: ["CRM", "OSOS", "SCADA"],
      // colors: ["#175CD3", "#FEC84B", "#2E90FA"],
      colors: [
        "var(--utility-brand-700)",
        "var(--utility-warning-300)",
        "var(--utility-brand-500)",
      ],
      stroke: {
        width: 4, // thickness of "gap" between segments
        colors: ["var(--bg-primary)"], // same as card/bg color
        lineCap: "round", // rounded ends like your screenshot
      },
      plotOptions: {
        pie: {
          donut: {
            size: "45%",
          },
        },
      },

      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
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
      tooltip: {
        custom: function ({ series, seriesIndex, w }) {
          const value = series?.[seriesIndex];
          const label = w.config.labels?.[seriesIndex];
          return `
          <div class="donut-tooltip">
            <span>${label}: ${value ?? "No Data"}</span>
          </div>
        `;
        },
      },

      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    }),
    []
  );

  return (
    <>
      <div className="chart-wrapper">
        <Suspense fallback={<Loader />}>
          <Chart options={options} series={series} type="donut" height={200} />
        </Suspense>
      </div>
      <DonutCustomLegend series={series} title={title} />
    </>
  );
};

export default DonutChart;
