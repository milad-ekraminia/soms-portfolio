import MainLayout from "@/components/layouts/page-layout/main-layout";
import { HistoricalNetwork } from "@/components/pages/ogss/historical-network";

 const OGSSHistoricalNetwork = () => {
  return (
    <MainLayout hasNotification={false} title="OGSS - Tarihsel Şebeke">
      <HistoricalNetwork />
    </MainLayout>
  );
};
export default OGSSHistoricalNetwork;