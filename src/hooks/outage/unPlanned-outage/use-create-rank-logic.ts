import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useToast } from "@/providers/toast-provider";

import { useAddressData } from "@/hooks/notifications/use-address-data";
import {
  createRankAddressSchema,
  createRankCbsSchema,
  CreateRankDrawerFormValues,
  RankDrawerFormValues,
} from "@/validations/outage/unplanned-outage/drawer-forms";
import { usePostCreateRank } from "./use-post-create-rank";
import { useGetAddressCbsId } from "@/hooks/outage/use-get-address-cbsId";
import { useDebounce } from "@/hooks/outage/use-debounce";
import { useStationIdFromCbsId } from "@/hooks/notifications";
import { useUnplannedOutageAutofill } from "@/hooks/notifications/use-unplanned-outage-autofill";

export const useCreateRankLogic = ({
  selectedRows,
  onClose,
  isOpen,
  outageData,
}: {
  selectedRows?: any;
  onClose: () => void;
  isOpen?: boolean;
  outageData?: any;
}) => {
  const [activeTab, setActiveTab] = useState<"Address" | "CBS">("Address");
  const [hasAutoFilled, setHasAutoFilled] = useState(false);
  const [autoFill, setAutoFill] = useState(false);

  // ---------------------- FORM ---------------------- //
  const schema = useMemo(
    () =>
      activeTab === "Address" ? createRankAddressSchema : createRankCbsSchema,
    [activeTab]
  );
  const defaultValuesByTab: Record<"Address" | "CBS", RankDrawerFormValues> = {
    Address: {
      city: "",
      district: "",
      neighborhood: "",
      stationId: "",
      cbsId: "",
    },
    CBS: {
      city: "",
      district: "",
      neighborhood: "",
      stationId: "",
      cbsId: "",
    },
  };
  const defaultValues = defaultValuesByTab[activeTab];

  const {
    control,
    handleSubmit,
    watch,
    reset,
    setValue,getValues,setError,
    formState: { errors },
  } = useForm<CreateRankDrawerFormValues>({
    resolver: yupResolver(schema) as any,
    defaultValues: defaultValuesByTab[activeTab],
    mode: "onSubmit",
  });

  const city = watch("city");
  const district = watch("district");
  const neighborhood = watch("neighborhood");
  const chosenStationId = watch("stationId");
  const cbsId = watch("cbsId");
  const debouncedCbsId = useDebounce(cbsId, 500);

  // ---------------------- Data Sources ---------------------- //

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

  const cbsIds = useMemo(() => {
    if (!selectedRows?.length || !outageData?.length) return [];
    return selectedRows
      .map(
        (row: any) => outageData?.find((o: any) => o.outageId === row)?.gisId
      )
      .filter(Boolean);
  }, [selectedRows, outageData]);

  const stationIds = useStationIdFromCbsId({ cbsIds, enabled: isOpen });
  const stationIdValue = stationIds?.data; // primitive

  const autoFilledData = useUnplannedOutageAutofill({
    stationId: stationIds?.data,
    enabled: isOpen,
  });

  const { data: cbsAddressData, isLoading: isCbsAddressLoading } =
    useGetAddressCbsId({
      cbsId: debouncedCbsId ?? cbsIds[0],
      activeTab,
      initialCbsId: "",
    });

  // Auto-fill logic
  useEffect(() => {
    if (!isOpen) return;
    if (activeTab !== "Address") return;

    const data = autoFilledData?.[0];
    const shouldAutofill =
      cbsIds?.length === selectedRows?.length && stationIds && data;

    if (shouldAutofill && !hasAutoFilled) {
      setValue("city", data.cityCode);
      setValue("district", "");
      setValue("neighborhood", "");
      setValue("stationId", "");
      setValue("cbsId", "");
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
    activeTab,
  ]);

  useEffect(() => {
    if (!isOpen) return;
    if (activeTab !== "Address") return;

    const data = autoFilledData?.[0];
    if (!data || !districts?.length) return;

    const exists = districts.some(
      (d: any) => d.districtCode === data.districtCode
    );
    if (exists) {
      setValue("neighborhood", "");
      setValue("stationId", "");
      setValue("cbsId", "");
      setValue("district", data.districtCode);
    }
  }, [districts, autoFilledData, setValue, isOpen, selectedRows, activeTab]);

  useEffect(() => {
    if (!isOpen) return;
    if (activeTab !== "Address") return;

    const data = autoFilledData?.[0];
    if (!data || !neighbourhoods?.length) return;

    const exists = neighbourhoods.some(
      (n: any) => n.neighbourhoodCode === data.neighbourhoodCode
    );
    if (exists) {
      setValue("stationId", "");
      setValue("cbsId", "");
      setValue("neighborhood", data.neighbourhoodCode);
    }
  }, [
    neighbourhoods,
    autoFilledData,
    setValue,
    isOpen,
    selectedRows,
    activeTab,
  ]);
  useEffect(() => {
    if (!isOpen) return;
    if (activeTab !== "Address") return;
    const data = stationIds?.data;
    if (!data || !fullAddressData?.length) return;

    const exists = fullAddressData.find((n: any) => n.stationId === data);
    if (exists) {
      setValue("cbsId", "");
      setValue("stationId", data);
    }
  }, [fullAddressData, outageData, setValue, isOpen, selectedRows, activeTab]);

  useEffect(() => {
    if (!isOpen) return;
    if (activeTab !== "Address") return;

    const data = stationIds?.data;
    if (!data || !ompData?.length) return;

    const ompItem = ompData.find((n: any) => n.stationId === chosenStationId);
    if (ompItem) setValue("cbsId", ompItem.cbsid);
  }, [
    stationIdValue,
    ompData,
    setValue,
    isOpen,
    selectedRows,
    chosenStationId,
    activeTab,
  ]);
  useEffect(() => {
    if (!isOpen) return;
    if (activeTab !== "Address") return;

    if (autoFill) {
      setAutoFill(false);
      return;
    }
    const clearForm = {
      district: "",
      neighborhood: "",
      stationId: "",
      cbsId: "",
    };
    reset((prev) => ({ ...prev, ...clearForm }));
  }, [city, isOpen]);
  useEffect(() => {
    if (!isOpen) return;

    reset(defaultValues);
    setHasAutoFilled(false);
    setAutoFill(false);
  }, [selectedRows, reset, isOpen]);

  useEffect(() => {
    if (activeTab == "CBS") return;
    setValue("cbsId", "");
  }, [chosenStationId, setValue, city, district, neighborhood, activeTab]);

  // =============================================================
  //                    💡 CBS TAB Autofill (Keep as-is)
  // =============================================================
  useEffect(() => {
    if (activeTab !== "CBS") return;

    const a = cbsAddressData?.responseList?.[0];

    reset((prev) => ({
      ...prev,
      city: a?.cityCode ?? null,
      district: a?.districtCode ?? null,
      neighborhood: a?.neighbourhoodCode ?? null,
      stationId: a?.stationId ?? null,
    }));
  }, [cbsAddressData, activeTab, reset]);

  // ---------------------- Submit ---------------------- //

  const createRank = usePostCreateRank();
  const { showToast } = useToast();

  const onSubmit = (values: CreateRankDrawerFormValues) => {
    const dataParams = {
      cbsId: values.cbsId,
      outageId: selectedRows?.[0],
    };

    createRank.mutate(
      { dataParams },
      {
        onSuccess: (data) => {
          showToast(data?.message, "success");
          reset(defaultValues);
          onClose();
        },
        onError: () => showToast("İşlem başarısız.", "error"),
      }
    );
  };

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
    ompData,watch,getValues,setError,
    loadingStates: {
      ...loadingStates,
      isCbsAddressLoading,
    },
  };
};
