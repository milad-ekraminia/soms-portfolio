import "./dashboard-aside.scss"
import { useTabContext } from "@/providers/dashboard-tabs/tabs-context";
import { TabComponentsTypes } from "@/types/components/pages/dashboard";
import OverviewAside from "./aside/tab-based/overview-aside";
import OutagesAside from "./aside/tab-based/outages-aside";
import NotificationsAside from "./aside/tab-based/notifications-aside";

const DashboardAside = () => {
  const { activeTab } = useTabContext() ?? { activeTab: "overview" };
  const validTab = activeTab as keyof TabComponentsTypes;

  const tabComponents: TabComponentsTypes = {
    overview: <OverviewAside />,
    outages: <OutagesAside />,
    notifications: <NotificationsAside  />,
  };

  return <aside className="dashboard-aside">{tabComponents[validTab]}</aside>;
};

export default DashboardAside;
