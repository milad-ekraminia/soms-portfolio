import { AlertSvg } from "@/assets/icons/alert-svg";
import { PinSvg } from "@/assets/icons/pin-svg";
import { detailsLocationData, detailsOutageData } from "@/helpers/data/outage";

import { Loader } from "@/components/ui/loader/loader";
import {
  OutageCauseTypes,
  OutageReasonTypes,
  OutageStatusTypes,
  SubjectTypes,
} from "@/definitions/enum";
import { useTranslation } from "react-i18next";
import { useDetailLocation } from "@/hooks/outage/use-detail-location";
import {
  DetailKeyValueList,
  DetailItem,
} from "@/components/ui/detail-key-value-list/detail-key-value-list";

const DataDetails = ({ data, isDetailLoading }: any) => {
  const { t } = useTranslation();
  const { data: addressData, isLoading } = useDetailLocation({
    stationId: data?.stationId,
  });
  return isDetailLoading || isLoading ? (
    <Loader />
  ) : (
    <div className="data-details">
      <div className="data-details__item">
        <div className="data-details__item-header">
          <div className="icon">
            <AlertSvg stroke="#1570EF" />
          </div>
          <span className="title">Kesinti Detayları</span>
        </div>
        <div className="data-details__item-body">
          <DetailKeyValueList
            columns={2}
            items={detailsOutageData?.map((cfg): DetailItem => {
              let returnedValue = data?.[cfg?.value];
              if (returnedValue) {
                if (cfg?.value === "outageStatusTypeId") {
                  returnedValue = OutageStatusTypes[returnedValue];
                }
                if (cfg?.value === "subjectTypeId") {
                  returnedValue = SubjectTypes[returnedValue];
                }
                if (cfg?.value === "outageReasonTypeId") {
                  returnedValue = OutageReasonTypes[returnedValue];
                }
                if (cfg?.value === "outageCauseTypeId") {
                  returnedValue = OutageCauseTypes[returnedValue];
                }
              }
              return {
                label: cfg?.title ?? "",
                value: t(`Enum.${returnedValue}`, {
                  defaultValue: returnedValue ?? "-",
                }),
              };
            })}
          />
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
          <div style={{ width: "50%" }}>
            <DetailKeyValueList
              columns={1}
              items={detailsLocationData?.map((cfg): DetailItem => {
                const returnedValue =
                  addressData?.responseList?.[0]?.[cfg?.value];
                return {
                  label: cfg?.title ?? "",
                  value: returnedValue ?? "-",
                };
              })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataDetails;
