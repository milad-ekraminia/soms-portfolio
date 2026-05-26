import { dashboardTabs, dashboardTabsOverall } from "@/helpers/data/dashboard";
import "./pages-header.scss";
import { useTabContext } from "@/providers/dashboard-tabs/tabs-context";
import { getClassNames } from "@/helpers/get-class-names";
import { Notification } from "@/components/ui/notification/notification";
import Tabs from "@/components/ui/tabs/tabs";
import SelectInput from "@/components/ui/input/select-input/select-input";
import YearDateInput from "@/components/ui/input/date-input/year-date-input/year-date-input";
import { Refresh } from "./refresh";

interface PagesHeaderProps {
  title: string;
  hasNotification?: boolean;
  hasRefresh?: boolean;
  pageKey: string;
}
const PagesHeader = ({
  title,
  hasNotification = true,
  hasRefresh = false,
  pageKey,
}: PagesHeaderProps) => {
  const context = useTabContext();

  return (
    <div
      className={getClassNames("pages-header", [
        [context !== undefined, "small"],
      ])}
    >
      <h3 className="pages-header__title">{title}</h3>
      <div className="pages-header__actions">
        {hasRefresh && <Refresh pageKey={pageKey} />}
        {hasNotification && <Notification />}
      </div>
      {context && (
        <div className="dashboard-header">
          <Tabs
            tabs={dashboardTabs}
            activeTab={context.activeTab}
            // onTabClick={context.setActiveTab}
            onTabClick={() => {}}
          />
          <div className="dashboard-header__select-container">
            {context?.activeTab == "overview" ? (
              <>
                {" "}
                {context?.activePeriod == 2 ? (
                  <YearDateInput type="month" />
                ) : null}
                {context?.activePeriod == 3 ? (
                  <YearDateInput type="year" />
                ) : null}
                <SelectInput
                  selected={
                    context?.activePeriod || dashboardTabsOverall[0].value
                  }
                  options={dashboardTabsOverall}
                  setValue={context?.setActivePeriod}
                  
                />
              </>
            ) : (
              <span className="dashboard-header__select-container-moment">
                Anlık
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PagesHeader;
