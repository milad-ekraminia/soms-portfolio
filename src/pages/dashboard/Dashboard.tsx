import MainLayout from "@/components/layouts/page-layout/main-layout";
import DashboardAside from "@/components/pages/dashboard/dashboard-aside";
import DashboardContent from "@/components/pages/dashboard/dashboard-content";
import { TabProvider } from "@/providers/dashboard-tabs/tabs-provider";

const Dashboard = () => {
  return (
    <TabProvider>
      <MainLayout title="SOMS Dashboard" hasNotification={false}>
        <DashboardAside />
        <DashboardContent />
      </MainLayout>
    </TabProvider>
  );
};

export default Dashboard;
