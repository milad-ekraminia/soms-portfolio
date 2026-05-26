import { getClassNames } from "@/helpers/get-class-names";
import { useTabContext } from "@/providers/dashboard-tabs/tabs-context";
import { GeneralTooltipDataType } from "@/types/components/pages/dashboard";

interface TooltipRow {
  title: string;
  value: number | undefined;
}

const TooltipList = ({ rows }: { rows: TooltipRow[] }) => (
  <ul className="overview-map-tooltip__info">
    {rows.map(({ title, value }) => (
      <li key={title} className="overview-map-tooltip__rows">
        <span className="title">{title}</span>
        <span className="value">{value ?? 0}</span>
      </li>
    ))}
  </ul>
);

const GeneralMapTooltip = ({
  data,
}: {
  data: GeneralTooltipDataType | null;
}) => {
  const { activeTab } = useTabContext() ?? { activeTab: "overview" };
  const isVisible = !!data;
  const position = isVisible
    ? { left: data!.x - 90, top: data!.y - 100 }
    : { left: 250, top: 20 };

  if (!data) return null;

  const district = data.info?.district ?? {};

  const tooltipConfigs: Record<string, TooltipRow[]> = {
    outages: [
      { title: "Planlı Kesinti Aktif:", value: district?.activePlanned },
      { title: "Plansız Kesinti Aktif:", value: district?.activeUnplanned },
      { title: "Toplam Kesinti:", value: district?.totalCount },
    ],
    notifications: [
      { title: "Toplam Bildirim:", value: district?.totalNotifications },
      { title: "OSOS:", value: district?.ososNotifications },
      { title: "SCADA:", value: district?.scadaNotifications },
      { title: "CRM:", value: district?.crmNotifications },
    ],
    overview: [
      { title: "Toplam Bildirim:", value: district.totalNotifications },
    ],
  };

  const rows = tooltipConfigs[activeTab] ?? tooltipConfigs.overview;

  return (
    <div
      className={getClassNames("general-map-tooltip", [[isVisible, "visible"]])}
      style={position}
    >
      <h5>{data.info?.cityName}</h5>
      <TooltipList rows={rows} />
    </div>
  );
};

export default GeneralMapTooltip;
