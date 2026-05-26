import type { ApexOptions } from "apexcharts";
import React, { Suspense } from "react";
import { Loader } from "../loader/loader";
const Chart = React.lazy(() => import("react-apexcharts"));
import "./charts.scss";

interface TreeMapProps {
  seriesData: any;
  handleCityClick: (event: any, chartContext: any, config: any) => void;
}
// TODO: Implement types here
const TreeMap = ({ handleCityClick, seriesData }: TreeMapProps) => {
  const MIN_Y_VALUE = 50; // or any minimum area threshold

  const normalizedData = seriesData.map((item: { x: string; y: number }) => ({
    ...item,
    y: Math.max(item.y, MIN_Y_VALUE),
  }));

  const series = [{ data: normalizedData }];
  const chartOptions: ApexOptions = {
    chart: {
      type: "treemap",
      toolbar: {
        show: false,
      },
      events: { click: handleCityClick },
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
    plotOptions: {
      treemap: {
        enableShades: false,
        colorScale: {
          ranges: [
            {
              from: 0,
              to: 20,
              color: "#84CAFF",
            },
            {
              from: 20,
              to: 60,
              color: "#2E90FA",
            },
            {
              from: 60,
              to: 100,
              color: "#1570EF",
            },
            {
              from: 100,
              to: 150,
              color: "#175CD3",
            },
            {
              from: 150,
              to: 200,
              color: "#53B1FD",
            },
            {
              from: 200,
              to: 800,
              color: "#1849A9",
            },
          ],
        },
      },
    },
    dataLabels: {
      style: {
        fontSize: "14px",
      },
    },
    tooltip: {
      marker: {
        show: false,
      },
    },
  };

  return (
    <div className="fill-map-wrapper">
      {/* {selectedCity && <h3>Selected: {selectedCity}</h3>} */}
      <Suspense fallback={<Loader />}>
        <Chart
          options={chartOptions}
          series={series}
          type="treemap"
          height={330}
        />
      </Suspense>
    </div>
  );
};

export default TreeMap;
