import MainLayout from "@/components/layouts/page-layout/main-layout";
import { Simulation } from "@/components/pages/ogss/simulation";

 const OGSSSimulation = () => {
  return (
    <MainLayout hasNotification={false} title="OGSS - Simülasyon">
      <Simulation />
    </MainLayout>
  );
};
export default OGSSSimulation;