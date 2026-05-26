
import { GearSvg } from "@/assets/icons/gear-svg";
import { UnplannedOutageSvg } from "@/assets/icons/unplanned-outage-svg";
import { PlannedOutageSvg } from "@/assets/icons/planned-outage-svg";
export const settingsTopCards = [
  {
    title: "Planlı SMS Ayarları",
    btnText: "Ayarları Görüntüle",
    id: 0,
    type: "planned",
    icon: <PlannedOutageSvg width="48" height="48" stroke="#D1E9FF" />,
  },
  {
    title: "Plansız SMS Ayarları",
    btnText: "Ayarları Görüntüle",
    id: 1,
    type: "unPlanned",
    icon: <UnplannedOutageSvg width="48" height="48" stroke="#D1E9FF" />,
  },
  {
    title: "Genel SMS Ayarları",
    btnText: "Ayarları Görüntüle",
    id: 2,
    type: "general",
    icon: <GearSvg width="48" height="48" stroke="#D1E9FF" />,
  },
];

export const plannedSmsTabs = [
  {
    title: "Planlandı",
    value: 1,
    id: 1,
  },
  {
    title: "Başladı",
    value: 2,
    id: 2,
  },
  {
    title: "Tamamlandı",
    value: 3,
    id: 3,
  },
  {
    title: "Güncellendi",
    value: 4,
    id: 4,
  },
  {
    title: "İptal Edildi",
    value: 5,
    id: 5,
  },
];
export const unPlannedSmsTabs = [
  {
    title: "Başladı",
    value: 6,
    id: 6,
  },
  {
    title: "Tamamlandı",
    value: 7,
    id: 7,
  },
  {
    title: "Güncellendi",
    value: 8,
    id: 8,
  },
];
export const smsTabs = {
  planned: plannedSmsTabs,
  unPlanned: unPlannedSmsTabs,
};




export const kvkkData = [
  {
    displayName: "Sözleşme No",
    status: true,

    id: 1,
  },
  {
    displayName: "Abone Adı-Soyadı ",
    status: true,

    id: 2,
  },
  {
    displayName: "Tesisat No ",
    status: false,
    id: 3,
  },
  {
    displayName: "Abone İletişim No ",
    status: false,
    id: 4,
  },
  {
    displayName: "Abone E-Mail ",
    status: true,
    id: 5,
  },
  {
    displayName: "Abone İl ",
    status: false,
    id: 6,
  },
  {
    displayName: "Abone İlçe ",
    status: true,
    id: 7,
  },
  {
    displayName: "Abone Mahalle ",
    status: true,
    id: 8,
  },
];
export const commonFieldsPlaceholders = [
  { id: 1, label: " {İl} " }, // SmsPlaceholder.City
  { id: 2, label: " {İlçe} " }, // SmsPlaceholder.District
  { id: 3, label: " {Mahalle} " }, // SmsPlaceholder.Neighborhood
  { id: 4, label: " {Tahmini Enerji Veriliş Saati} " }, // SmsPlaceholder.EstimatedRestorationTime
];

// Planned-specific
export const scheduledSmsPlaceholders = [
  { id: 10, label: " {Planlı Başlangıç Tarihi} " },
  { id: 11, label: " {Planlı Bitiş Tarihi} " },
  { id: 12, label: " {Planlı Kesinti Nedeni} " },
  { id: 13, label: " {Tesisat Numarası} " },
  { id: 14, label: " {Abone Numarası} " },
];

// Unplanned-specific
export const unScheduledSmsPlaceholders = [
  { id: 20, label: " {Plansız Başlangıç Tarihi} " },
  { id: 21, label: " {Plansız Bitiş Tarihi} " },
  { id: 22, label: " {Plansız Kesinti Nedeni} " },
];
export const placeholderMap: Record<string, number> = {
  "{İl}": 1,
  "{İlçe}": 2,
  "{Mahalle}": 3,
  "{Tahmini Enerji Veriliş Saati}": 4,
  "{Planlı Başlangıç Tarihi}": 10,
  "{Planlı Bitiş Tarihi}": 11,
  "{Planlı Kesinti Nedeni}": 12,
  "{Tesisat Numarası}": 13,
  "{Abone Numarası}": 14,
  "{Plansız Başlangıç Tarihi}": 20,
  "{Plansız Bitiş Tarihi}": 21,
  "{Plansız Kesinti Nedeni}": 22,
};




// Planned-specific

