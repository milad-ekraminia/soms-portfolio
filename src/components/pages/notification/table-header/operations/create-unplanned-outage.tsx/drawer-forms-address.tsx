import { TableAlertSvg } from "@/assets/icons/table-alert-svg";
import { Input } from "@/components/ui/input/Input";
import SelectInput from "@/components/ui/input/select-input/select-input";
import { TextArea } from "@/components/ui/input/textarea/textarea";
import { Loader } from "@/components/ui/loader/loader";
import { SubjectTypes } from "@/definitions/enum";
import { enumToOptions } from "@/helpers/enum-converter";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";

export const DrawerFormsAddress = ({
  errors,
  control,
  cities,
  districts,
  neighbourhoods,
  fullAddressData,
  ompData,
  addressSelectOptions,
  city,
  district,
  neighborhood,
  chosenStationId,
  isCitiesLoading,
  isDistrictsLoading,
  isneighbourhoodsLoading,
  isFullAddressLoading,
  isOmpDataLoading,
  cbsDetail,
  cbsDetailLoading,
  cbsDetailFetching,
  watch,
}: {
  errors: any;
  control: any;
  cities: any;
  districts: any;
  neighbourhoods: any;
  fullAddressData: any;
  ompData: any;
  addressSelectOptions: any;
  city: any;
  district: any;
  neighborhood: any;
  chosenStationId: any;
  isCitiesLoading: any;
  isDistrictsLoading: any;
  isneighbourhoodsLoading: any;
  isFullAddressLoading: any;
  isOmpDataLoading: any;
  cbsDetail: any;
  cbsDetailLoading: any;
  cbsDetailFetching: any;
  watch: any;
}) => {
  const selectedCbsId = watch("cbsId");

  const { t } = useTranslation();
  return (
    <div className="notification-drawer-forms-cotainer__content-adress">
      {/* City */}
      <Controller
        name="city"
        control={control}
        render={({ field }) => (
          <SelectInput
            {...field}
            label="İl"
            placeholder="İl seçiniz"
            options={
              cities?.map((item: any) => ({
                displayName: item?.cityName,
                value: item?.cityCode,
                id: item?.cityCode,
              })) ?? []
            }
            selected={field.value}
            setValue={field.onChange}
            error={errors.city?.message}
            isLoading={isCitiesLoading}
            required={true}
          />
        )}
      />

      {/* District */}
      <Controller
        name="district"
        control={control}
        render={({ field }) => (
          <SelectInput
            {...field}
            label="İlçe"
            placeholder="İlçe seçiniz"
            options={
              districts?.map((item: any) => ({
                displayName: item?.districtName,
                value: item?.districtCode,
                id: item?.districtCode,
              })) ?? []
            }
            selected={field.value}
            setValue={field.onChange}
            error={errors.district?.message}
            disabled={!city}
            isLoading={isDistrictsLoading}
            required={true}
          />
        )}
      />

      {/* Neighborhood */}
      <Controller
        name="neighborhood"
        control={control}
        render={({ field }) => (
          <SelectInput
            {...field}
            label="Mahalle"
            placeholder="Mahalle seçiniz"
            options={
              neighbourhoods?.map((item: any) => ({
                displayName: item?.neighbourhoodName,
                value: item?.neighbourhoodCode,
                id: item?.neighbourhoodCode,
              })) ?? []
            }
            selected={field.value}
            setValue={field.onChange}
            error={errors.neighborhood?.message}
            disabled={!city || !district}
            isLoading={isneighbourhoodsLoading}
            required={true}
          />
        )}
      />
      <Controller
        name="stationId"
        control={control}
        render={({ field }) => (
          <SelectInput
            {...field}
            label="İstasyon"
            placeholder="İstasyon giriniz"
            options={
              fullAddressData?.map((item: any) => ({
                displayName: item?.stationName,
                value: item?.stationId,
                id: item?.stationId,
              })) ?? []
            }
            selected={field.value}
            setValue={field.onChange}
            error={errors.stationId?.message}
            disabled={!city || !district || !neighborhood}
            isLoading={isFullAddressLoading}
            required={true}
          />
        )}
      />
      <Controller
        name="cbsId"
        control={control}
        render={({ field }) => (
          <SelectInput
            {...field}
            placeholder="Hücre seçiniz"
            label="Kesinti Noktaları"
            options={
              ompData?.map((item: any) => ({
                displayName: item?.ompName,
                value: item?.cbsid,
                id: item?.cbsid,
              })) ?? []
            }
            selected={field.value}
            setValue={(val: any) => field.onChange(val)}
            disabled={ompData?.length < 1 || !chosenStationId}
            error={errors.cbsId?.message}
            isLoading={isOmpDataLoading}
            required={true}
          />
        )}
      />
      <Controller
        name="cbsId"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            readOnly
            label="CBS ID"
            placeholder="CBS ID giriniz"
            value={field.value}
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
            options={addressSelectOptions.onem ?? []}
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
