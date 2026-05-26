import React from "react";
import { TableAlertSvg } from "@/assets/icons/table-alert-svg";
import Drawer from "@/components/ui/drawer/drawer";
import Tabs from "@/components/ui/tabs/tabs";
import SelectInput from "@/components/ui/input/select-input/select-input";
import { Input } from "@/components/ui/input/Input";
import { TextArea } from "../../input/textarea/textarea";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}
export const DrawerForms = ({ isOpen, onClose, title }: DrawerProps) => {
  const [activeTab, setActiveTab] = React.useState(0);
  const tabs = [
    { id: 0, title: "Adres", active: true, value: "Address" },
    { id: 1, title: "OMP", active: false, value: "OMP" },
  ];
  return (
    <Drawer isOpen={isOpen} onClose={onClose} title={title}>
      <div className="drawer-forms-cotainer">
        <Tabs
          tabs={tabs}
          activeTab={"Test 2"}
          onTabClick={(tabIndex:any) => setActiveTab(Number(tabIndex))}
        />
        <div className="drawer-forms-cotainer__content">
          {activeTab == 0 ? (
            <div className="drawer-forms-cotainer__content-adres">
              <SelectInput
                placeholder="İlinizi seçiniz"
                label="İl"
                setValue={() => {}}
                options={[]}
              />
              <SelectInput
                placeholder="İlçenizi seçiniz"
                label="İlçe"
                setValue={() => {}}
                options={[]}
              />
              <SelectInput
                placeholder="Mahallenizi seçiniz"
                label="Mahalle"
                setValue={() => {}}
                options={[]}
              />
             
              <SelectInput
                placeholder="İstasyonunuzu giriniz"
                label="İstasyon"
                setValue={() => {}}
                options={[]}
              />
              <SelectInput
                placeholder="İstasyonunuzu giriniz"
                label="İstasyon"
                setValue={() => {}}
                options={[]}
              />
              <SelectInput
                placeholder="Hücrenizi seçiniz"
                label="Kesinti Noktaları"
                setValue={() => {}}
                options={[]}
              />
              <Input readOnly label="CBS ID" placeholder="CBS ID giriniz" />
              <div className="drawer-forms-cotainer__content-adres-dates">
                <Input type="date" label="Başlangıç Tarihi" />
                <Input type="date" label="Başlangıç Tarihi" />
              </div>
              <SelectInput
                placeholder="Kesinti nedenini seçiniz"
                label="Planlı Kesinti Nedeni"
                setValue={() => {}}
                options={[]}
              />
              <TextArea label="Açıklama" />
            </div>
          ) : (
            <div className="drawer-forms-cotainer__content-omp">
              <Input label="OMP" />
              <SelectInput
                placeholder="Şikayet seçiniz"
                label="Şikayet Türü"
                setValue={() => {}}
                options={[]}
              />
              <SelectInput
                placeholder="Önem derecesi seçiniz"
                label="Önem Derecesi"
                setValue={() => {}}
                options={[]}
              />
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
    </Drawer>
  );
};
