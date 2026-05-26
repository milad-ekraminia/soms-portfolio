import { CircledWarningSvg } from "@/assets/icons/circled-warning-svg";
import { TableAlertSvg } from "@/assets/icons/table-alert-svg";
import DateInput from "@/components/ui/input/date-input/date-input";
import { Input } from "@/components/ui/input/Input";
import SelectInput from "@/components/ui/input/select-input/select-input";
import { TextArea } from "@/components/ui/input/textarea/textarea";
import Tabs from "@/components/ui/tabs/tabs";
import { drawerFormsSelectOptions } from "@/helpers/data/outage";
import { useState } from "react";

interface DrawerProps {
  drawerValues: {
    title: string;
    type: string;
    formType?: string;
  };
}
export const DrawerForms = ({ drawerValues }: DrawerProps) => {
  const [activeTab, setActiveTab] = useState("Address");
  const [cbsValue, setCbsValue] = useState("");

  const tabs = [
    { id: 0, title: "Adres", active: true, value: "Address" },
    { id: 1, title: "CBS ID", active: false, value: "OMP" },
  ];
  const addressSelectOptions = drawerFormsSelectOptions[0];
  const ompSelectOptions = drawerFormsSelectOptions[1];
  const changeHandler = (e: any) => {
    setCbsValue(e.target.value);
  };
  return (
    <div className="outage-drawer-forms-cotainer">
      <Tabs tabs={tabs} activeTab={activeTab} onTabClick={setActiveTab} />
      <div className="outage-drawer-forms-cotainer__content">
        {drawerValues?.formType == "planlı" ? (
          <div className="warning-box">
            <div className="warning-box__icon">
              <CircledWarningSvg />
            </div>
            <p className="warning-box__text">
              Planlı Kesinti planlanan başlangıç zamanından en az 48 saat önce
              oluşturulmalıdır.
            </p>
          </div>
        ) : null}
        {activeTab == "Address" ? (
          <div className="outage-drawer-forms-cotainer__content-adress">
            <SelectInput
              placeholder="İl seçiniz"
              label="İl"
              setValue={() => {}}
              options={addressSelectOptions.il ?? []}
            />
            <SelectInput
              placeholder="İlçe seçiniz"
              label="İlçe"
              setValue={() => {}}
              options={addressSelectOptions.ilce ?? []}
            />

            <SelectInput
              placeholder="Mahalle seçiniz"
              label="Mahalle"
              setValue={() => {}}
              options={addressSelectOptions.mahale ?? []}
            />

            <SelectInput
              placeholder="İstasyon seçiniz"
              label="İstasyon"
              setValue={() => {}}
              options={addressSelectOptions.istasyon ?? []}
            />

            <SelectInput
              placeholder="Hücre seçiniz"
              label="Kesinti Noktaları"
              setValue={() => {}}
              options={addressSelectOptions.hucre ?? []}
            />
            <Input readOnly label="CBS ID" placeholder="CBS ID giriniz" />
            {drawerValues.formType == "plansız" ? (
              <></>
            ) : (
              <>
                <div className="outage-drawer-forms-cotainer__content-adress-dates">
                  <DateInput
                    dateFormat="YYYY/MM/DD HH:mm"
                    hasTime={true}
                    onChange={() => {}}
                    label="Planlanan Başlangıç Zamanı"
                  />
                  <DateInput
                    dateFormat="YYYY/MM/DD HH:mm"
                    hasTime={true}
                    onChange={() => {}}
                    label="Planlanan Bitiş Zamanı"
                  />
                </div>
                <SelectInput
                  placeholder="Kesinti nedenini seçiniz"
                  label="Planlı Kesinti Nedeni"
                  setValue={() => {}}
                  options={ompSelectOptions?.kesinti ?? []}
                />
              </>
            )}
            <TextArea label="Açıklama" placeholder="Metin giriniz." />
            <div className="info">
              <div className="info__icon">
                <TableAlertSvg />
              </div>
              <div className="info__text">
                <span>Şebekenin Son Versiyonuna Göre;</span>
                <span>-‍Etkilenen Abone Sayısı: 490</span>
                <span>-Etkilenen Kofre Sayısı:120</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="outage-drawer-forms-cotainer__content-omp">
            <Input
              readOnly
              label="CBS ID"
              placeholder="CBS ID giriniz"
              onChange={changeHandler}
            />
            {cbsValue ? (
              <>
                <Input label="İl" disabled={true} value={"Diyarbakır"} />
                <Input label="İlçe" disabled={true} value={"Kayapınar"} />
                <Input label="Mahalle" disabled={true} value={"Peyas"} />
              </>
            ) : null}
            {drawerValues.formType == "plansız" ? (
              <>
              
              </>
            ) : (
              <>
                <div className="outage-drawer-forms-cotainer__content-adress-dates">
                  <DateInput
                    dateFormat="YYYY/MM/DD HH:mm"
                    hasTime={true}
                    onChange={() => {}}
                    label="Planlanan Başlangıç Zamanı"
                  />
                  <DateInput
                    dateFormat="YYYY/MM/DD HH:mm"
                    hasTime={true}
                    onChange={() => {}}
                    label="Planlanan Bitiş Zamanı"
                  />
                </div>
                <SelectInput
                  placeholder="Kesinti nedenini seçiniz"
                  label="Planlı Kesinti Nedeni"
                  setValue={() => {}}
                  options={ompSelectOptions?.kesinti ?? []}
                />
              </>
            )}

            <TextArea label="Açıklama" placeholder="Metin giriniz." />
            <div className="info">
              <div className="info__icon">
                <TableAlertSvg />
              </div>
              <div className="info__text">
                <span>Şebekenin Son Versiyonuna Göre;</span>
                <span>-‍Etkilenen Abone Sayısı: 490</span>
                <span>-Etkilenen Kofre Sayısı:120</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
