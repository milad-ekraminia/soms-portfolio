import { ArrowRightSvg } from "@/assets/icons/arrow-right-svg";
import { SmsInterruptionDrawer } from "./sms-interruption-drawer";
import { useState } from "react";

interface CardProps {
  title: string;
  count: number;
  svgIcon?: any;
  theme?: string;
}
export const SmsInterruptionCard = ({
  title,
  count,
  svgIcon,
  theme = "blue",
}: CardProps) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <>
      <div
        className={`information-cards ${theme} ${
          count > 0 ? "hasBorder" : null
        }`}
      >
        <div className="information-cards__header">
          <span className="information-cards__header-title">{title}</span>
        </div>
        <div className="information-cards__content">
          <div className="info-container">
            <div className="chart-container">
              <div className="value">
                <h1 className={`count ${count > 0 ? "danger" : null}`}>
                  {count?.toLocaleString()}
                </h1>
              </div>
              <div className="card-icon-wrapper">{svgIcon}</div>
            </div>
            <div className="info">
              <button
                className={`description interruptions-sms ${
                  count > 0 ? "isActive" : null
                }`}
                disabled={count < 1}
                onClick={() => {
                  setOpenDrawer(true);
                }}
                style={{ backgroundColor: "unset" }}
              >
                <span className="text">Listeyi görmek için tıklayınız</span>
                <ArrowRightSvg
                  height="20"
                  width="20"
                  stroke={
                    count > 0 ? "var(--text-error-primary-600)" : undefined
                  }
                />
              </button>
            </div>
          </div>
        </div>
      </div>
      <SmsInterruptionDrawer
        isOpen={openDrawer}
        onClose={() => setOpenDrawer(false)}
      />
    </>
  );
};
