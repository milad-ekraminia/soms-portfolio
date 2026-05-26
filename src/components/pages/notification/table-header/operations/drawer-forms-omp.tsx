import { TableAlertSvg } from "@/assets/icons/table-alert-svg";
import { Input } from "@/components/ui/input/Input";
import SelectInput from "@/components/ui/input/select-input/select-input";
import { TextArea } from "@/components/ui/input/textarea/textarea";
import { Controller } from "react-hook-form";

export const DrawerFormsOmp = ({
  errors,
  control,
  ompSelectOptions,
}: {
  errors: any;
  control: any;
  ompSelectOptions: any;
}) => {
  return (
    <div className="notification-drawer-forms-cotainer__content-omp">
      <Controller
        name="cbsId"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            label="CBS ID"
            placeholder="CBS ID giriniz"
            value={field.value}
            onChange={(e: any) => field.onChange(e.target.value)}
            error={errors.cbsId?.message}
          />
        )}
      />

      <Controller
        name="complaint"
        control={control}
        render={({ field }) => (
          <SelectInput
            {...field}
            placeholder="Şikayet türü seçiniz"
            label="Şikayet Türü"
            options={ompSelectOptions?.sikayat ?? []}
            selected={field.value}
            setValue={(val: any) => field.onChange(val)}
            error={errors.complaint?.message}
          />
        )}
      />
      <Controller
        name="importance"
        control={control}
        render={({ field }) => (
          <SelectInput
            {...field}
            placeholder="Önem derecesi seçiniz"
            label="Önem Derecesi"
            options={ompSelectOptions?.onem ?? []}
            selected={field.value}
            setValue={(val: any) => field.onChange(val)}
            error={errors.importance?.message}
          />
        )}
      />

      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <TextArea
            {...field}
            label="Açıklama"
            placeholder="Metin giriniz"
            value={field.value}
            textAreaHandler={field.onChange}
            error={errors.description?.message}
          />
        )}
      />

      <div className="info">
        <div className="info__icon">
          <TableAlertSvg />
        </div>
        <div className="info__text">
          <span>Şebekenin Son Versiyonuna Göre; </span>
          <span>-‍Etkilenen Abone Sayısı: 490</span>
          <span>-Etkilenen Kofre Sayısı:120</span>
        </div>
      </div>
    </div>
  );
};
