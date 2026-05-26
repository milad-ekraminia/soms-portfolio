import { AlertSvg } from "@/assets/icons/alert-svg";
import { ShortArrowUpSvg } from "@/assets/icons/short-arrow-up-svg";
import { getClassNames } from "@/helpers/get-class-names";
import { useTabContext } from "@/providers/dashboard-tabs/tabs-context";

interface CardProps {
  title: string;
  count: number;
  percent?: number;
  periodicCount?: number;
  chartStatus?: boolean | 0;
  svgIcon?: any;
  hasInfo?: boolean;
  type?: "normal" | "plannedOutage";
  theme?: string;
  detailComponent?: React.ReactNode;
}
export const Card = ({
  title,
  count,
  percent,
  periodicCount,
  chartStatus,
  svgIcon,
  hasInfo = false,
  type = "normal",
  theme = "blue",
  detailComponent,
}: CardProps) => {
  const context = useTabContext();
  const cardText = [
    "Dün Aynı Zamanda",
    "Geçen Ay Aynı Zamanda",
    "Geçen Yıl Aynı Zamanda",
  ];
  const isNeutral = Boolean(chartStatus === 0 && percent === 0);
  const isUp = Boolean(chartStatus !== 0 && percent !== 0 && chartStatus);
  return (
    <div className={`information-cards ${theme}`}>
      <div className="information-cards__header">
        <span className="information-cards__header-title">{title}</span>
        {hasInfo ? (
          <div className="information-cards__header-info-wrapper">
            <AlertSvg stroke="#98A2B3" width="20" height="20" />
            <div className="information-cards__header-info-content">
              {detailComponent}
            </div>
          </div>
        ) : null}
      </div>
      <div className="information-cards__content">
        <div className="info-container">
          <div className="chart-container">
            <div className="value">
              <h1 className="count">{count?.toLocaleString()}</h1>
              {type == "normal" ? (
                <span
                  className={getClassNames("percentage", [
                    [isNeutral, "neutral"],
                    [!isNeutral && !isUp, "desc"],
                    [!isNeutral && isUp, "asc"],
                  ])}
                >
                  <span className="icon">
                    {isNeutral ? "" : <ShortArrowUpSvg />}
                  </span>
                  <span>{percent}%</span>
                </span>
              ) : null}
            </div>
            <div className="card-icon-wrapper">{svgIcon}</div>
          </div>
          {type == "normal" ? (
            <div className="info">
              <span className="description">
                <span className="value">{periodicCount}</span>

                <span className="text">
                  {context && context?.activePeriod
                    ? cardText[context?.activePeriod - 1]
                    : "Dün Aynı Zamanda"}{" "}
                </span>
              </span>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
