import { memo } from "react";
import CustomErrorButtons from "./error-group-buttons/error-group-buttons";

const MwmoErrorPageContent = ({
  status,
  text,
  canDashboard,
  onDashboard,
  onFallback,
}: {
  status: number;
  text: string;
  canDashboard: boolean;
  onDashboard: () => void;
  onFallback: () => void;
}) => {
  const canDashboardText = canDashboard
    ? "Dashboard'a Dön"
    : " Uygun bir sayfaya git";
  return (
    <div className="dv-error__content-section">
      <div className="dv-error__content-section__content">
        <div className="dv-error__content-section__content__inner">
          <div className="dv-error__content-section__content__inner-background"></div>
          <div className="text-box">
            <h1>{status ?? 404} Hatası</h1>
            <h3 className="desc">{text}</h3>
          </div>
          <CustomErrorButtons
            isPending={false}
            confirmButtonText={canDashboardText}
            onDashboard={onDashboard}
            onFallback={onFallback}
            canDashboard={canDashboard}
          />
        </div>
      </div>
    </div>
  );
};

const ErrorPageContent = memo(MwmoErrorPageContent);

export default ErrorPageContent;
