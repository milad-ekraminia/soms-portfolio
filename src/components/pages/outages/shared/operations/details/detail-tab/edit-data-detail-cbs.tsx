import { Input } from "@/components/ui/input/Input";
import SelectInput from "@/components/ui/input/select-input/select-input";
import { Controller } from "react-hook-form";

export const EditDataDetailCbs = ({
  control,
  cities,
  districts,
  neighbourhoods,
  fullAddressData,
  ompData,
  cbsAddressLoading,
}: {
  control: any;
  cities: any;
  districts: any;
  neighbourhoods: any;
  fullAddressData: any;
  ompData: any;
  cbsAddressLoading: any;
}) => {
  return (
    <div className="edit-detail-form">
      <Controller
        name="cbsId"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            label="CBS ID"
            placeholder="CBS ID giriniz"
            value={field.value}
          />
        )}
      />{" "}
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
            disabled
            isLoading={cbsAddressLoading}
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
            disabled
            isLoading={cbsAddressLoading}
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
            disabled
            isLoading={cbsAddressLoading}
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
            disabled
            isLoading={cbsAddressLoading}
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
            disabled
            isLoading={cbsAddressLoading}
          />
        )}
      />
    </div>
  );
};
