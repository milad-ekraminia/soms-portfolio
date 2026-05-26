import React from "react";
const PieChart = React.lazy(() => import("@/components/ui/charts/pie-chart"));
import { Loader } from "@/components/ui/loader/loader";
import { calculateChange, calculatePortion } from "@/helpers/calculateChange";
import { getClassNames } from "@/helpers/get-class-names";
import { usePlannedAndUnplannedOutageRate } from "@/hooks/dashboard";
import { useTabContext } from "@/providers/dashboard-tabs/tabs-context";

const OutageRateCard = () => {
  const labels = ["Planlı", "Plansız"];
  const context = useTabContext();
  const cardText = [
    "Dün Aynı Zamanda",
    "Geçen Ay Aynı Zamanda",
    "Geçen Yıl Aynı Zamanda",
  ];

const { data: outageData, isLoading } = usePlannedAndUnplannedOutageRate({
  referenceDate: context?.activeDate,
  dateType: context?.activePeriod ?? 1,
}) as { data: any; isLoading: boolean };

  if (isLoading) {
    return <Loader />;
  }

  const formatChange = (current: number, previous: number) =>
    calculateChange(Number(current), Number(previous))?.percentageChange;

  const formatChangeIsIncrease = (current: number, previous: number) =>
    calculateChange(Number(current), Number(previous))?.isIncrease;

  const plannedOutagePercent = calculatePortion(
    Number(outageData?.plannedOutageCount),
    Number(outageData?.totalOutage),
  );
  const unplannedOutagePercent = calculatePortion(
    Number(outageData?.unplannedOutageCount),
    Number(outageData?.totalOutage),
  );
  // colors: ["var(--utility-brand-500)", "var(--utility-brand-200)"],

  return (
    <div className="outage-rate-card">
      <div className="content">
        <div className="header">
          <h1>Planlı Kesinti Oranı</h1>
        </div>
        <div className="extra-info">
          <ul className="subs-container">
            {["plannedOutageCount", "unplannedOutageCount"].map(
              (key, index) => (
                <li key={key} className="subs-info">
                  <div className="legends">
                    <div>
                      <span
                        className="legend-point"
                        style={{
                          backgroundColor:
                            index === 0
                              ? "var(--utility-brand-500)"
                              : "var(--utility-brand-200)",
                        }}
                      ></span>
                      <span className="legend-label">{labels[index]}</span>
                    </div>
                    <p className="stat">{outageData?.[key] ?? 0}</p>
                  </div>
                  <div className="info">
                    <p>
                      {context && context?.activePeriod
                        ? cardText[context?.activePeriod - 1]
                        : "Dün Aynı Zamanda"}{" "}
                      {
                        outageData?.[
                          `previous${
                            key.charAt(0).toUpperCase() + key.slice(1)
                          }`
                        ]
                      }
                    </p>
                    <span
                      className={getClassNames("percent", [
                        [
                          !!formatChangeIsIncrease(
                            outageData?.[key] ?? 0,
                            outageData?.[
                              `previous${
                                key.charAt(0).toUpperCase() + key.slice(1)
                              }`
                            ] ?? 0,
                          ),
                          "inc",
                        ],
                        [
                          !formatChangeIsIncrease(
                            outageData?.[key] ?? 0,
                            outageData?.[
                              `previous${
                                key.charAt(0).toUpperCase() + key.slice(1)
                              }`
                            ] ?? 0,
                          ) as boolean,
                          "dec",
                        ],
                      ])}
                    >
                      {formatChange(
                        outageData?.[key] ?? 0,
                        outageData?.[
                          `previous${
                            key.charAt(0).toUpperCase() + key.slice(1)
                          }`
                        ] ?? 0,
                      )}
                      %
                    </span>
                  </div>
                </li>
              ),
            )}{" "}
          </ul>
        </div>
      </div>
      <div className="chart">
        <PieChart
          series={[plannedOutagePercent, unplannedOutagePercent]}
          labels={labels}
          height={169}
        />
      </div>
    </div>
  );
};

export default OutageRateCard;
