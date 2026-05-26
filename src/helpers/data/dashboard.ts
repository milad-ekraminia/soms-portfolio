export const dashboardTabs = [
  {
    title: "Genel Bakış",
    value: "overview",
    id: 1,
    permission: "ControlCenterModule.UICustomPermissions.Dashboard.DashboardOverview",
  },
  {
    title: "Kesintiler",
    value: "outages",
    id: 2,
    permission: "ControlCenterModule.UICustomPermissions.Dashboard.DashboardOutages",
  },
  {
    title: "Bildirimler",
    value: "notifications",
    id: 3,
    permission: "ControlCenterModule.UICustomPermissions.Dashboard.DashboardNotifications",
  },
];

export type District = {
  displayName: string;
  value: number;
  id: string;
};

export const districts: District[] = [
  { displayName: "TÜMÜ", value: 10, id: "TÜMÜ" },
  { displayName: "ŞANLIURFA", value: 1, id: "ŞANLIURFA" },
  { displayName: "DİYARBAKIR", value: 2, id: "DİYARBAKIR" },
  { displayName: "MARDİN", value: 3, id: "MARDİN" },
  { displayName: "BATMAN", value: 4, id: "BATMAN" },
  { displayName: "SİİRT", value: 5, id: "SİİRT" },
  { displayName: "ŞIRNAK", value: 6, id: "ŞIRNAK" },
];

export const dashboardTabsOverall = [
  {
    displayName: "Anlık",
    value: 1,
    id: 1,
  },
  {
    displayName: "Aylık",
    value: 2,
    id: 2,
  },
  {
    displayName: "Yıllık",
    value: 3,
    id: 3,
  },
];

interface MockCardProps {
  title: string;
  count: number;
  percent: string;
  periodicCount: number;
  chartStatus: "ascending" | "descending";
  id: number;
}

export const dashboardCards: MockCardProps[] = [
  {
    title: "Devam Eden Plansız Kesinti",
    count: 360,
    percent: "5%",
    periodicCount: 300,
    chartStatus: "ascending",
    id: 1,
  },
  {
    title: "Devam Eden Planlı Kesinti",
    count: 12,
    percent: "10%",
    periodicCount: 5,
    chartStatus: "ascending",
    id: 2,
  },
  {
    title: "Enerjilendirilen Kesinti",
    count: 120,
    percent: "10%",
    periodicCount: 130,
    chartStatus: "ascending",
    id: 3,
  },
  {
    title: "Aktif Bildirim",
    count: 120,
    percent: "10%",
    periodicCount: 130,
    chartStatus: "descending",
    id: 4,
  },
];

export const outagesCountColumns = ({
  isDistrict,
}: {
  isDistrict?: boolean;
}) => [
  { header: `${isDistrict ? "İlçe" : "İl"}`, accessorKey: "name" },
  { header: "0-1 saat", accessorKey: "period0" },
  { header: "1-2 saat", accessorKey: "period1" },
  { header: "2-5 saat", accessorKey: "period2" },
  { header: "5-10 saat", accessorKey: "period5" },
  { header: "10+ saat", accessorKey: "period10" },
];

export const notificationCountColumns = ({
  isDistrict,
}: {
  isDistrict?: boolean;
}) => [
  { header: `${isDistrict ? "İlçe" : "İl"}`, accessorKey: "name" },
  { header: "CRM", accessorKey: "crmNotifications" },
  { header: "OSOS", accessorKey: "ososNotifications" },
  { header: "SCADA", accessorKey: "scadaNotifications" },
  { header: "Toplam", accessorKey: "totalNotifications" },
];

export const sanliurfaOutageMapMockData = {
  akcakale: { value: 5 },
  birecik: { value: 0 },
  bozova: { value: 0.5 },
  ceylanpinar: { value: 0 },
  eyyubiye: { value: 5 },
  halfeti: { value: 11 },
  haliliye: { value: 3 },
  harran: { value: 1 },
  hilvan: { value: 8 },
  karakopru: { value: 0 },
  siverek: { value: 12 },
  suruc: { value: 20 },
  viransehir: { value: 0 },
};
