import { AlertSvg } from "@/assets/icons/alert-svg";
import { PinSvg } from "@/assets/icons/pin-svg";
import { detailsLocationData, detailsOutageData } from "@/helpers/data/outage";
import { useState } from "react";
import UpdateDataModal from "./update-data-modal";
import Drawer from "@/components/ui/drawer/drawer";
import { Loader } from "@/components/ui/loader/loader";
import { OutageStatusTypes } from "@/definitions/enum";
import { useTranslation } from "react-i18next";
import { useDetailLocation } from "@/hooks/outage/use-detail-location";

const DataDetails = ({ data, isDetailLoading }: any) => {
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirm = () => {
    setShowModal(false);
  };
  const { t } = useTranslation();
  const { data: addressData, isLoading } = useDetailLocation({
    stationId: data?.stationId,
  });
  return isDetailLoading || isLoading ? (
    <Loader />
  ) : (
    <>
      <div className="data-details">
        <div className="data-details__item">
          <div className="data-details__item-header">
            <div className="icon">
              <AlertSvg stroke="#1570EF" />
            </div>
            <span className="title">Kesinti Detayları</span>
          </div>
          <div className="data-details__item-body">
            {detailsOutageData?.map((item) => {
              let returnedValue = data?.[item?.value];
              if (returnedValue) {
                if (item?.value === "outageStatusTypeId") {
                  returnedValue = OutageStatusTypes[returnedValue];
                }
              }
              return (
                <div className="item" key={item?.id}>
                  <span className="title">{item?.title}</span>
                  <span>
                    {t(`Enum.${returnedValue}`, {
                      defaultValue: returnedValue ?? "-",
                    })}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="data-details__item">
          <div className="data-details__item-header">
            <div className="icon">
              <PinSvg stroke="#1570EF" />
            </div>
            <span className="title">Lokasyon Detayları</span>
          </div>
          <div className="data-details__item-body">
            {detailsLocationData?.map((item) => {
              const returnedValue =
                addressData?.responseList?.[0]?.[item?.value];
              return (
                <div className="item" key={item?.id}>
                  <span className="title">{item?.title}</span>
                  <span className="value">{returnedValue ?? "-"}</span>
                </div>
              );
            })}
          </div>
        </div>
        {/* <div className="data-details__item">
          <div className="data-details__item-header data-details__item-header-with-action">
            <div className="header-title">
              <div className="icon">
                <AlertSvg stroke="#1570EF" />
              </div>
              <span className="title">Kesinti Tamamlama Bilgileri</span>
            </div>
            <button
              className="header-action"
              onClick={() => {
                setShowModal(true);
              }}
            >
              <EditPenSvg stroke="#175CD3" />
              <span>Güncelle</span>
            </button>
          </div>
          <div className="data-details__item-body">
            {detailsCompletionData?.map((item) => (
              <div className="item" key={item?.id}>
                <span className="title">{item?.title}</span>
                <span className="value">{item?.value}</span>
              </div>
            ))}
          </div>
        </div> */}
      </div>
      <Drawer
        isOpen={showModal}
        onClose={handleCloseModal}
        title={"Kesinti Tamamlama Bilgileri"}
        onSubmit={handleConfirm}
        submitBtnText="Kaydet"
        closeBtnText="Vazgeç"
        size="lg"
      >
        <UpdateDataModal />
      </Drawer>
    </>
  );
};

export default DataDetails;
