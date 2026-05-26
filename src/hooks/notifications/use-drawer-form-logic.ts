// hooks/useDrawerFormLogic.ts
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/providers/toast-provider";
import {
  useCreateUnplannedOutage,
  useUnplannedOutageFromExistingNotifications,
  useStationIdFromCbsId,
} from "@/hooks/notifications";
import {
  cbsSchema,
  createUnplannedOutageSchema,
  DrawerFormValues,
} from "@/validations/notifications/drawer-forms";
import { useUnplannedOutageAutofill } from "./use-unplanned-outage-autofill";
import { useAddressData } from "./use-address-data";
import { useCbsDetail } from "../use-cbs-detail";

export const useDrawerFormLogic = ({
  selectedRows,
  data,
  onClose,
  isOpen,
}: {
  selectedRows?: any;
  data?: any;
  onClose: () => void;
  isOpen?: boolean;
}) => {
  const [activeTab, setActiveTab] = useState<"Address" | "CBS">("Address");
  const [autoFill, setAutoFill] = useState(false);
  const [hasAutoFilled, setHasAutoFilled] = useState(false);

  const schema = useMemo(
    () => (activeTab === "Address" ? createUnplannedOutageSchema : cbsSchema),
    [activeTab]
  );

  const defaultValuesByTab: Record<"Address" | "CBS", DrawerFormValues> = {
    Address: {
      city: "",
      district: "",
      neighborhood: "",
      stationId: "",
      cbsId: "",
      complaint: "",
      importance: "",
      description: "",
    },
    CBS: {
      cbsId: "",
      complaint: "",
      importance: "",
      description: "",
    },
  };
  const defaultValues = defaultValuesByTab[activeTab];

  const {
    control,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<DrawerFormValues>({
    resolver: yupResolver(schema) as any,
    defaultValues: defaultValuesByTab[activeTab],
    mode: "onSubmit",
  });

  const city = watch("city");
  const district = watch("district");
  const neighborhood = watch("neighborhood");
  const chosenStationId = watch("stationId");
  const selectedCbsId = watch("cbsId");

  const {
    cities,
    districts,
    neighbourhoods,
    fullAddressData,
    ompData,
    loadingStates,
  } = useAddressData({
    city,
    district,
    neighborhood,
    stationId: chosenStationId,
    selectedRows,
    enabled: isOpen,
  });

  const cbsIds = selectedRows?.map((selectedRow: any) => {
    const notifItem = data?.find(
      (item: any) => selectedRow === item?.notificationId
    );
    return notifItem?.componentGisId;
  });

  const stationIds = useStationIdFromCbsId({ cbsIds, enabled: isOpen });
  const autoFilledData = useUnplannedOutageAutofill({
    stationId: stationIds?.data,
    enabled: isOpen,
  });
  const {
    data: cbsDetail,
    isLoading: cbsDetailLoading,
    isFetching: cbsDetailFetching,
    refetch: refetchCbsDetail,
  } = useCbsDetail({
    cbsId: selectedCbsId,
    enabled: isOpen, // only while drawer open
  });

  useEffect(() => {
    if (!isOpen) return;
    if (!selectedCbsId) return;
    refetchCbsDetail();
  }, [selectedCbsId, isOpen, refetchCbsDetail]);
  // Auto-fill logic
  useEffect(() => {
    if (!isOpen) return;

    const data = autoFilledData?.[0];
    const shouldAutofill =
      cbsIds?.length === selectedRows?.length && stationIds && data;

    if (shouldAutofill && !hasAutoFilled) {
      setValue("city", data.cityCode);
      setAutoFill(true);
      setHasAutoFilled(true);
    }
  }, [
    cbsIds,
    stationIds,
    selectedRows,
    autoFilledData,
    hasAutoFilled,
    setValue,
    isOpen,
  ]);

  useEffect(() => {
    if (!isOpen) return;
    const data = autoFilledData?.[0];
    if (!data || !districts?.length) return;

    const exists = districts.some(
      (d: any) => d.districtCode === data.districtCode
    );
    if (exists) setValue("district", data.districtCode);
  }, [districts, autoFilledData, setValue, isOpen, selectedRows]);

  useEffect(() => {
    if (!isOpen) return;

    const data = autoFilledData?.[0];
    if (!data || !neighbourhoods?.length) return;

    const exists = neighbourhoods.some(
      (n: any) => n.neighbourhoodCode === data.neighbourhoodCode
    );
    if (exists) setValue("neighborhood", data.neighbourhoodCode);
  }, [neighbourhoods, autoFilledData, setValue, isOpen, selectedRows]);
  useEffect(() => {
    if (!isOpen) return;

    const data = stationIds?.data;
    if (!data || !fullAddressData?.length) return;

    const exists = fullAddressData.some((n: any) => n.stationId === data);
    if (exists) setValue("stationId", data);
  }, [fullAddressData, data, setValue, isOpen, selectedRows]);

  useEffect(() => {
    if (!isOpen) return;

    const data = stationIds?.data;
    if (!data || !ompData?.length) return;

    const ompItem = ompData.find((n: any) => n.stationId === data);
    if (ompItem) setValue("cbsId", ompItem.cbsid);
  }, [stationIds, ompData, setValue, isOpen, selectedRows]);
  useEffect(() => {
    if (!isOpen) return;

    const emptyForm = {
      city: "",
      district: "",
      neighborhood: "",
      complaint: "",
      importance: "",
      description: "",
      cbsId: "",
      stationId: "",
    };
    reset(emptyForm);
  }, [activeTab, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    if (autoFill) {
      setAutoFill(false);
      return;
    }
    const clearForm = {
      district: "",
      neighborhood: "",
      complaint: "",
      importance: "",
      description: "",
      cbsId: "",
      stationId: "",
    };
    reset((prev) => ({ ...prev, ...clearForm }));
  }, [city, isOpen]);

  const createUnplannedOutage = useCreateUnplannedOutage();
  const createUnplannedOutageFromExisting =
    useUnplannedOutageFromExistingNotifications();
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const keysToInvalidate = [
    ["NotificationGrid"],
    ["ActiveNotificationCount"],
    ["CancelNotificationCount"],
    ["OutagesAssignedNotificationCount"],
  ];

  const onSubmit = (values: typeof defaultValues) => {
    const dataParams: any = {
      cbsId: values.cbsId,
      subjectType: values.complaint,
      priorityType: values.importance,
      description: values.description,
    };
    const mutation = selectedRows?.length
      ? createUnplannedOutageFromExisting
      : createUnplannedOutage;

    if (selectedRows?.length) {
      dataParams.notificationIds = selectedRows;
    }

    mutation.mutate(
      { dataParams },
      {
        onSuccess: (response) => {
          const { responseStatusCode, responseMessage } = response || {};
          const message = responseMessage || "Bilinmeyen hata";

          if ([600, 601, 602].includes(responseStatusCode)) {
            showToast(message, "error");
            return;
          }
          if ([204].includes(responseStatusCode)) {
            showToast("İşleminiz başarıyla gerçekleştirilmiştir.", "success");
          } else {
            const outageIds = response?.responseList?.map(
              (item: any) => item.id
            );
            const successMessage =
              outageIds?.length === 1
                ? `${outageIds[0]} numaralı kesinti oluşturuldu.`
                : `${outageIds.join(", ")} numaralı kesintiler oluşturuldu.`;
            showToast(successMessage, "success");
          }
          keysToInvalidate.forEach((key) =>
            queryClient.invalidateQueries({ queryKey: key })
          );
          reset(defaultValues);
          setAutoFill(false);
          onClose();
        },
        onError: (err: any) => {
          console.log(
            "mutation error",
            err?.response?.status,
            err?.response?.data,
            err
          );

          showToast("İşlem Başarısız", "error");
        },
      }
    );
  };
  useEffect(() => {
    if (!isOpen) return;

    // Whenever selectedRows changes, reset the entire form to its default state
    reset(defaultValues);
    setHasAutoFilled(false); // allow auto-fill logic to run again for new selection
    setAutoFill(false);
  }, [selectedRows, reset, isOpen]);
  return {
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
  };
};
