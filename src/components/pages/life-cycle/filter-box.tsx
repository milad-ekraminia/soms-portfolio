import Accordion from "@/components/ui/accordion/accordion";
import { CardColumnWrapper } from "@/components/ui/cards/card-column-wrapper/card-column-wrapper";
import "./life-cycle.scss";
import SelectInput from "@/components/ui/input/select-input/select-input";
import { Input } from "@/components/ui/input/Input";
import { Button } from "@/components/ui/button/button";
import { outageMockData } from "@/helpers/data/life-cycle";
import { OutageTableMockDataType } from "@/types/components/pages/life-cycle";
import DateInput from "@/components/ui/input/date-input/date-input";
import { useState } from "react";

interface FilterBoxProps {
  setOutageNumber: (index: number) => void;
  outageNumber: number | null;
}
const FilterBox = ({ setOutageNumber, outageNumber }: FilterBoxProps) => {
  const selectOptions = [
    {
      displayName: "Kesinti Numarası",
      value: 1,
      id: 1,
    },
    {
      displayName: "OMP ID",
      value: 2,
      id: 2,
    },
    {
      displayName: "CBS ID",
      value: 3,
      id: 3,
    },
    {
      displayName: "Başlangıç-Bitiş Tarihi Seçiniz",
      value: 4,
      id: 4,
    },
  ];
  const [chosenValue, setChosenValue] = useState<number>(
    selectOptions[0].value
  );
  const SelectHandler = (value: string) => {
    setChosenValue(Number(value));
  };
  return (
    <CardColumnWrapper currentPage={1} totalPages={10} onPageChange={() => {}}>
      <div className="outage-search-box">
        <SelectInput
          label="Filtre Seçenekleri"
          setValue={SelectHandler}
          options={selectOptions}
          placeholder="Kesinti Numarasıyla Ara"
          selected={chosenValue}
        />
        {chosenValue == 4 ? (
          <>
            <DateInput
              dateFormat="YYYY/MM/DD HH:mm:ss"
              onChange={() => {}}
              label="Başlangıç Tarihi Seçiniz"
            />
            <DateInput
              dateFormat="YYYY/MM/DD HH:mm:ss"
              onChange={() => {}}
              label="Bitiş Tarihi Seçiniz"
            />{" "}
          </>
        ) : (
          <Input
            label={selectOptions[chosenValue - 1]?.displayName}
            placeholder={`${
              selectOptions[chosenValue - 1]?.displayName
            }si giriniz`}
          />
        )}
        <Button variant="primary">Ara</Button>
      </div>

      {outageMockData.map((item: OutageTableMockDataType) => {
        const isSelected = outageNumber === item.outageNumber;
        return (
          <Accordion
            setOutageNumber={setOutageNumber}
            key={item.outageNumber}
            data={item}
            isSelected={isSelected}
          />
        );
      })}
    </CardColumnWrapper>
  );
};

export default FilterBox;
