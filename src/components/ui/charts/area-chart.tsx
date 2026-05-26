import React, { Suspense, useMemo } from "react";
import type { ApexOptions } from "apexcharts";
import { Loader } from "../loader/loader";
const Chart = React.lazy(() => import("react-apexcharts"));
interface AreaChartProps {
  data: number[];
  categories: string[] | number[];
  curveType?:
    | "straight"
    | "smooth"
    | "stepline"
    | "linestep"
    | "monotoneCubic"
    | ("straight" | "smooth" | "stepline" | "linestep" | "monotoneCubic")[]
    | undefined;
  type?: "numeric" | "category" | "datetime";
}
const AreaChart = ({
  data,
  categories,
  curveType = "straight",
  type = "category",
}: AreaChartProps) => {
  const series = [
    {
      name: "Kesinti Sayısı:",
      data: data,
    },
  ];
  const options: ApexOptions = useMemo(
    () => ({
      chart: {
        type: "area",
        // height: 320,
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },

      stroke: {
        curve: curveType,
        width: 2,
      },
      xaxis: {
        type: type,
        categories: categories,
        tickAmount: Math.min(12, categories.length),
        labels: {
          rotate: 0, // 👈 prevent rotation
        },
      },
      markers: {
        size: 0,
      },
      tooltip: {
        marker: {
          show: false,
        },
      },
      legend: {
        horizontalAlign: "left",
      },
    }),
    [curveType, type, categories]
  );

  return (
    <div className="fill-map-wrapper">
      <Suspense fallback={<Loader />}>
        <Chart options={options} series={series} type="area" height="100%" />
      </Suspense>
    </div>
  );
};

export default AreaChart;
