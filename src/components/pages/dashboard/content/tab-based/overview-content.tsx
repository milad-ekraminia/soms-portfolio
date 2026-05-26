import DashboardCards from "../dashboard-cards";
import DashboardMap from "../../map-graph/dashboard-map";
import DashboardSubCards from "../dashboard-sub-cards";
import { useNumberOfOutagesCityAndDistrict } from "@/hooks/dashboard";
import { useTabContext } from "@/providers/dashboard-tabs/tabs-context";

const overviewLegendItems = [
  { label: "Kesinti Yok", color: "var(--utility-gray-100)" },
  { label: "0-10", color: "var(--utility-brand-100)" },
  { label: "10-50", color: "var(--utility-brand-200)" },
  { label: "50-100", color: "var(--utility-warning-200)" },
  { label: "100-200", color: "var(--utility-warning-400)" },
  { label: "200+", color: "var(--utility-error-400)" },
];

const OverviewContent = () => {
  const context = useTabContext();

  const response = useNumberOfOutagesCityAndDistrict({
    referenceDate: context?.activeDate,
    dateType: context?.activePeriod ?? 1,
  });
        console.log("🚀 ~ OverviewContent ~ response?.data:", response?.data)
  return (
    <>
      <DashboardCards />
      <DashboardMap
        title="İl Bazlı Kesinti Sayıları"
        legendItems={overviewLegendItems}
        isLoading={false}
        data={response?.data}
      />
      <DashboardSubCards />
    </>
  );
};

export default OverviewContent;
