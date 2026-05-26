import { getTodayDate } from "@/helpers/get-today-date";
import { ReactNode, useMemo, useState } from "react";
import { TabContext } from "./tabs-context";

export const TabProvider = ({ children }: { children: ReactNode }) => {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [activePeriod, setActivePeriod] = useState<number>(1);
  const [activeDate, setActiveDate] = useState<string>(getTodayDate("-"));

  const value = useMemo(() => ({
    activeTab,
    setActiveTab,
    activePeriod,
    setActivePeriod,
    activeDate,
    setActiveDate
  }), [activeTab, activePeriod, activeDate]);

  return (
    <TabContext.Provider value={value}>
      {children}
    </TabContext.Provider>
  );
};