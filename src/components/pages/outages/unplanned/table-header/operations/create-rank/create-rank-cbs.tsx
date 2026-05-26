import { Input } from "@/components/ui/input/Input";
import { Controller } from "react-hook-form";

export const CreateRankCbs = ({
  errors,
  control,
  isLoading = false,
  cities,
  districts,
  neighbourhoods,
  city,
  district,
  neighborhood,
  chosenStationId,
}: {
  errors: any;
  control: any;
  isLoading: boolean;
  cities: any;
  districts: any;
  neighbourhoods: any;
  city: any;
  district: any;
  neighborhood: any;
  chosenStationId: any;
}) => {
  return (
    <div className="outage-drawer-forms-cotainer__content-omp">
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
            isLoading={isLoading}
          />
        )}
      />
      {city ? (
        <Controller
          name="city"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label="İl"
              placeholder="İl seçiniz"
              value={
                cities?.find((item: any) => field.value == item?.cityCode)
                  ?.cityName
              }
              onChange={(e: any) => field.onChange(e.target.value)}
              error={errors.city?.message}
              disabled={true}
              required={true}
              isLoading={isLoading}
            />
          )}
        />
      ) : null}{" "}
      {district ? (
        <Controller
          name="district"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label="İlçe"
              placeholder="İlçe seçiniz"
              value={
                districts?.find(
                  (item: any) => field.value == item?.districtCode
                )?.districtName
              }
              onChange={(e: any) => field.onChange(e.target.value)}
              error={errors.district?.message}
              disabled={true}
              required={true}
              isLoading={isLoading}
            />
          )}
        />
      ) : null}
      {neighborhood ? (
        <Controller
          name="neighborhood"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label="Mahalle"
              placeholder="Mahalle seçiniz"
              value={
                neighbourhoods?.find(
                  (item: any) => field.value == item?.neighbourhoodCode
                )?.neighbourhoodName
              }
              onChange={(e: any) => field.onChange(e.target.value)}
              error={errors.neighborhood?.message}
              disabled={true}
              required={true}
              isLoading={isLoading}
            />
          )}
        />
      ) : null}
      {chosenStationId ? (
        <Controller
          name="stationId"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              readOnly
              label="İstasyon"
              placeholder="İstasyon giriniz"
              value={field.value}
              onChange={(e: any) => field.onChange(e.target.value)}
              error={errors.stationId?.message}
              disabled={true}
              required={true}
              isLoading={isLoading}
            />
          )}
        />
      ) : null}
    </div>
  );
};
