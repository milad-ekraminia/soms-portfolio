import { AlertSvg } from "@/assets/icons/alert-svg";
import { PinSvg } from "@/assets/icons/pin-svg";
import { SourceSystems } from "@/definitions/enum";
import {
  notificationDetailsData,
  notificationDetailsLocationData,
} from "@/helpers/data/notification";
import { useTranslation } from "react-i18next";
import { DetailTableLog } from "./detail-table-log";
import { NotificationItemType } from "@/types/components/pages/notification";
import { useNotificationDetail } from "@/hooks/notifications/use-notification-detail";
import { Loader } from "@/components/ui/loader/loader";
import {
  DetailKeyValueList,
  DetailItem,
} from "@/components/ui/detail-key-value-list/detail-key-value-list";
import { DocumentSvg } from "@/assets/icons/document-svg";
interface DetailsProps {
  notificationId: number;
}
const Details = ({ notificationId }: DetailsProps) => {
  const { t } = useTranslation();
  const { data, isLoading, isPending } = useNotificationDetail({
    notificationId,
  });
  return (
    <div className="data-details">
      {isLoading || isPending ? (
        <Loader />
      ) : (
        <>
          {" "}
          <div className="data-details__item">
            <div className="data-details__item-header">
              <div className="icon">
                <AlertSvg stroke="var(--border-brand)" />
              </div>
              <span className="title">Detay bilgisi</span>
            </div>
            <div className="data-details__item-body">
              <div style={{ width: "100%" }}>
                <DetailKeyValueList
                  items={notificationDetailsData?.map((cfg): DetailItem => {
                    const key = cfg?.value as
                      | keyof NotificationItemType
                      | undefined;
                    let returnedValue = key ? data?.[key] : undefined;
                    if (returnedValue && cfg?.value === "sourceName") {
                      returnedValue =
                        SourceSystems[
                          returnedValue as unknown as keyof typeof SourceSystems
                        ];
                    }
                    return {
                      label: cfg?.title ?? "",
                      value: t(`Enum.${String(returnedValue)}`, {
                        defaultValue: String(returnedValue ?? "-"),
                      }),
                    };
                  })}
                  columns={2}
                />
              </div>
            </div>
          </div>
          <div className="data-details__item">
            <div className="data-details__item-header">
              <div className="icon">
                <PinSvg stroke="var(--border-brand)" />
              </div>
              <span className="title">Lokasyon Detaylar</span>
            </div>
            <div className="data-details__item-body">
              <div style={{ width: "50%" }}>
                <DetailKeyValueList
                  items={notificationDetailsLocationData?.map(
                    (cfg): DetailItem => {
                      const key = cfg?.value as
                        | keyof NotificationItemType
                        | undefined;
                      const value = key ? data?.[key] : undefined;
                      return {
                        label: cfg?.title ?? "",
                        value: value ?? "-",
                      };
                    }
                  )}
                  columns={1}
                />
              </div>
            </div>
          </div>
        </>
      )}
      <div className="data-details__item">
        <div className="data-details__item-header">
          <div className="icon">
            <DocumentSvg stroke="var(--border-brand)" />
          </div>
          <span className="title">Log Detayları</span>
        </div>
        <div className="data-details__item-body">
          <div className="notification-detail-table">
            <DetailTableLog notificationId={notificationId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
