import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import SelectInput from "@/components/ui/input/select-input/select-input";
import Drawer from "@/components/ui/drawer/drawer";
import DateInput from "@/components/ui/input/date-input/date-input";
import { useEnergizeInterruption } from "@/hooks/outage/use-energize-interruption";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/providers/toast-provider";
import {
  OutageCauseTypes,
  OutageReasonTypes,
  OutageSourceTypes,
} from "@/definitions/enum";
import { enumToOptions } from "@/helpers/enum-converter";
import { useTranslation } from "react-i18next";

const schema = yup.object().shape({
  outageReason: yup.string().required("Kesinti sebebi zorunludur."),
  outageCause: yup.string().required("Kesinti kaynağı zorunludur."),
  outageSource: yup.string().required("Kesintinin nesne türü zorunludur."),
  energizeTime: yup.string().required("Kesinti Bitiş Zamanı zorunludur."),
});

const EnergyDrawer = ({
  isDrawerOpen,
  setIsDrawerOpen,
  drawerValues,
  selectedRows,
  outageData,
}: {
  isDrawerOpen: boolean;
  setIsDrawerOpen: (value: boolean) => void;
  drawerValues: any;
  selectedRows: any;
  outageData: any;
}) => {
  const { t } = useTranslation();

  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const chosenData = outageData?.find(
    (item: any) => selectedRows[0] == item.outageId
  );
  const energizeInterruption = useEnergizeInterruption();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    energizeInterruption.mutate(
      {
        outageId: chosenData?.outageId,
        formData: {
          energizeTime: data.energizeTime,
          outageReason: data.outageReason,
          outageCause: data.outageCause,
          outageSource: data.outageSource,
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["outages"] });
          showToast("İşleminiz başarıyla gerçekleştirilmiştir.", "success");
          reset();
          setIsDrawerOpen(false);
        },
        onError: () => {
          showToast("İşlem Başarısız", "error");
        },
      }
    );
  };

  return (
    <Drawer
      isOpen={isDrawerOpen}
      onClose={() => {
        reset();
        setIsDrawerOpen(false);
      }}
      title={drawerValues?.title}
      hasFooter={true}
      size={"md"}
      closeBtnText={"Vazgeç "}
      submitBtnText={"Enerji Ver"}
      onSubmit={handleSubmit(onSubmit)}
    >
      <form className="energy-drawer" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="energizeTime"
          render={({ field }) => (
            <DateInput
              label="Kesinti Bitiş Zamanı"
              dateFormat="YYYY/MM/DD HH:mm:ss"
              value={field.value}
              minDate={new Date()}
              hideSeconds={false}
              hasTime={true}
              minuteStep={1}
              onChange={(val: any) => {
                let formatted = "";

                if (val?.format && typeof val.format === "function") {
                  const hasTime =
                    val.hour !== undefined &&
                    val.minute !== undefined &&
                    val.second !== undefined;

                  if (hasTime) {
                    formatted = val.format("YYYY-MM-DD HH:mm:ss");
                  } else {
                    // Append default time
                    formatted = val.format("YYYY-MM-DD") + " 00:00:00";
                  }
                } else if (typeof val === "string") {
                  formatted = val.includes(" ") ? val : val + " 00:00:00";
                } else {
                  formatted = val;
                }

                field.onChange(formatted);
              }}
              error={errors.energizeTime?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="outageReason"
          render={({ field }) => (
            <SelectInput
              placeholder="Kesinti sebebi seçiniz"
              label="Kesinti Sebebi"
              options={enumToOptions(OutageReasonTypes).map((o) => ({
                ...o,
                displayName: t(`Enum.${o.displayName}`),
              }))}
              setValue={field.onChange}
              selected={field.value}
              error={errors.outageReason?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="outageCause"
          render={({ field }) => (
            <SelectInput
              placeholder="Kesinti kaynağı seçiniz"
              label="Kesinti Kaynağı"
              options={enumToOptions(OutageCauseTypes).map((o) => ({
                ...o,
                displayName: t(`Enum.${o.displayName}`), // fallback to value if missing
              }))}
              setValue={field.onChange}
              selected={field.value}
              error={errors.outageCause?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="outageSource"
          render={({ field }) => (
            <SelectInput
              placeholder="Kesinti nesne türü seçiniz"
              label="Kesintinin Nesne Türü"
              options={enumToOptions(OutageSourceTypes).map((o) => ({
                ...o,
                displayName: t(`Enum.${o.displayName}`),
              }))}
              setValue={field.onChange}
              selected={field.value}
              error={errors.outageSource?.message}
            />
          )}
        />
      </form>
    </Drawer>
  );
};

export default EnergyDrawer;
