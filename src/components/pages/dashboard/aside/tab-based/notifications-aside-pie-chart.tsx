import React from "react";
const PieChart = React.lazy(() => import("@/components/ui/charts/pie-chart"));
import { Loader } from "@/components/ui/loader/loader";
import {  calculatePortion } from "@/helpers/calculateChange";
import { usePlumbedNotificationRate } from "@/hooks/dashboard";
import SideChartContainer from "../side-chart-container";

const NotificationsAsidePieChart = () => {
  const labels = ["Tesisatlı", "Tesisatsız"];

  const { data, isLoading } = usePlumbedNotificationRate();

  const withInstallationPercent = calculatePortion(Number(data?.withInstallation), Number(data?.totalCount));
  const withoutInstallationPercent = calculatePortion(Number(data?.withoutInstallation), Number(data?.totalCount));

  return (
    <SideChartContainer title="Tesisatlı Bildirim Oranı">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <PieChart
            series={[withInstallationPercent, withoutInstallationPercent]}
            labels={labels}
            height={220}
          />
          <ul className="subs-container">
            <li className="subs-info">
              <div className="legends">
                <div>
                  <span
                    className="legend-point"
                    style={{
                      backgroundColor: "var(--utility-brand-500)",
                    }}
                  ></span>
                  <span className="legend-label">{labels[0]}</span>
                </div>
                <p className="stat">{data?.withInstallation ?? 0}</p>
              </div>
            </li>
            <li className="subs-info">
              <div className="legends">
                <div>
                  <span
                    className="legend-point"
                    style={{
                      backgroundColor: "var(--utility-brand-200)",
                    }}
                  ></span>
                  <span className="legend-label">{labels[1]}</span>
                </div>
                <p className="stat">{data?.withoutInstallation ?? 0}</p>
              </div>
            </li>
          </ul>
        </>
      )}
    </SideChartContainer>
  );
};

export default NotificationsAsidePieChart;
