// useOutageActions.ts
import { useToast } from "@/providers/toast-provider";
import { openDrawer } from "@/store/app/drawer-slice";
import { useQueryClient } from "@tanstack/react-query";
import { Fragment, JSX, useState } from "react";
import { useDispatch } from "react-redux";
import {
  useDeleteAwaitingPlannedOutage,
  useDeleteOutage,
  usePlannedOutageConfirm,
} from "./outage";

interface DrawerValues {
  title: string;
  type: string;
  formType: string;
}

interface ModalValues {
  title: string;
  description: string;
  type: string;
  text: JSX.Element | null;
  values?: any;
}

export const useOutageActions = (
  tableName: any = "unPlanned",
  setSelectedRows?: any
) => {
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const queryClient = useQueryClient();
  // State variables
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerValues, setDrawerValues] = useState<DrawerValues>({
    title: "",
    type: "",
    formType: "",
  });
  const [modalValues, setModalValues] = useState<ModalValues>({
    title: "",
    description: "",
    type: "",
    text: null,
    values: null,
  });
  const [treeChartModal, setTreeChartModal] = useState(false);
  const [modalSize, setModalSize] = useState<"lg" | "full">("lg");
  const [cancelationStep, setCancelationStep] = useState(0);
  const [tableDrawer, setTableDrawer] = useState(false);

  // Handlers
  const closeDrawer = () => {
    setTreeChartModal(false);
  };

  const modalSizeHanlder = () => {
    setModalSize(modalSize === "lg" ? "full" : "lg");
  };

  const handleCancel = () => {
    setCancelationStep(0);
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setCancelationStep(0);
    setIsModalOpen(false);
    setModalValues({ title: "", description: "", type: "", text: null });
  };
  const deleteOutageMutation = useDeleteOutage();
  const deletePlannedAwaitingOutageMutation = useDeleteAwaitingPlannedOutage();
  const plannedOutageConfirm = usePlannedOutageConfirm();
  const plannedOutageConfirmPending = plannedOutageConfirm.isPending;

  const plannedOutagePageKeys = [
    ["awaitingPlannedoutages"],
    ["approvedPlannedoutages"],
    ["GetPlannedStatusCountOne"],
    ["GetPlannedStatusCountTwo"],
    ["GetPlannedStatusCountThree"],
  ];
  const unPlannedOutageKeys = [
    ["activeUnplannedOutage"],
    ["energizedOutage"],
    ["archiveOutageCount"],
    ["outages"],
  ];
  const handleConfirm = ({
    chosenRows,
    formValues,
    onSuccess,
  }: {
    chosenRows: number[];
    formValues?: { reason: number; description?: string };
    onSuccess?: any;
  }) => {
    if (modalValues.type === "cancel-notif") {
      if (cancelationStep === 0) {
        setCancelationStep(1);
      } else {
        if (tableName == "awaiting" || tableName == "approved") {
          if (!formValues) return; // guard for safety

          deletePlannedAwaitingOutageMutation.mutate(
            {
              list: chosenRows,
              status: formValues?.reason,
              description: formValues?.description,
            },
            {
              onSuccess: () => {
                showToast(
                  "İşleminiz başarıyla gerçekleştirilmiştir.",
                  "success"
                );
                plannedOutagePageKeys.forEach((key) =>
                  queryClient.invalidateQueries({ queryKey: key })
                );
                if (modalValues.type === "cancel-notif") {
                  setCancelationStep(0);
                  setIsModalOpen(false);
                }
                onSuccess?.();
                if (setSelectedRows) setSelectedRows([]);
              },
            }
          );
        } else {
          if (!formValues) return; // guard for safety

          deleteOutageMutation.mutate(
            {
              list: chosenRows,
              status: formValues?.reason,
              description: formValues?.description,
            },
            {
              onSuccess: () => {
                showToast(
                  "İşleminiz başarıyla gerçekleştirilmiştir.",
                  "success"
                );
                unPlannedOutageKeys.forEach((key) =>
                  queryClient.invalidateQueries({ queryKey: key })
                );
                if (modalValues.type === "cancel-notif") {
                  setCancelationStep(0);
                  setIsModalOpen(false);
                }
                onSuccess?.();
              },
            }
          );
        }
      }
      if (modalValues.type !== "cancel-notif") {
        setCancelationStep(0);
        setIsModalOpen(false);
      }
    }
    if (modalValues.type === "planned-outage") {
      plannedOutageConfirm.mutate(
        {
          list: chosenRows,
        },
        {
          onSuccess: (data) => {
            showToast("İşleminiz başarıyla gerçekleştirilmiştir.", "success");
            plannedOutagePageKeys.forEach((key) =>
              queryClient.invalidateQueries({ queryKey: key })
            );
            if (modalValues.type === "planned-outage") {
              setSelectedRows([...chosenRows]);
              setIsModalOpen(false);
              optionsHandler("planned-outage-sms", [
                data?.data,
                [...chosenRows],
              ]);
            }
            if (modalValues.type !== "planned-outage" && setSelectedRows)
              setSelectedRows([]);
            onSuccess?.();
          },
        }
      );

      if (modalValues.type !== "planned-outage") {
        setCancelationStep(0);
        setIsModalOpen(false);
      }
    }
    // if (modalValues.type === "planned-outage") {
    //   plannedOutageConfirm.mutate(
    //     {
    //       list: chosenRows,
    //     },
    //     {
    //       onSuccess: () => {
    //         showToast("İşleminiz başarıyla gerçekleştirilmiştir.", "success");
    //         plannedOutagePageKeys.forEach((key) =>
    //           queryClient.invalidateQueries({ queryKey: key })
    //         );
    //         if (modalValues.type === "planned-outage") {
    //           setIsModalOpen(false);
    //         }
    //         if (setSelectedRows) setSelectedRows([]);
    //         onSuccess?.();
    //       },
    //     }
    //   );

    //   if (modalValues.type !== "planned-outage") {
    //     setCancelationStep(0);
    //     setIsModalOpen(false);
    //   }
    // }
  };

  /**
   * optionsHandler toggles modals/drawers and sets modal values based on the option.
   * You can pass an optional `selectedRows` array if needed.
   */
  const optionsHandler = (option: string, selectedRows?: number[]) => {
    switch (option) {
      case "cancel-notif":
        setIsModalOpen((prev) => !prev);
        setModalValues({
          title: "Kesinti İptali",
          description:
            selectedRows && selectedRows?.length > 1
              ? "Seçili kesinti veya kesintiler iptal edilip bu kesinti/kesintilere bağlı bildirimler açığa çıkacaktır. Onaylıyor musunuz?"
              : "",
          type: "cancel-notif",
          text: (
            <>
              {selectedRows && selectedRows?.length > 1 ? (
                <div className="operation-notif-body__button-list">
                  {selectedRows?.map((row, index) => (
                    <Fragment key={row}>
                      <span
                        className="operation-notif-body__item-id"
                        onClick={(e) => {
                          e.stopPropagation();
                          // TODO add rowdata after api setting

                          dispatch(
                            openDrawer({
                              title: "TBC524",
                              type: "outage",
                              id: row,
                              rowData: row,
                            })
                          );
                          handleCloseModal();
                        }}
                      >
                        {row}
                      </span>
                      {index !== selectedRows?.length - 1 && <>, </>}
                    </Fragment>
                  ))}
                  {` numaralı kesintiler iptal edilecektir. Onaylıyor musunuz?`}
                </div>
              ) : (
                <>
                  <span
                    className="operation-notif-body__item-id"
                    onClick={(e) => {
                      e.stopPropagation();
                      // TODO add rowdata after api setting

                      dispatch(
                        openDrawer({
                          title: "TBC524",
                          type: "outage",
                          id: selectedRows?.[0] ?? 0,
                          rowData: selectedRows?.[0],
                        })
                      );
                      handleCloseModal();
                    }}
                  >
                    {selectedRows?.[0]}
                  </span>
                  {` numaralı kesinti iptal edilecektir. Onaylıyor musunuz?`}
                </>
              )}
            </>
          ),
        });
        break;
      case "archive-notif":
        setIsModalOpen((prev) => !prev);
        setModalValues({
          title: "Kesintiyi Arşivle",
          description:
            "Seçtiğiniz kesintiler arşivlenecektir. Onaylıyor musunuz?",
          type: "archive-notif",
          text: <></>,
        });
        break;
      case "un-archive-notif":
        setIsModalOpen((prev) => !prev);
        setModalValues({
          title: "Kesintiyi Arşivden Kaldır",
          description:
            "Seçtiğiniz kesinti arşivden kaldırılacaktır. Onaylıyor musunuz?",
          type: "un-archive-notif",
          text: <></>,
        });
        break;
      case "tree":
        setTreeChartModal((prev) => !prev);
        break;
      case "data":
        setIsDrawerOpen((prev) => !prev);
        setDrawerValues({
          title: "TBC524",
          type: "data",
          formType: "",
        });
        break;
      case "energy":
        setIsDrawerOpen((prev) => !prev);
        setDrawerValues({
          title: "Kesintiye Enerji Ver",
          type: "energy",
          formType: "",
        });
        break;
      case "planned-outage":
        setIsModalOpen((prev) => !prev);
        setModalValues({
          title: "Planlı Kesintiyi Onayla",
          description:
            selectedRows && selectedRows?.length > 1
              ? "Seçtiğiniz planlı kesintiler onaylanacaktır. Onaylıyor musunuz?"
              : "",
          type: "planned-outage",
          text: (
            <>
              {selectedRows && selectedRows?.length > 1 ? (
                <div className="operation-notif-body__button-list">
                  {selectedRows?.map((row, index) => (
                    <Fragment key={row}>
                      <span
                        className="operation-notif-body__item-id"
                        onClick={(e) => {
                          e.stopPropagation();
                          // TODO add rowdata after api setting

                          dispatch(
                            openDrawer({
                              title: "TBC524",
                              type: "outage",
                              id: row,
                              rowData: row,
                            })
                          );
                          handleCloseModal();
                        }}
                      >
                        {row}
                      </span>
                      {index !== selectedRows?.length - 1 && <>, </>}
                    </Fragment>
                  ))}
                  {` numaralı planlı kesinti onaylanacaktır.Onaylıyor musunuz?`}
                </div>
              ) : (
                <>
                  <span
                    className="operation-notif-body__item-id"
                    onClick={(e) => {
                      e.stopPropagation();
                      // TODO add rowdata after api setting

                      dispatch(
                        openDrawer({
                          title: "TBC524",
                          type: "outage",
                          id: selectedRows?.[0] ?? 0,
                          rowData: selectedRows?.[0],
                        })
                      );
                      handleCloseModal();
                    }}
                  >
                    {selectedRows?.[0]}
                  </span>
                  {` numaralı planlı kesinti onaylanacaktır.Onaylıyor musunuz?`}
                </>
              )}
            </>
          ),
        });
        break;
      case "planned-outage-sms": {
        const ids = selectedRows as any;
        const rows = ids?.[0]?.items ?? [];

        const installationCount = rows.reduce(
          (total: any, item: any) => total + (item.installationCount || 0),
          0
        );

        setIsModalOpen((prev) => !prev);

        setModalValues({
          title: "SMS Gönderimini Onayla",
          description: "",
          type: "planned-outage-sms",
          values: selectedRows,
          text: (
            <>
              {rows.map((row: any, index: any) => (
                <Fragment key={row.id}>
                  <span
                    className="operation-notif-body__item-id"
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(
                        openDrawer({
                          title: "TBC524",
                          type: "plannedOutage",
                          id: row.id,
                          rowData: row,
                        })
                      );
                      handleCloseModal();
                    }}
                  >
                    {row.id}
                  </span>
                  {index !== rows.length - 1 && <>, </>}
                </Fragment>
              ))}

              {` numaralı planlı kesintiyi onayladınız. Bu kesintiden ${installationCount} abone etkilenecektir. SMS gönderilsin mi?`}
            </>
          ),
        });

        break;
      }
      case "sms":
        setIsModalOpen((prev) => !prev);
        setModalValues({
          title: "Manuel SMS Gönder",
          description: "",
          type: "sms",
          text: (
            <>
              Seçtiğiniz
              <button
                className="operation-notif-body__item-id"
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(
                    openDrawer({
                      title: "TBC524",
                      type: "outage",
                      id: 12345,
                      rowData: {},
                    })
                  );
                  handleCloseModal();
                }}
              >
                12345
              </button>{" "}
              numaralı kesinti için manuel SMS gönderilecektir.Onaylıyor
              musunuz?
            </>
          ),
        });
        break;
      case "merge-outages":
        setIsModalOpen((prev) => !prev);
        setModalValues({
          title: "Birleştirilen Kesintiler",
          description: "",
          type: "merge-outage",
          text: <></>,
        });
        break;
      case "create-rank":
        setIsDrawerOpen((prev) => !prev);
        setDrawerValues({
          title: "Kademe Oluştur",
          type: "create-rank",
          formType: "",
        });
        break;
      case "unplanned-sms":
        setIsDrawerOpen((prev) => !prev);
        setDrawerValues({
          title: "Manuel SMS Gönderimi",
          type: "unplanned-sms",
          formType: "",
        });
        break;
      default:
        break;
    }
  };

  return {
    // State values
    isModalOpen,
    isDrawerOpen,
    drawerValues,
    modalValues,
    treeChartModal,
    modalSize,
    cancelationStep,
    // State setters (if needed)
    setIsModalOpen,
    setIsDrawerOpen,
    setDrawerValues,
    setModalValues,
    setTreeChartModal,
    setCancelationStep,
    // Handlers
    closeDrawer,
    modalSizeHanlder,
    handleCancel,
    handleCloseModal,
    handleConfirm,
    optionsHandler,
    plannedOutageConfirmPending,
    setTableDrawer,tableDrawer
  };
};
