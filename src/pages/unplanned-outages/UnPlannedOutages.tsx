import MainLayout from "@/components/layouts/page-layout/main-layout";
import UnplannedOutageCards from "@/components/pages/outages/unplanned/unplanned-outage-cards";
import UnplannedOutageTable from "@/components/pages/outages/unplanned/unplanned-outage-table";

const UnplannedOutage = () => {
  return (
    <MainLayout
      title="Plansız Kesintiler"
      hasRefresh={true}
      className="layout__page__outage"
      pageKey={"outages"}
    >
      <UnplannedOutageCards />
      <UnplannedOutageTable />
    </MainLayout>
  );
};

export default UnplannedOutage;
