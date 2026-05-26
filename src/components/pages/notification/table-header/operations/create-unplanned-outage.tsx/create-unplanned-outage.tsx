import Drawer from "@/components/ui/drawer/drawer";
import Tabs from "@/components/ui/tabs/tabs";
import { createUnplannedOutageSelectOptions } from "@/helpers/data/notification";

import { DrawerFormsOmp } from "./drawer-forms-omp";
import { DrawerFormsAddress } from "./drawer-forms-address";
import { useDrawerFormLogic } from "@/hooks/notifications/use-drawer-form-logic";
interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  drawerValues: {
    title: string;
    type: string;
  };
  data?: any;
  selectedRows?: any;
}
export const CreateUnplannedOutage = ({
  isOpen,
  onClose,
  drawerValues,
  data,
  selectedRows,
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
    cbsDetail,
    cbsDetailLoading,
    cbsDetailFetching,
    watch,
  } = useDrawerFormLogic({ selectedRows, data, onClose, isOpen });
  const addressSelectOptions = createUnplannedOutageSelectOptions[0];
  const ompSelectOptions = createUnplannedOutageSelectOptions[1];
  const tabs = [
    { id: 0, title: "Adres", active: true, value: "Address" },
    { id: 1, title: "CBS ID", active: false, value: "CBS" },
  ];

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      title={drawerValues?.title}
    >
      <div className="notification-drawer-forms-cotainer">
        <Tabs tabs={tabs} activeTab={activeTab} onTabClick={setActiveTab} />
        <div
          className="notification-drawer-forms-cotainer__content"
          // onSubmit={onSubmit}
        >
          {activeTab === "Address" ? (
            <DrawerFormsAddress
              errors={errors}
              control={control}
              cities={cities}
              districts={districts}
              neighbourhoods={neighbourhoods}
              fullAddressData={fullAddressData}
              ompData={ompData}
              addressSelectOptions={addressSelectOptions}
              city={city}
              district={district}
              neighborhood={neighborhood}
              chosenStationId={chosenStationId}
              {...loadingStates}
              cbsDetail={cbsDetail}
              cbsDetailLoading={cbsDetailLoading}
              cbsDetailFetching={cbsDetailFetching}
              watch={watch}
            />
          ) : (
            <DrawerFormsOmp
              errors={errors}
              control={control}
              ompSelectOptions={ompSelectOptions}
              cbsDetail={cbsDetail}
              cbsDetailLoading={cbsDetailLoading}
              cbsDetailFetching={cbsDetailFetching}
              watch={watch}
            />
          )}
          <button type="submit" style={{ display: "none" }} />
        </div>
      </div>
    </Drawer>
  );
};
