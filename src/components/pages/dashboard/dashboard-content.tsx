import "./dashboard-content.scss";

import { TabComponentsTypes } from "@/types/components/pages/dashboard";
import OverviewContent from "./content/tab-based/overview-content";
import { useTabContext } from "@/providers/dashboard-tabs/tabs-context";
import OutagesContent from "./content/tab-based/outages-content";
import NotificationsContent from "./content/tab-based/notifications-content";


const DashboardContent = () => {
  const { activeTab } = useTabContext() ?? { activeTab: "overview" };


  const validTab = activeTab as keyof TabComponentsTypes;

  const tabComponents: TabComponentsTypes = {
    overview: <OverviewContent />,
    outages: <OutagesContent />,
    notifications: <NotificationsContent />,
  };



  return <div className="dashboard-content">{tabComponents[validTab]}</div>;
};

export default DashboardContent;
