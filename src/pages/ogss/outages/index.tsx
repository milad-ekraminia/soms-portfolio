import MainLayout from "@/components/layouts/page-layout/main-layout";
import { TreeOutagesWrapper } from "@/components/pages/ogss/outages";

const OGSSOutages = () => {
  return (
    <MainLayout
      hasNotification={false}
      title="OGSS - Kesintiler"
      className="layout__page__ogss-outage"
    >
      <TreeOutagesWrapper />
    </MainLayout>
  );
};
export default OGSSOutages;
