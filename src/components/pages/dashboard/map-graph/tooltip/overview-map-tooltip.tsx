import { DotSvg } from "@/assets/icons/dot-svg";
import { getClassNames } from "@/helpers/get-class-names";
import { OverviewTooltipDataType } from "@/types/components/pages/dashboard";

const OverviewMapTooltip = ({
  data,
}: {
  data: OverviewTooltipDataType | null;
}) => {
  const isVisible = data !== null;
  const position = isVisible
    ? { left: data.x - 90, top: data.y - 370 }
    : { left: 200, top: 20 };

  return (
    <div
      className={getClassNames("overview-map-tooltip", [
        [isVisible, "visible"],
      ])}
      style={position}
    >
      <h3>{data?.info?.city}</h3>
      <ul className="overview-map-tooltip__info">
        <li className="overview-map-tooltip__rows">
          <span className="title">Aktif Kesinti:</span>
          <div className="active">
            <DotSvg />
            <span>{data?.info?.activeOutageCount ?? 0}</span>
          </div>
        </li>
        <li className="overview-map-tooltip__rows">
          <span className="title">Plansız Kesinti Aktif:</span>
          <span className="value">{data?.info?.unplannedOutageCount ?? 0}</span>
        </li>
        <li className="overview-map-tooltip__rows">
          <span className="title">Planlı Kesinti Aktif:</span>
          <span className="value">{data?.info?.plannedOutageCount ?? 0}</span>
        </li>
        <li className="overview-map-tooltip__rows">
          <span className="title">Toplam Bildirim:</span>
          <span className="value">{data?.info?.totalNotifications ?? 0}</span>
        </li>
        <li className="overview-map-tooltip__rows">
          <span className="title">OSOS:</span>
          <span className="value">{data?.info?.breakdown?.osos ?? 0}</span>
        </li>
        <li className="overview-map-tooltip__rows">
          <span className="title">SCADA:</span>
          <span className="value">{data?.info?.breakdown?.scada ?? 0}</span>
        </li>
        <li className="overview-map-tooltip__rows">
          <span className="title">CRM:</span>
          <span className="value">{data?.info?.breakdown?.crm ?? 0}</span>
        </li>
        <li className="overview-map-tooltip__rows">
          <span className="title">AG:</span>
          <span className="value">{data?.info?.breakdown?.dagitimAG ?? 0}</span>
        </li>
        <li className="overview-map-tooltip__rows">
          <span className="title">OG:</span>
          <span className="value">{data?.info?.breakdown?.dagitimOG ?? 0}</span>
        </li>
        <li className="overview-map-tooltip__rows">
          <span className="title">İletim:</span>
          <span className="value">{data?.info?.breakdown?.iletim ?? 0}</span>
        </li>
      </ul>
    </div>
  );
};

export default OverviewMapTooltip;
