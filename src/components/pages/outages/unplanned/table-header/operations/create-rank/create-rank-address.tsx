import { Input } from "@/components/ui/input/Input";
import SelectInput from "@/components/ui/input/select-input/select-input";
import { Controller } from "react-hook-form";

export const CreateRankAddress = ({
  errors,
  control,
  cities,
  districts,
  neighbourhoods,
  fullAddressData,
  ompData,
  city,
  district,
  neighborhood,
  chosenStationId,
  isCitiesLoading,
  isDistrictsLoading,
  isneighbourhoodsLoading,
  isFullAddressLoading,
  isOmpDataLoading,
}: {
  errors: any;
  control: any;
  cities: any;
  districts: any;
  neighbourhoods: any;
  fullAddressData: any;
  ompData: any;
  city: any;
  district: any;
  neighborhood: any;
  chosenStationId: any;
  isCitiesLoading: any;
  isDistrictsLoading: any;
  isneighbourhoodsLoading: any;
  isFullAddressLoading: any;
  isOmpDataLoading: any;
}) => {
  return (
    <div className="outage-drawer-forms-cotainer__content-adress">
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
    </div>
  );
};
