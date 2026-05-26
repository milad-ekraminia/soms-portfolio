import Drawer from "@/components/ui/drawer/drawer";
import Tabs from "@/components/ui/tabs/tabs";

import { useCreateRankLogic } from "@/hooks/outage/unPlanned-outage/use-create-rank-logic";
import { CreateRankAddress } from "./create-rank-address";
import { CreateRankCbs } from "./create-rank-cbs";
interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  drawerValues: {
    title: string;
    type: string;
  };
  selectedRows?: any;
  outageData?: any;
}
export const CreateRank = ({
  isOpen,
  onClose,
  drawerValues,
  selectedRows,
  outageData,
}: DrawerProps) => {
  const {
    control,
    handleSubmit,
    onSubmit,
    errors,
    activeTab,
    setActiveTab,
    city,
    district,
    neighborhood,
    chosenStationId,
    cities,
    districts,
    neighbourhoods,
    fullAddressData,
    ompData,
    loadingStates,
    watch,
    getValues,
    setError,
  } = useCreateRankLogic({ selectedRows, onClose, isOpen, outageData });
  const tabs = [
    { id: 0, title: "Adres", active: true, value: "Address" },
    { id: 1, title: "CBS ID", active: false, value: "CBS" },
  ];

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={() => {
        if (activeTab === "Address") {
          return handleSubmit(onSubmit)();
        }

        // Manual CBS tab validation
        const cbsValue = getValues("cbsId");

        if (!cbsValue) {
          setError("cbsId", { type: "manual", message: "CBS ID zorunlu" });
          return;
        }

        onSubmit({
          cbsId: watch("cbsId"),
          city: watch("city"),
          district: watch("district"),
          neighborhood: watch("neighborhood"),
          stationId: watch("stationId"),
        });
      }}
      title={drawerValues?.title}
    >
      <div className="outage-drawer-forms-cotainer">
        <Tabs tabs={tabs} activeTab={activeTab} onTabClick={setActiveTab} />
        <div className="outage-drawer-forms-cotainer__content">
          <div className="outage-drawer-forms-cotainer__content-id">
            <span className="outage-drawer-forms-cotainer__content-id-title">
              Kesinti Numarası:
            </span>
            <span className="outage-drawer-forms-cotainer__content-id-value">
              {selectedRows?.[0]}
            </span>
          </div>
          {activeTab === "Address" ? (
            <CreateRankAddress
              errors={errors}
              control={control}
              cities={cities}
              districts={districts}
              neighbourhoods={neighbourhoods}
              fullAddressData={fullAddressData}
              ompData={ompData}
              city={city}
              district={district}
              neighborhood={neighborhood}
              chosenStationId={chosenStationId}
              {...loadingStates}
            />
          ) : (
            <CreateRankCbs
              errors={errors}
              control={control}
              isLoading={loadingStates.isCbsAddressLoading}
              cities={cities}
              districts={districts}
              neighbourhoods={neighbourhoods}
              city={city}
              district={district}
              neighborhood={neighborhood}
              chosenStationId={chosenStationId}
            />
          )}
          <button type="submit" style={{ display: "none" }} />
        </div>
      </div>
    </Drawer>
  );
};
