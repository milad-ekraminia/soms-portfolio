import { useState } from "react";
import { Loader } from "@/components/ui/loader/loader";

import { useTranslation } from "react-i18next";
import { useDetailLocation } from "@/hooks/outage/use-detail-location";

import { EditDataDetail } from "../edit-data-details";

import { useOutageDetailWithOutage } from "@/hooks/outage/use-get-detail-drawer";
import { EditDateDrawer } from "../edit-date-drawer/edit-date-drawer";
import { PlannedDetails } from "./planned-details";
import { UnplannedDetails } from "./unplanned-details";

const DataDetails = ({ data, isDetailLoading, drawerType, refetchOutageDetail }: any) => {
  const [showModal, setShowModal] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const { t } = useTranslation();

  const { data: addressData, isLoading } = useDetailLocation({
    stationId:
      drawerType == "plannedOutage" ? data?.data?.stationId : data?.stationId,
  });
  const { data: outageData, isLoading: outageLoading,refetch } =
    useOutageDetailWithOutage({
      outageId: data?.data?.outageId,
      forceEnabled: !!data?.data?.outageId && drawerType == "plannedOutage",
    });
  if (isDetailLoading || outageLoading || isLoading) return <Loader />;

  return (
    <>
      {/* <div className="data-details">
        {drawerType == "plannedOutage" ? (
          <>
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
                      items={detailsOutageDataSimplified?.map(
                        (cfg): DetailItem => {
                          const key = cfg.value as keyof typeof outageData;
                          let returnedValue = outageData?.[key];
                          if (returnedValue) {
                            if (cfg?.value === "outageStatusTypeId") {
                              returnedValue =
                                OutageStatusTypes[Number(returnedValue)];
                            }
                            if (cfg?.value === "subjectTypeId") {
                              returnedValue =
                                SubjectTypes[Number(returnedValue)];
                            }
                            if (cfg?.value === "outageReasonTypeId") {
                              returnedValue =
                                OutageReasonTypes[Number(returnedValue)];
                            }
                            if (cfg?.value === "outageCauseTypeId") {
                              returnedValue =
                                OutageCauseTypes[Number(returnedValue)];
                            }
                            if (
                              cfg?.value === "startDateTime" ||
                              cfg?.value === "endDateTime"
                            ) {
                              returnedValue = dateFormater(
                                returnedValue as string
                              );
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
                        }
                      )}
                    />
                  </div>
                </div>
              </div>
            ) : null}
          </>
        ) : null}
        {drawerType == "outage" ? (
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
                  className={getClassNames("header-action", [
                    [data?.outageStatusTypeId != 1, "disabled"],
                  ])}
                  onClick={() => {
                    setShowModal(true);
                  }}
                  disabled={data?.outageStatusTypeId != 1}
                >
                  <EditPenSvg
                    stroke={
                      data?.outageStatusTypeId != 1 ? "#98A2B3" : undefined
                    }
                  />
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
          {drawerType == "outage" ? (
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
                    // className="header-action"
                    className={getClassNames("header-action", [])}
                    onClick={() => {
                      setOpenDrawer(true);
                    }}
                  >
                    <EditPenSvg />
                    <span>Düzenle</span>
                    <div className="header-action-tooltip">
                      <span className="text">
                      </span>
                    </div>
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
          ) : null}
          {outageData || drawerType == "outage" ? (
            <div className="data-details__item">
              <div className="data-details__item-header">
                <div className="icon">
                  <AlertSvg stroke="#1570EF" />
                </div>
                <span className="title">İş Emri Detayları</span>
              </div>
              <div className="data-details__item-body">
                <div style={{ width: "100%" }}>
                  <DetailKeyValueList
                    columns={1}
                    items={[
                      ...(detailsWorkOrdersData?.map((cfg): DetailItem => {
                        const key = cfg.value as keyof typeof outageData;
                        const dataValue =
                          drawerType == "outage"
                            ? data?.[key]
                            : outageData?.[key];
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
                                Number(
                                  drawerType == "outage"
                                    ? data?.workForceStatusTypeId
                                    : outageData?.workForceStatusTypeId
                                )
                              ] ?? "started"
                            }
                          />
                        ),
                      },
                    ]}
                  />
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div> */}
      {drawerType === "plannedOutage" ? (
        <PlannedDetails
          data={data}
          addressData={addressData}
          setShowModal={setShowModal}
          outageData={outageData}
          t={t}
          refetchOutageDetail={refetch}
        />
      ) : (
        <UnplannedDetails
          data={data}
          addressData={addressData}
          t={t}
          setShowModal={setShowModal}
          setOpenDrawer={setOpenDrawer}
          refetchOutageDetail={refetchOutageDetail}
        />
      )}
      <EditDataDetail
        setShowEdit={setShowModal}
        showEdit={showModal}
        data={data}
        addressData={addressData}
      />
      <EditDateDrawer
        isOpen={openDrawer}
        onClose={() => {
          setOpenDrawer(false);
        }}
        data={data}
      />
    </>
  );
};

export default DataDetails;
