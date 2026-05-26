import { Loader } from "@/components/ui/loader/loader";
import "./historical-network.scss";
import { TreeFilter } from "../simulation/tree-filter";
import HistoricalTreeChart from "./historical-network-tree";
import { OgssStationItemArray } from "@/types/components/pages/ogss/simulation";
export const HistoricalNetworkTreeWrapper = ({
  data,
  renderKey,
  setData,
  isLoading,
  showUnWatched,
  searchValue,
  setSearchValue,
  onSearch,
  handleMonitoringChange,
  checkedSystems,
  onClearSearch,
  rotate,
  goUp,
  setShowUnWatched,
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
  goUp?: boolean;
}) => {
  return (
    <div className="historical-network__tree__wrapper">
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
              <HistoricalTreeChart
                data={data}
                isLoading={isLoading}
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
            "Lütfen OMP Id ve geçerli bir tarih giriniz."
          )}
        </div>
      </div>
    </div>
  );
};
