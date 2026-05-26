import { TableAlertSvg } from "@/assets/icons/table-alert-svg";
import { Input } from "@/components/ui/input/Input";
import SelectInput from "@/components/ui/input/select-input/select-input";
import { TextArea } from "@/components/ui/input/textarea/textarea";
import { Loader } from "@/components/ui/loader/loader";
import { SubjectTypes } from "@/definitions/enum";
import { enumToOptions } from "@/helpers/enum-converter";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";

export const DrawerFormsOmp = ({
  errors,
  control,
  ompSelectOptions,
  cbsDetail,
  cbsDetailLoading,
  cbsDetailFetching,
  watch,
}: {
  errors: any;
  control: any;
  ompSelectOptions: any;
  cbsDetail: any;
  cbsDetailLoading: any;
  cbsDetailFetching: any;
  watch: any;
}) => {
  const { t } = useTranslation();
  const selectedCbsId = watch("cbsId");

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
            required={true}
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
            options={enumToOptions(SubjectTypes).map((o) => ({
              ...o,
              displayName: t(`Enum.${o.displayName}`),
            }))}
            selected={field.value}
            setValue={(val: any) => field.onChange(val)}
            error={errors.complaint?.message}
            required={true}
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
            required={true}
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

      {selectedCbsId ? (
        <div className="info">
          {cbsDetailLoading || cbsDetailFetching ? (
            <Loader />
          ) : (
            <>
              <div className="info__icon">
                <TableAlertSvg />
              </div>
              <div className="info__text">
                <span>Şebekenin Son Versiyonuna Göre;</span>
                <span>
                  -‍Etkilenen Abone Sayısı:
                  {cbsDetail?.responseList[0]?.totalInstallationCount ?? 0}
                </span>
                <span>
                  -Etkilenen Kofre Sayısı:
                  {cbsDetail?.responseList[0]?.totalKofreCount ?? 0}
                </span>
              </div>
            </>
          )}
        </div>
      ) : null}
    </div>
  );
};
