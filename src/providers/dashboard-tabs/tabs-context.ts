import { createContext, useContext } from "react";
type TabContextType = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  activePeriod: number;
  setActivePeriod: (tab: number) => void;
  activeDate: string;
  setActiveDate: (date: string) => void;
};

export const TabContext = createContext<TabContextType | undefined>(undefined);
export const useTabContext = () => {
  return useContext(TabContext);
};
