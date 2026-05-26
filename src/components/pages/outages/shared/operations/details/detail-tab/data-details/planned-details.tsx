import { AlertSvg } from "@/assets/icons/alert-svg";
import { PinSvg } from "@/assets/icons/pin-svg";
import { EditPenSvg } from "@/assets/icons/edit-pen-svg";

import {
  detailsLocationData,
  detailsOutageDataSimplified,
  detailsWorkOrdersData,
  plannedDetailsOutageData,
} from "@/helpers/data/outage";

import {
  OutageCauseTypes,
  OutageReasonTypes,
  OutageStatusTypes,
  PlannedOutageStatusTypes,
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
import { WorkOrderNotSent } from "./no-work-order";
import { useCallback } from "react";
import { useSendOutageWfmNow } from "@/hooks/outage/use-send-outage-wfm-now";

const steps = [
  { key: "Opened", label: "Başladı" },
  { key: "Assigned", label: "Yolda" },
  { key: "CrewsDispatched", label: "Çalışıyor" },
  { key: "Completed", label: "Tamamlandı" },
];

type Props = {
  data: any;
  outageData: any;
  addressData: any;
  t: any;
  setShowModal: (v: boolean) => void;
  refetchOutageDetail: () => Promise<any>;
};
export const PlannedDetails = ({
  data,
  outageData,
  addressData,
  t,
  setShowModal,
  refetchOutageDetail,
}: Props) => {
  const hasWfm = Boolean(outageData?.wfmExternalId);
  const sendWorkOrderNow = useSendOutageWfmNow();

  const handleSendNow = useCallback(() => {
    sendWorkOrderNow.mutate(
      {
        outageId: outageData?.outageId,
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
          <span className="title">Plan Detayları</span>
        </div>
        <div className="data-details__item-body">
          <div style={{ width: "100%" }}>
            <DetailKeyValueList
              columns={2}
              items={plannedDetailsOutageData?.map((cfg): DetailItem => {
                let returnedValue = data?.data?.[cfg?.value];
                if (returnedValue) {
                  if (
                    cfg?.value === "plannedEndDateTime" ||
                    cfg?.value === "plannedStartDateTime"
                  ) {
                    returnedValue = dateFormater(returnedValue);
                  }
                  if (cfg?.value === "plannedOutageStatusTypeId") {
                    returnedValue =
                      PlannedOutageStatusTypes[Number(returnedValue)];
                  }
                }

                return {
                  label: cfg?.title ?? "",
                  labelSlot: (
                    <DetailHoverTable
                      item={cfg}
                      data={plannedDetailsOutageData}
                    />
                  ),
                  value: t(`Enum.${returnedValue}`, {
                    defaultValue: returnedValue ?? "-",
                  }),
                };
              })}
            />
          </div>
        </div>
      </div>
      {outageData ? (
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
                items={detailsOutageDataSimplified?.map((cfg): DetailItem => {
                  const key = cfg.value as keyof typeof outageData;
                  let returnedValue = outageData?.[key];
                  if (returnedValue) {
                    if (cfg?.value === "outageStatusTypeId") {
                      returnedValue = OutageStatusTypes[Number(returnedValue)];
                    }
                    if (cfg?.value === "subjectTypeId") {
                      returnedValue = SubjectTypes[Number(returnedValue)];
                    }
                    if (cfg?.value === "outageReasonTypeId") {
                      returnedValue = OutageReasonTypes[Number(returnedValue)];
                    }
                    if (cfg?.value === "outageCauseTypeId") {
                      returnedValue = OutageCauseTypes[Number(returnedValue)];
                    }
                    if (
                      cfg?.value === "startDateTime" ||
                      cfg?.value === "endDateTime"
                    ) {
                      returnedValue = dateFormater(returnedValue as string);
                    }
                  }
                  return {
                    label: cfg?.title ?? "",
                    labelSlot: (
                      <DetailHoverTable item={cfg} data={outageData} />
                    ),
                    value: t(`Enum.${returnedValue}`, {
                      defaultValue: returnedValue ?? "-",
                    }),
                  };
                })}
              />
            </div>
          </div>
        </div>
      ) : null}

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

        {outageData && outageData?.outageStatusTypeId == 1 ? (
          <div className="data-details__item">
            <div className="data-details__item-header">
              <div className="icon">
                <AlertSvg stroke="#1570EF" />
              </div>
              <span className="title">İş Emri Detayları</span>
            </div>
            <div className="data-details__item-body">
              {hasWfm ? (
                <div style={{ width: "100%" }}>
                  <DetailKeyValueList
                    columns={1}
                    items={[
                      ...(detailsWorkOrdersData?.map((cfg): DetailItem => {
                        const key = cfg.value as keyof typeof outageData;
                        const dataValue = outageData?.[key];
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
                                Number(outageData?.workForceStatusTypeId)
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
                        outageData?.sendingDelayedUntilDateTime
                      }
                      onSendNow={handleSendNow}
                      isSending={sendWorkOrderNow.isPending}
                      refetchOutageDetail={refetchOutageDetail}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
