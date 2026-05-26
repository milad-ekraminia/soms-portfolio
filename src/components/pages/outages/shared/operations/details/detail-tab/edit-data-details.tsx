import Modal from "@/components/ui/modal-wrapper/modal-wrapper";
import Tabs from "@/components/ui/tabs/tabs";

import { Button } from "@/components/ui/button/button";
import { useEditDetailFormLogic } from "@/hooks/outage/use-edit-detail";
import { EditDataDetailAdress } from "./edit-data-detail-address";
import { EditDataDetailCbs } from "./edit-data-detail-cbs";

const tabs = [
  { id: 0, title: "Adres", active: true, value: "address" },
  { id: 1, title: "CBS ID", active: false, value: "omp" },
];
export const EditDataDetail = ({
  setShowEdit,
  showEdit,
  addressData,
  data,
}: {
  showEdit: boolean;
  setShowEdit: any;
  data: any;
  addressData: any;
}) => {
  const {
    control,
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
    onSubmit,
    handleSubmit,
    cbsAddressLoading,
  } = useEditDetailFormLogic({
    data,
    addressData,
    onClose: () => {
      setShowEdit(false);
    },
  });

  return (
    <Modal onClose={() => setShowEdit(false)} isOpen={showEdit}>
      <div className="edit-data-detail-modal">
        <div className="edit-header">
          <span>Düzenle</span>
        </div>
        <div className="edit-body">
          <Tabs tabs={tabs} activeTab={activeTab} onTabClick={setActiveTab} />
          {activeTab == "address" ? (
            <EditDataDetailAdress
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
            <EditDataDetailCbs
              control={control}
              cities={cities}
              districts={districts}
              neighbourhoods={neighbourhoods}
              fullAddressData={fullAddressData}
              ompData={ompData}
              cbsAddressLoading={cbsAddressLoading}
            />
          )}
        </div>
        <div className="edit-footer">
          <Button variant="secondary">İptal Et</Button>
          <Button variant="primary" onClick={handleSubmit(onSubmit)}>
            Kaydet
          </Button>
        </div>
      </div>
    </Modal>
  );
};
