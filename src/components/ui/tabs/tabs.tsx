import { ReactNode } from "react";
import "./tabs.scss";

interface TabsType {
  title: string | number;
  value: string | number;
  id: number;
  icon?: ReactNode;
}

interface TabsProps {
  tabs?: TabsType[];
  activeTab: string | number;
  onTabClick: any;
}
const Tabs = ({ activeTab, onTabClick, tabs }: TabsProps) => {
  return (
    <ul className="tabs">
      {tabs?.map((tab: TabsType) => (
        <li key={tab.title} className="tabs__item">
          <button
            className={`tab-button ${
              activeTab === tab.value ? "active-tab" : ""
            }`}
            onClick={() => onTabClick(tab.value)}
          >
            {tab.icon ?? tab.title}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Tabs;
