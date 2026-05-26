import { Loader } from "@/components/ui/loader/loader";
import "./simulation.scss";
import SimulationTree from "./simulation-tree";
import { TreeFilter } from "../outages/tree-filter";
import { OgssStationItemArray } from "@/types/components/pages/ogss/simulation";
export const SimulationTreeWrapper = ({
  data,
  setData,
  isLoading,
  showUnWatched,
  setShowUnWatched,
  searchValue,
  setSearchValue,
  onSearch,
  handleMonitoringChange,
  checkedSystems,
  onClearSearch,
  rotate,
  goUp,
  renderKey,
}: {
  data: OgssStationItemArray | null;
  setData: any;
  renderKey: any;
  isLoading: boolean;
  showUnWatched?: any;
  setShowUnWatched?: any;
  searchValue: string;
  setSearchValue: (value: string) => void;
  onSearch: () => void;
  handleMonitoringChange: (value: string, checked: boolean) => void;
  checkedSystems: any;
  onClearSearch: any;
  rotate: "horizontal" | "vertical";
  goUp: boolean;
}) => {
  return (
    <div className="simulation__wrapper">
      <div className="simulation__wrapper-content">
        {data && !isLoading ? (
          <>
            <TreeFilter
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onSearch={onSearch}
              handleMonitoringChange={handleMonitoringChange}
              checkedSystems={checkedSystems}
              onClearSearch={onClearSearch}
            />
            <SimulationTree
              data={data}
              showUnWatched={showUnWatched}
              rotate={rotate}
              goUp={goUp}
              setData={setData}
              renderKey={renderKey}
              setShowUnWatched={setShowUnWatched}
            />
          </>
        ) : isLoading ? (
          <Loader />
        ) : (
          "Lütfen OMP Id giriniz."
        )}
      </div>
    </div>
  );
};
