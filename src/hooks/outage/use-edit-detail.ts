import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAddressData } from "../notifications/use-address-data";
import { editDetailOutageSchema } from "@/validations/outage/edit-detail-validation-modal";
import { usePostDetailCHange } from "./use-post-detail-change";
import { useToast } from "@/providers/toast-provider";
import { useQueryClient } from "@tanstack/react-query";
import { useGetAddressCbsId } from "./use-get-address-cbsId";
import { useDebounce } from "./use-debounce";

export const useEditDetailFormLogic = ({
  addressData,
  data,
  onClose,
}: {
  data?: any;
  addressData?: any;
  onClose: () => void;
}) => {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState("address");
  const [autoFill, setAutoFill] = useState(true);
  type DrawerFormValues = {
    city: string;
    district: string;
    neighborhood: string;
    stationId: string | number;
    cbsId: string;
  };
  const defaultValues: DrawerFormValues = {
    city: addressData?.responseList?.[0]?.cityCode || "",
    district: addressData?.responseList?.[0]?.districtCode || "",
    neighborhood: addressData?.responseList?.[0]?.neighbourhoodCode || "",
    stationId: data?.stationId || "",
    cbsId: data?.cbsId || "",
  };
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(editDetailOutageSchema),
    defaultValues,
  });
  const initialCbsId = data?.cbsId || "";

  const city = watch("city");
  const district = watch("district");
  const neighborhood = watch("neighborhood");
  const chosenStationId = watch("stationId");
  const cbsId = watch("cbsId");
  const debouncedCbsId = useDebounce(cbsId, 500); // wait 2s

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
  });
  const { data: cbsAddressData, isLoading: cbsAddressLoading } =
    useGetAddressCbsId({
      cbsId: debouncedCbsId,
      activeTab,
      initialCbsId,
    });
  useEffect(() => {
    reset(defaultValues);
  }, [activeTab]);

  useEffect(() => {
    if (autoFill) {
      setAutoFill(false);
      return;
    }
    const clearForm = {
      district: "",
      neighborhood: "",
      cbsId: "",
      stationId: "",
    };
    reset((prev) => ({ ...prev, ...clearForm }));
  }, [city]);
  useEffect(() => {
    if (cbsAddressData?.responseList?.[0]) {
      const d = cbsAddressData.responseList[0];

      reset((prev) => ({
        ...prev,
        city: d?.cityCode,
        district: d?.districtCode,
        neighborhood: d?.neighbourhoodCode,
        stationId: d?.stationId,
      }));
    }
  }, [cbsAddressData, reset]);
  const mutation = usePostDetailCHange();
  const queryClient = useQueryClient();

  const onSubmit = (values: typeof defaultValues) => {
    mutation.mutate(
      { cbsId: values?.cbsId, outageId: data?.outageId },
      {
        onSuccess: (response) => {
          const { responseStatusCode, responseMessage } = response || {};
          const message = responseMessage || "Bilinmeyen hata";

          if ([600, 601, 602].includes(responseStatusCode)) {
            showToast(message, "error");
            return;
          }

          showToast("İşleminiz başarıyla gerçekleştirilmiştir.", "success");
          queryClient.invalidateQueries({
            queryKey: ["GetOutageDetailWithOutage"],
          });

          reset(defaultValues);
          setAutoFill(false);
          onClose();
        },
        onError: (error: any) => {
          const responseMessage =
            error?.data?.error?.message ?? "İşlem Başarısız"; // Fallback message

          showToast(responseMessage, "error");
        },
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
    ompData,
    loadingStates,
    cbsAddressLoading,
  };
};
