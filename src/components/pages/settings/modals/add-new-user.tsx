import { AddPlusSvg } from "@/assets/icons/add-plus-svg";
import { TrashSvg } from "@/assets/icons/trash-svg";
import { Button } from "@/components/ui/button/button";
import { Input } from "@/components/ui/input/Input";
import SelectInput from "@/components/ui/input/select-input/select-input";

import { useState } from "react";
const options: any[] = [
  {
    id: 1,
    value: 1,
    label: "Option 1",
    displayName: "First Option",
  },
  {
    id: 2,
    value: 2,
    label: "Option 2",
    displayName: "Second Option",
  },
  {
    id: 3,
    value: 3,
    label: "Option 3",
    displayName: "Third Option",
  },
];
export const AddNewUser = () => {
  const [values, setValues] = useState({
    adi: "",
    soyadı: "",
    kullanıcıAdı: "",
    ePosta: "",
    phone: "",
    test1: "",
    region: -1,
    regionChildren: -1,
    test5: "",
  });
  const [chosenRegionList, setChosenRegionList] = useState<
    { region: number; regionChildren: number }[]
  >([]);
  const selectInputHandler = (data: any, type: string) => {
    setValues((prev) => {
      return {
        ...prev,
        [type]: data,
      };
    });
  };

  const addRegionHandler = () => {
    if (values.region < 0 || values.regionChildren < 0) return;
    setChosenRegionList([
      ...chosenRegionList,
      { region: values.region, regionChildren: values.regionChildren },
    ]);
  };
  const removeChosenRegion = (index: number) => {
    const newList = [...chosenRegionList];
    newList.splice(index, 1);
    setChosenRegionList(newList);
  };
  return (
    <div className="add-new-user">
      <div className="add-new-user__form">
        <div className="row-inputs">
          <Input
            label="Adı"
            placeholder="Adı giriniz"
            onChange={(e) => selectInputHandler(e, "adi")}
          />
          <Input
            label="Soyadı"
            placeholder="Soyadı giriniz"
            onChange={(e) => selectInputHandler(e, "soyadi")}
          />
        </div>
        <Input
          label="Kullanıcı Adı"
          placeholder="Kullanıcı Adını giriniz"
          onChange={(e) => selectInputHandler(e, "kulanciAdi")}
        />
        <div className="row-inputs">
          <Input
            label="E-Posta"
            placeholder="E-Posta giriniz"
            onChange={(e) => selectInputHandler(e, "ePosta")}
          />
          <Input
            label="Telefon"
            placeholder="Telefon giriniz"
            onChange={(e) => selectInputHandler(e, "phone")}
          />
        </div>
        <SelectInput
          placeholder="Statü seçiniz"
          label="Statü"
          setValue={(e: HTMLInputElement) => selectInputHandler(e, "test1")}
          options={options}
        />
        <h4>Birim</h4>
        <div className="row-inputs">
          <SelectInput
            placeholder="İl seçiniz"
            label="İl"
            setValue={(e: HTMLInputElement) => selectInputHandler(e, "region")}
            options={options}
          />
          <SelectInput
            placeholder="İlçe seçiniz"
            label="İlçe"
            setValue={(e: HTMLInputElement) =>
              selectInputHandler(e, "regionChildren")
            }
            options={options}
          />

          <Button
            variant="secondary"
            leftIcon={<AddPlusSvg stroke="#344054" />}
            onClick={addRegionHandler}
          />
        </div>
        {chosenRegionList.length > 0 &&
          chosenRegionList?.map((region, index) => (
            <div className="row-inputs" key={region?.region}>
              <div className="selected-regions">
                <span>
                  {
                    options.find((item: any) => item.value == region["region"])
                      ?.displayName
                  }
                  -
                </span>
                <span>
                  {
                    options
                      .find((item: any) => item.value == region["region"])
                      ?.childrens?.find(
                        (item: any) => item.value == region["regionChildren"],
                      )?.displayName
                  }
                </span>
              </div>
              <Button
                variant="secondary"
                leftIcon={<TrashSvg stroke="#344054" />}
                onClick={() => {
                  removeChosenRegion(index);
                }}
              />
            </div>
          ))}
        <SelectInput
          placeholder="Rol seçiniz"
          label="Roller"
          setValue={(e: HTMLInputElement) => selectInputHandler(e, "test5")}
          options={options}
        />
      </div>
    </div>
  );
};
