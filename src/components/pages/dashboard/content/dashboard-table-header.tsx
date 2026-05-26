import { ClearSvg } from "@/assets/icons/clear-svg";
import { DownloadSvg } from "@/assets/icons/download-svg";
import { Button } from "@/components/ui/button/button";
import SelectInput from "@/components/ui/input/select-input/select-input";
import { districts } from "@/helpers/data/dashboard";

interface DashboardTableHeaderProps {
  title: string;
  data: any;
  provinceValue: number;
  setProvinceValue: (e: number) => void;
  cityValue: number;
  setCityValue: (e: number) => void;
}

const DashboardTableHeader = ({
  title,
  data,
  provinceValue,
  setProvinceValue,
  cityValue,
  setCityValue,
}: DashboardTableHeaderProps) => {
  const province = districts.find((elem) => elem.value === provinceValue);
  const cities = data?.find(
    (elem: any) => elem?.city === province?.id
  )?.districts;
  const isDIsabled = provinceValue == 10;
  const onFilterClear = () => {
    setProvinceValue(10);
    setCityValue(-1);
  };
  return (
    <div className="dashboard-content-table-header">
      <h3>{title}</h3>
      <div className="options-wrapper">
        {!isDIsabled ? (
          <Button
            variant="secondary-color"
            onClick={onFilterClear}
            leftIcon={<ClearSvg stroke={isDIsabled ? "#98A2B3" : undefined} />}
            disabled={isDIsabled}
          />
        ) : null}
        <SelectInput
          options={districts}
          selected={provinceValue > 0 ? provinceValue : undefined}
          setValue={(e: number) => {
            setProvinceValue(e);
            setCityValue(-1);
          }}
          placeholder="İl seçiniz"
        />
        {provinceValue !== 10 && provinceValue > 0 && (
          <SelectInput
            options={cities?.map((elem: any) => ({
              id: elem?.district,
              value: elem?.district,
              displayName: elem?.district,
            }))}
            selected={cityValue > 0 ? cityValue : undefined}
            setValue={setCityValue}
            placeholder="İlçe seçiniz"
          />
        )}
        <Button
          variant="secondary"
          leftIcon={<DownloadSvg stroke="#344054" />}
        />
      </div>
    </div>
  );
};

export default DashboardTableHeader;
