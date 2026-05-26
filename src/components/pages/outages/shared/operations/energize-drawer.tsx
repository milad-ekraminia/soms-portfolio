import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import SelectInput from "@/components/ui/input/select-input/select-input";
import Drawer from "@/components/ui/drawer/drawer";
import DateInput from "@/components/ui/input/date-input/date-input";
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

interface EnergyDrawerProps {
  isDrawerOpen: boolean;
  setIsDrawerOpen: (value: boolean) => void;
  drawerValues: any;
  selectedRows: any[];
  outageData: any[];
  idKey: "outageId" | "plannedOutageId";
  useMutationHook: () => any;
  invalidateKeys: string[][];
}

export const EnergizeDrawer = ({
  isDrawerOpen,
  setIsDrawerOpen,
  drawerValues,
  selectedRows,
  outageData,
  idKey,
  useMutationHook,
  invalidateKeys,
}: EnergyDrawerProps) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const chosenData = outageData?.find(
    (item) => selectedRows[0] === item[idKey]
  );
  const mutation = useMutationHook();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    mutation.mutate(
      {
        [idKey]: chosenData?.[idKey],
        formData: {
          energizeTime: data.energizeTime,
          outageReason: data.outageReason,
          outageCause: data.outageCause,
          outageSource: data.outageSource,
        },
      },
      {
        onSuccess: () => {
          invalidateKeys.forEach((key) =>
            queryClient.invalidateQueries({ queryKey: key })
          );
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
  const newDate = new Date()
  const minDate = idKey == "plannedOutageId" ? newDate : undefined;
  return (
    <Drawer
      isOpen={isDrawerOpen}
      onClose={() => {
        reset();
        setIsDrawerOpen(false);
      }}
      title={drawerValues?.title}
      hasFooter
      size="md"
      closeBtnText="Vazgeç"
      submitBtnText="Enerji Ver"
      onSubmit={handleSubmit(onSubmit)}
      isPending={mutation.isPending}
    >
      <form className="energy-drawer" onSubmit={handleSubmit(onSubmit)}>
        {/* Date field */}
        <Controller
          control={control}
          name="energizeTime"
          render={({ field }) => (
            <DateInput
              label="Kesinti Bitiş Zamanı"
              dateFormat="YYYY/MM/DD HH:mm:ss"
              value={field.value}
              hideSeconds={false}
              minDate={minDate}
              hasTime
              minuteStep={1}
              onChange={(val: any) => {
                let formatted = "";
                if (val?.format && typeof val.format === "function") {
                  const hasTime =
                    val.hour !== undefined &&
                    val.minute !== undefined &&
                    val.second !== undefined;
                  formatted = hasTime
                    ? val.format("YYYY-MM-DD HH:mm:ss")
                    : val.format("YYYY-MM-DD") + " 00:00:00";
                } else if (typeof val === "string") {
                  formatted = val.includes(" ") ? val : val + " 00:00:00";
                } else {
                  formatted = val;
                }
                field.onChange(formatted);
              }}
              error={errors.energizeTime?.message}
              required={true}
            />
          )}
        />

        {/* Select fields */}
        {[
          {
            name: "outageReason",
            label: "Kesinti Sebebi",
            options: enumToOptions(OutageReasonTypes),
          },
          {
            name: "outageCause",
            label: "Kesinti Nedeni",
            options: enumToOptions(OutageCauseTypes),
          },
          {
            name: "outageSource",
            label: "Kesinti Kaynağı",
            options: enumToOptions(OutageSourceTypes),
          },
        ].map(({ name, label, options }) => (
          <Controller
            key={name}
            control={control}
            name={
              name as
                | "outageReason"
                | "outageCause"
                | "outageSource"
                | "energizeTime"
            }
            render={({ field }) => (
              <SelectInput
                placeholder={`${label} seçiniz`}
                label={label}
                options={options.map((o) => ({
                  ...o,
                  displayName: t(`Enum.${o.displayName}`),
                }))}
                setValue={field.onChange}
                selected={field.value}
                error={
                  errors[
                    name as
                      | "outageReason"
                      | "outageCause"
                      | "outageSource"
                      | "energizeTime"
                  ]?.message
                }
                required={true}
              />
            )}
          />
        ))}
      </form>
    </Drawer>
  );
};
