import { tableFilterOptions } from "@/helpers/data/table-options";
import DateInput from "../../input/date-input/date-input";
import { Input } from "../../input/Input";
import { useEffect, useState } from "react";
import SelectInput from "../../input/select-input/select-input";
interface TextFilterProps {
  columnKey: string; // like "username", "email", etc.
  value: string; // current filter value
  filterType: string; // current filter type (e.g. "equals", "like")
  onFilterChange: (
    key: string,
    filterType: string,
    value: string | number | { start?: string; end?: string }
  ) => void;
}
export const DateRangeFilter = ({
  value,
  onFilterChange,
  type,
}: {
  value: { start?: string; end?: string };
  onFilterChange: (
    key: string,
    filterType: string,
    value: string | number | { start?: string; end?: string }
  ) => void;
  type: string;
}) => {
  const handleStartChange = (dateObj: any) => {
    const newStart = dateObj?.format("YYYY-MM-DD HH:mm:ss") || "";

    onFilterChange(type, "between", {
      ...value,
      start: newStart,
    });
  };

  const handleEndChange = (dateObj: any) => {
    const newEnd = dateObj?.format("YYYY-MM-DD HH:mm:ss") || "";
    onFilterChange(type, "between", {
      ...value,
      end: newEnd,
    });
  };

  return (
    <div className="table-header-filter-content">
      <DateInput
        value={value.start}
        onChange={handleStartChange}
        hasTime
        dateFormat="YYYY-MM-DD HH:mm:ss"
        hideSeconds={false}
      />
      <DateInput
        value={value.end}
        onChange={handleEndChange}
        hasTime
        dateFormat="YYYY-MM-DD HH:mm:ss"
        hideSeconds={false}
      />
    </div>
  );
};



export function TextFilter({
  columnKey,
  value,
  filterType,
  onFilterChange,
}: Readonly<TextFilterProps>) {
  const [selectedType, setSelectedType] = useState(filterType || "equals");
  const [inputValue, setInputValue] = useState(value || "");
  
  useEffect(() => {
    // Sync state with props if parent resets them
    setSelectedType(filterType || "equals");
    setInputValue(value || "");
  }, [filterType, value]);
  
  const handleSelectChange = (newType: string) => {
    setSelectedType(newType)
    if (newType === "isNull" || newType === "isNotNull") {
      onFilterChange(columnKey, newType, " ");
    } else {
      onFilterChange(columnKey, newType, value);
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    // Send immediately to parent
    onFilterChange(columnKey, selectedType, newValue);
  };
  useEffect(() => {
    setSelectedType(filterType || "equals");
    setInputValue(value || "");
  }, [filterType, value]);
  return (
    <div className="table-header-filter-content">
      <SelectInput
        selected={selectedType}
        setValue={handleSelectChange}
        placeholder="Seçiniz"
        options={tableFilterOptions}
      />

      {!["isNull", "isNotNull"].includes(selectedType) && (
        <Input
          type="text"
          placeholder="Değeri Gir"
          value={inputValue}
          onChange={handleInputChange}
        />
      )}
    </div>
  );
}
