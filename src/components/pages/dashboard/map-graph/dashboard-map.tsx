import React, { Suspense, useState } from "react";
import MapGraphCustomLegend from "@/components/ui/charts/custom-legends/map-graph-custom-legend";
import SelectInput from "@/components/ui/input/select-input/select-input";
import { Loader } from "@/components/ui/loader/loader";
import { districts } from "@/helpers/data/dashboard";
import { useTabContext } from "@/providers/dashboard-tabs/tabs-context";
import {
  CityOutage,
  DashboardMapProps,
  DataProps,
  OutageSummary,
} from "@/types/components/pages/dashboard";

const BatmanSvg = React.lazy(() =>
  import("./map-svg/batman-map").then((m) => ({ default: m.BatmanSvg }))
);
const DiyarbakirSvg = React.lazy(() =>
  import("./map-svg/diyarbakir-map").then((m) => ({ default: m.DiyarbakirSvg }))
);
// ... repeat for other SVG components
const MardinSvg = React.lazy(() =>
  import("./map-svg/mardin-map").then((m) => ({ default: m.MardinSvg }))
);
const ProvinceMap = React.lazy(() =>
  import("./map-svg/province-map").then((m) => ({ default: m.ProvinceMap }))
);
const SanliurfaSvg = React.lazy(() =>
  import("./map-svg/sanliurfa-map").then((m) => ({ default: m.SanliurfaSvg }))
);
const SiirtSvg = React.lazy(() =>
  import("./map-svg/siirt-map").then((m) => ({ default: m.SiirtSvg }))
);
const SirnakSvg = React.lazy(() =>
  import("./map-svg/sirnak-map").then((m) => ({ default: m.SirnakSvg }))
);
const AllDistrictsSvg = React.lazy(() =>
  import("./map-svg/all-districts-map").then((m) => ({
    default: m.AllDistrictsSvg,
  }))
);
type MapKey = 10 | 1 | 2 | 3 | 4 | 5 | 6;

const DashboardMap = ({
  title,
  legendItems,
  isLoading,
  data,
}: DashboardMapProps) => {
  const { activeTab } = useTabContext() ?? { activeTab: "overview" };

  const [selectedMap, setSelectedMap] = useState<MapKey>(10);
  const cityNames: Record<MapKey, string> = {
    10: "TÜMÜ",
    1: "ŞANLIURFA",
    2: "DİYARBAKIR",
    3: "MARDİN",
    4: "BATMAN",
    5: "SİİRT",
    6: "ŞIRNAK",
  };
  const mapComponents: Record<
    MapKey,
    React.FC<{ data: DataProps | CityOutage | any | undefined }>
  > = {
    10: AllDistrictsSvg,
    1: SanliurfaSvg,
    2: DiyarbakirSvg,
    3: MardinSvg,
    4: BatmanSvg,
    5: SiirtSvg,
    6: SirnakSvg,
  };
  const SelectedMapComponent = mapComponents[selectedMap ?? 1];
  return (
    <div className="dashboard-map-container">
      <div className="dashboard-map-container__main">
        <div className="dashboard-map-container__header">
          <div className="dashboard-map-container__subject">
            <h1>{title}</h1>
          </div>
          {isLoading
            ? null
            : activeTab !== "overview" && (
                <div className="dashboard-map-container__select">
                  <SelectInput
                    selected={10}
                    dummySet={setSelectedMap}
                    options={districts}
                  />
                </div>
              )}
        </div>
        {isLoading ? null : (
          <Suspense fallback={<Loader />}>
            {activeTab === "overview" ? (
              <ProvinceMap data={data as OutageSummary} />
            ) : (
              <SelectedMapComponent
                data={
                  selectedMap === 10
                    ? (data as any) // all cities data
                    : (data?.find(
                        (elem: any) => elem?.city === cityNames[selectedMap]
                      ) as DataProps | CityOutage)
                }
              />
            )}
          </Suspense>
        )}
      </div>
      {isLoading ? <Loader /> : <MapGraphCustomLegend items={legendItems} />}
    </div>
  );
};

export default DashboardMap;
