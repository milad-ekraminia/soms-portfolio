import { AlertSvg } from "@/assets/icons/alert-svg";
import { PinSvg } from "@/assets/icons/pin-svg";
import { ClockSvg } from "@/assets/icons/clock-svg";
import { EditPenSvg } from "@/assets/icons/edit-pen-svg";

import {
  detailsDateData,
  detailsLocationData,
  detailsOutageData,
  detailsWorkOrdersData,
} from "@/helpers/data/outage";

import {
  OutageCauseTypes,
  OutageReasonTypes,
  OutageStatusTypes,
  SubjectTypes,
  WorkForceStatusTypes,
} from "@/definitions/enum";

import { getClassNames } from "@/helpers/get-class-names";
import { dateFormater } from "@/helpers/format-data";
import { DetailHoverTable } from "../detail-hover-table";

import {
  DetailKeyValueList,
  DetailItem,
} from "@/components/ui/detail-key-value-list/detail-key-value-list";

import { StatusStepper } from "@/components/ui/status-stepper/status-stepper";
import { useSendOutageWfmNow } from "@/hooks/outage/use-send-outage-wfm-now";
import { useCallback } from "react";
import { WorkOrderNotSent } from "./no-work-order";
const steps = [
  { key: "Opened", label: "Başladı" },
  { key: "Assigned", label: "Yolda" },
  { key: "CrewsDispatched", label: "Çalışıyor" },
  { key: "Completed", label: "Tamamlandı" },
];
type Props = {
  data: any;
  addressData: any;
  t: any;
  setShowModal: (v: boolean) => void;
  setOpenDrawer: (v: boolean) => void;
  refetchOutageDetail: () => Promise<any>;
};

export const UnplannedDetails = ({
  data,
  addressData,
  t,
  setShowModal,
  setOpenDrawer,
  refetchOutageDetail,
}: Props) => {
  const hasWfm = Boolean(data?.wfmExternalId);

  const sendWorkOrderNow = useSendOutageWfmNow();

  const handleSendNow = useCallback(() => {
    sendWorkOrderNow.mutate(
      {
        outageId: data?.outageId,
      },
      {
        onSuccess: async () => {
          await refetchOutageDetail();
        },
      }
    );
  }, [sendWorkOrderNow, data?.outageId]);
  return (
    <div className="data-details">
      <div className="data-details__item">
        <div className="data-details__item-header">
          <div className="icon">
            <AlertSvg stroke="#1570EF" />
          </div>
          <span className="title">Kesinti Detayları</span>
        </div>
        <div className="data-details__item-body">
          <div style={{ width: "100%" }}>
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
                  labelSlot: <DetailHoverTable item={cfg} data={data} />,
                  value: t(`Enum.${returnedValue}`, {
                    defaultValue: returnedValue ?? "-",
                  }),
                };
              })}
            />
          </div>
        </div>
      </div>

      <div className="two-grid">
        <div className="data-details__item">
          <div className="data-details__item-header">
            <div className="data-details__item-header-with-action">
              <div className="header-title">
                <div className="icon">
                  <PinSvg stroke="#1570EF" />
                </div>
                <span className="title">Lokasyon Detayları</span>
              </div>
              <button
                // className="header-action"
                className={getClassNames("header-action", [])}
                onClick={() => {
                  setShowModal(true);
                }}
              >
                <EditPenSvg />
                <span>Düzenle</span>
                <div className="header-action-tooltip">
                  <span className="text">
                    Sadece aktif kesintilerin adres bilgisi düzenlenebilir.
                  </span>
                </div>
              </button>
            </div>
          </div>
          <div className="data-details__item-body">
            <div style={{ width: "100%" }}>
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

        <div className="data-details__item">
          <div className="data-details__item-header">
            <div className="data-details__item-header-with-action">
              <div className="header-title">
                <div className="icon">
                  <ClockSvg stroke="#1570EF" />
                </div>
                <span className="title">Zaman Detayları </span>
              </div>
              <button
                className={getClassNames("header-action", [])}
                onClick={() => {
                  setOpenDrawer(true);
                }}
              >
                <EditPenSvg />
                <span>Düzenle</span>
              </button>
            </div>
          </div>
          <div className="data-details__item-body">
            <div style={{ width: "100%" }}>
              <DetailKeyValueList
                columns={1}
                items={detailsDateData?.map((cfg): DetailItem => {
                  let returnedValue = data?.[cfg?.value];
                  if (
                    cfg?.value === "startDateTime" ||
                    cfg?.value === "endDateTime"
                  ) {
                    returnedValue = dateFormater(returnedValue);
                  }
                  return {
                    label: cfg?.title ?? "",
                    value: returnedValue ?? "-",
                  };
                })}
              />
            </div>
          </div>
        </div>

        {!hasWfm && data?.outageStatusTypeId != 1 ? null : (
          <div className="data-details__item">
            <div className="data-details__item-header">
              <div className="icon">
                <AlertSvg stroke="#1570EF" />
              </div>
              <span className="title">İş Emri Detayları</span>
            </div>
            {hasWfm ? (
              <div style={{ width: "100%", padding: "var(--spacing-xl)" }}>
                <DetailKeyValueList
                  columns={1}
                  items={[
                    ...(detailsWorkOrdersData?.map((cfg): DetailItem => {
                      const key = cfg.value as keyof typeof data;
                      const dataValue = data?.[key];
                      let returnedValue = dataValue ?? "-";
                      if (cfg?.value === "estimatedEnergizationDateTime") {
                        returnedValue = dateFormater(returnedValue) ?? "-";
                      }
                      if (
                        returnedValue &&
                        cfg.value === "workForceStatusTypeId"
                      ) {
                        returnedValue = WorkForceStatusTypes[
                          Number(returnedValue)
                        ] as any;
                      }

                      return {
                        label: cfg?.title ?? "",
                        value: t(`Enum.${returnedValue}`, {
                          defaultValue: returnedValue ?? "-",
                        }),
                      };
                    }) ?? []),

                    {
                      fullRowSlot: (
                        <StatusStepper
                          steps={steps}
                          activeKey={
                            WorkForceStatusTypes[
                              Number(data?.workForceStatusTypeId)
                            ] ?? "started"
                          }
                        />
                      ),
                    },
                  ]}
                />
              </div>
            ) : (
              <div className="data-details__item">
                <div className="data-details__item-body">
                  <WorkOrderNotSent
                    sendingDelayedUntilDateTime={
                      data?.sendingDelayedUntilDateTime
                    }
                    onSendNow={handleSendNow}
                    isSending={sendWorkOrderNow.isPending}
                    refetchOutageDetail={refetchOutageDetail}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
