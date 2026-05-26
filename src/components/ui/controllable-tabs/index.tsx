import { useSelector } from "react-redux";
import { ControllableTabItem } from "./controllable-tab-item";
import "./controllable-tabs.scss";
export const ControllableTabs = ({
  refreshHandler,
}: {
  refreshHandler: any;
}) => {
  const tabs = useSelector((state: any) => state.outageTabs);
  const tabList = Object.entries(tabs).map(([tabId, data]) => ({
    tabId,
    ...(typeof data === "object" && data !== null ? data : {}),
  }));
  return (
    <div className="controllable-tabs">
      {tabList?.map((item: any) => {
        return (
          <ControllableTabItem
            data={item}
            key={item?.outageId ?? item?.ompName}
            refreshHandler={refreshHandler}
          />
        );
      })}
    </div>
  );
};
